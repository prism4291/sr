// whipper class    original name: wa
window.fff = SR_Player.prototype.Whipper;
SR_Player.prototype.Whipper = function(current_char){
    var wpr_target,wpr_is_controlled,whip_MP,whip_ypos,whip_xtile,whip_ytile,wpr_heal_crd,whip_hbox,wpr_combatant,wpr_vamp_gain,wpr_gold_mult,whipper_KB;
    var wpr_kb_vector = new Vector2D;
    var wpr_ATin = AT_Min[current_char]; // set base stats
    var wpr_ATax = AT_Max[current_char];
    var wpr_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1);
    var wpr_range = Range[current_char];
    var wpr_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var wpr_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;
    var wpr_is_critical = 0;

    for (var j=11; j<=14; j++) // make whip joints
        moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0.05,0.95);

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             wpr_target = Enemies.ENfindEnemy(wpr_Xpos-wpr_range,wpr_Ypos-wpr_range-20,wpr_Xpos+wpr_range,wpr_Ypos+20);
        else wpr_target = Players.PLfindPlayer(wpr_Xpos-wpr_range,wpr_Ypos-wpr_range-20,wpr_Xpos+wpr_range,wpr_Ypos+20,getLeader(current_char,1));

        wpr_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            wpr_is_controlled = 1;
        }

        if (wpr_target!=-1){ // when a target is found
            if (this.PL_reload_ticks[current_char]==0){       // when ready to attack
                this.PL_reload_ticks[current_char] = wpr_AGI; // restart reload timer
                // body movement when attacking
                if (this.PL_joint[current_char][5].x < this.PL_joint[current_char][6].x){ // if right hand is to the right
                    this.PL_joint[current_char][5].x += 4; // move left hand right
                    this.PL_joint[current_char][4].x -= 4; // move right elbow left
                } else {                               // if right hand is to the right
                    this.PL_joint[current_char][6].x += 4; // move right hand right
                    this.PL_joint[current_char][3].x -= 4; // move left elbow left
                }
                this.PL_joint[current_char][2].y += 1; // move crotch down
                this.PL_focus[current_char] = 14;      // set focus point to tip of whip
                antiCheatCheck();
                whip_MP = getVal(Item_Inv[Stickmen_Slots+current_char],Weap_MP_Price); // bonus attack activation
                if (MP_Bar[current_char]+MAG[current_char] < whip_MP)                  // if this hit doesn't fill MP bar
                     MP_Bar[current_char] += MAG[current_char];                        // add MAG to the magic bar
                else MP_Bar[current_char] = whip_MP;                                   // otherwise set the magic bar to full (maxOf capacity of magic bar is the weapon's
                if (MP_Bar[current_char]==whip_MP && whip_MP>0 || whip_MP==-1){        // if magic bar is full and weapon has a bonus attack, or if bonus attack is free
                    MP_Bar[current_char] = 0;                                          // reset mp bar
                    whip_ypos = this.PL_joint[current_char][this.PL_focus[current_char]].y;
                    whip_xtile = clamp(this.PL_joint[current_char][this.PL_focus[current_char]].x,0,Win_Width-1)>>3;
                    whip_ytile = clamp(this.PL_joint[current_char][this.PL_focus[current_char]].y,0,Inv_Top-1)>>3;
                    if (whip_ytile-Terrain.TR_low_surface[whip_xtile]>=0)
                        whip_ypos = 8*Terrain.TR_low_surface[whip_xtile]+7;
                    else if (absVal(whip_ytile-Terrain.TR_high_surface[whip_xtile])<=3)
                        whip_ypos = 8*Terrain.TR_high_surface[whip_xtile]+7;

                    this.PLprojectileAttack(current_char,this.PL_joint[current_char][this.PL_focus[current_char]].x,whip_ypos,wpr_target); // perform projectile attack
                }
                if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                           // whipper Heal's Card
                    wpr_heal_crd = getEff(Stickmen_Slots+current_char,Eff1);
                    LP_Current[current_char] = clamp(LP_Current[current_char]+wpr_heal_crd,0,LP_Max[current_char]);              // increase LP
                    Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,wpr_heal_crd,0x00FF00); // output LP increase
                }
                antiCheatSet();
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && wpr_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
        }
        Swim(this,current_char);
    }
    if (this.PL_focus[current_char]!=-1 && this.PL_held_player!=current_char){ // base attack activation
        if (checkEff(Stickmen_Slots+current_char,Card_Critcl) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){ // whipper Critical's Card
            wpr_ATin += floor(getEff(Stickmen_Slots+current_char,Eff2)*wpr_ATin/100);
            wpr_ATax += floor(getEff(Stickmen_Slots+current_char,Eff2)*wpr_ATax/100);
            wpr_is_critical = 1;
        }
        whip_hbox = 20; // whipper Big Card
        if (checkEff(Stickmen_Slots+current_char,Card_Big)){
             whip_hbox += floor(20*getEff(Stickmen_Slots+current_char,Eff1)/100);
        }
        if (Game_Mode!=1) // detect if basic attack hits
             wpr_combatant = Enemies.ENtakeDamage(current_char,1,0,0,wpr_ATin,wpr_ATax,wpr_is_critical,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,whip_hbox,whip_hbox);
        else wpr_combatant = Players.PLtakeDamage(current_char,1,0,0,wpr_ATin,wpr_ATax,wpr_is_critical,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,whip_hbox,whip_hbox,wpr_combatant);

        if (wpr_combatant!=-1){ // if going to do damage
            this.PL_focus[current_char] = -1; // unset focus point
            if (checkEff(Stickmen_Slots+current_char,Card_Vampir)){                                                           // whipper Vampire's Card
                wpr_vamp_gain = maxOf(1,floor(this.PL_dmg_dealt[current_char]*getEff(Stickmen_Slots+current_char,Eff1)/100));               // set life gain amount
                antiCheatCheck();
                LP_Current[current_char] = clamp(LP_Current[current_char]+wpr_vamp_gain,0,LP_Max[current_char]);              // add life gain to current LP
                antiCheatSet();
                Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,wpr_vamp_gain,0x00FF00); // output life gain
            }
            if (checkEff(Stickmen_Slots+current_char,Card_ONIGIR) && Game_Mode==0 && random(100)<getEff(Stickmen_Slots+current_char,Eff1)) // whipper ONIGIRI's Card
                Drops.DPadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,2,0,0);                                      // drop onigiri

            if (checkEff(Stickmen_Slots+current_char,Card_Gldrsh) && Game_Mode==0 && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){    // whipper Gold rush Card
                wpr_gold_mult = 100;                                                                                                           // 100 as in 100%
                for (var s=0; s<Stickmen_Slots; s++)
                    if (checkEff(Stickmen_Slots+s,Medal_Gold))
                        wpr_gold_mult += getEff(Stickmen_Slots+s,Eff1);                                                                        // get gold medal effect from all 4 stickmen
                Drops.DPadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,1,floor(this.PL_dmg_dealt[current_char]*wpr_gold_mult/100),0); // drop gold
            }
            if (checkEff(Stickmen_Slots+current_char,Card_Knockb) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){ // whipper Knockback's Card
                whipper_KB = getEff(Stickmen_Slots+current_char,Eff2);                                                      // set knockback power
                if (Game_Mode!=1)
                     wpr_kb_vector.Vdistance(Enemies.EN_joint[wpr_combatant][0],this.PL_joint[current_char][1]);
                else wpr_kb_vector.Vdistance(Players.PL_joint[wpr_combatant][1],this.PL_joint[current_char][1]);
                normalize(wpr_kb_vector);
                scaleVector2D(wpr_kb_vector,0.2*whipper_KB);
                if (Game_Mode!=1)
                     scaleVector2D(wpr_kb_vector,Text_Spacing[EN_Info[Enemies.EN_array_ID[wpr_combatant]][EN_Species]]/EN_Info[Enemies.EN_array_ID[wpr_combatant]][EN_Size]);
                else scaleVector2D(wpr_kb_vector,0.1);
                if (Game_Mode!=1)
                     Enemies.EN_joint_destination[wpr_combatant][0].Vsub(wpr_kb_vector);
                else Players.PL_joint_destination[wpr_combatant][0].Vsub(wpr_kb_vector);
            }
        }
    }
    pullJoints(this.PL_joint[current_char][0] ,this.PL_joint[current_char][1] ,3.6 ,0.5 ,0.5 ); // top of head to neck
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][2] ,3.6 ,0.5 ,0.5 ); // neck to crotch
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][3] ,4.8 ,0.5 ,0.5 ); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][4] ,4.8 ,0.5 ,0.5 ); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3] ,this.PL_joint[current_char][5] ,4.8 ,0.5 ,0.5 ); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4] ,this.PL_joint[current_char][6] ,4.8 ,0.5 ,0.5 ); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][5] ,this.PL_joint[current_char][6] ,14.4,0.02,0.02); // right hand to left hand

    pullJoints(this.PL_joint[current_char][5] ,this.PL_joint[current_char][11],4.8 ,0   ,0.3 ); // right hand to whip joint 1
    pullJoints(this.PL_joint[current_char][11],this.PL_joint[current_char][12],4.8 ,0   ,0.3 ); // right hand to whip joint 2
    pullJoints(this.PL_joint[current_char][12],this.PL_joint[current_char][13],4.8 ,0   ,0.3 ); // whip joint 2 to whip joint 3
    pullJoints(this.PL_joint[current_char][13],this.PL_joint[current_char][14],4.8 ,0   ,0.3 ); // whip joint 3 to whip tip 4

    pullJoints(this.PL_joint[current_char][2] ,this.PL_joint[current_char][7] ,4.8 ,0.5 ,0.5 ); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2] ,this.PL_joint[current_char][8] ,4.8 ,0.5 ,0.5 ); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7] ,this.PL_joint[current_char][9] ,4.8 ,0.5 ,0.5 ); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8] ,this.PL_joint[current_char][10],4.8 ,0.5 ,0.5 ); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7] ,this.PL_joint[current_char][8] ,6   ,0.1 ,0.1 ); // left knee to right knee
};
