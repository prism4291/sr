// boxer class      original name: sa
window.fff = SR_Player.prototype.Boxer;
SR_Player.prototype.Boxer = function(current_char){
    var box_target,box_is_controlled,glove_MP,box_heals_eff,glove_splash,glove_hbox_w,glove_hbox_h,box_combatant,box_vampHeal,box_KB;
    var box_kb_vector = new Vector2D;
    var box_ATin = AT_Min[current_char]; // set base stats
    var box_ATax = AT_Max[current_char];
    var box_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1);
    var box_range = Range[current_char];
    var box_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var box_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;
    var box_is_critical = 0;

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
              box_target = Enemies.ENfindEnemy(box_Xpos-box_range,box_Ypos-box_range,box_Xpos+box_range,box_Ypos);
        else  box_target = Players.PLfindPlayer(box_Xpos-box_range,box_Ypos-box_range,box_Xpos+box_range,box_Ypos,getLeader(current_char,1));

        box_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            box_is_controlled = 1;
        }

        if (box_target!=-1){ // when a target is found
            if (this.PL_reload_ticks[current_char]==0){       // when ready to attack
                this.PL_reload_ticks[current_char] = box_AGI; // restart reload timer
                // body movement when attacking
                if (box_Xpos < (Game_Mode!=1? Enemies.EN_joint[box_target][Enemies.EN_center].x :this.PL_joint[box_target][2].x)){ // if enemy is to the right
                    if (this.PL_joint[current_char][5].x < this.PL_joint[current_char][6].x){ // if right hand is in front
                        this.PL_joint[current_char][5].x += 4; // move left hand right
                        this.PL_joint[current_char][4].x -= 4; // move right elbow left
                        this.PL_joint[current_char][2].y += 1; // move crotch down
                        this.PL_focus[current_char] = 5;       // set focus point to left hand (focus is the point on the body where the attack originates from)
                    } else {                               // if left hand is in front
                        this.PL_joint[current_char][6].x += 4; // move right hand right
                        this.PL_joint[current_char][3].x -= 4; // move left elbow left
                        this.PL_joint[current_char][2].y += 1; // move crotch down
                        this.PL_focus[current_char] = 6;       // set focus point to right hand
                    }
                } else {                               // if enemy is to the left
                    if (this.PL_joint[current_char][6].x < this.PL_joint[current_char][5].x){ // if right hand is in front
                        this.PL_joint[current_char][5].x -= 4; // move left hand right
                        this.PL_joint[current_char][4].x += 4; // move right elbow left
                        this.PL_joint[current_char][2].y += 1; // move crotch down
                        this.PL_focus[current_char] = 5;       // set focus point to left hand
                    } else {                               // if left hand is in front
                        this.PL_joint[current_char][6].x -= 4; // move right hand right
                        this.PL_joint[current_char][3].x += 4; // move left elbow left
                        this.PL_joint[current_char][2].y += 1; // move crotch down
                        this.PL_focus[current_char] = 6;       // set focus point to right hand
                    }
                }
                antiCheatCheck();
                glove_MP = getVal(Item_Inv[Stickmen_Slots+current_char],Weap_MP_Price); // bonus attack activation
                if (MP_Bar[current_char]+MAG[current_char] < glove_MP)                  // if this hit doesn't fill MP bar
                     MP_Bar[current_char] += MAG[current_char];                         // add MAG to the magic bar
                else MP_Bar[current_char] = glove_MP;                                   // otherwise set the magic bar to full (maxOf capacity of magic bar is the weapon's MP)
                if (glove_MP==MP_Bar[current_char] && glove_MP>0 || glove_MP==-1){      // if magic bar is full and weapon has a bonus attack, or if bonus attack is free
                    MP_Bar[current_char] = 0;                                           // reset mp bar
                    this.PLprojectileAttack(current_char,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,box_target); // perform projectile attack
                }
                if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                            // boxer Heal's Card
                    box_heals_eff = getEff(Stickmen_Slots+current_char,Eff1);
                    LP_Current[current_char] = clamp(LP_Current[current_char]+box_heals_eff,0,LP_Max[current_char]);              // increase LP
                    Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,box_heals_eff,0x00FF00); // output LP increase
                }
                antiCheatSet();
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && box_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
        }
        Swim(this,current_char);
    }
    if (this.PL_focus[current_char]!=-1 && this.PL_held_player!=current_char){ // base attack activation
        // boxer splash damage
        glove_splash = getVal(Item_Inv[Stickmen_Slots+current_char],Item_Splash); // if weapon already does spash damage, set glove_splash to 1
        if (checkEff(Stickmen_Slots+current_char,Card_Explsn) && random(100)<getEff(Stickmen_Slots+current_char,Eff1))  // boxer Explosion's Card
            glove_splash = true;
        if (checkEff(Stickmen_Slots+current_char,Card_Critcl) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){ // boxer Critical's Card
            box_ATin += floor(getEff(Stickmen_Slots+current_char,Eff2)*box_ATin/100);
            box_ATax += floor(getEff(Stickmen_Slots+current_char,Eff2)*box_ATax/100);
            box_is_critical = 1;
        }
        glove_hbox_w = 12;
        glove_hbox_h = 8;
        if (checkEff(Stickmen_Slots+current_char,Card_Big)){ // boxer Big Card
            glove_hbox_w += floor(12*getEff(Stickmen_Slots+current_char,Eff1)/100);
            glove_hbox_h += floor(8*getEff(Stickmen_Slots+current_char,Eff1)/100);
        }
        if (Game_Mode!=1) // detect if basic attack hits
             box_combatant = Enemies.ENtakeDamage(current_char,glove_splash,0,0,box_ATin,box_ATax,box_is_critical,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,glove_hbox_w,glove_hbox_h);
        else box_combatant = Players.PLtakeDamage(current_char,glove_splash,0,0,box_ATin,box_ATax,box_is_critical,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,glove_hbox_w,glove_hbox_h,getLeader(current_char,1));

        if (box_combatant!=-1){ // if going to do damage
            this.PL_focus[current_char] = -1; // unset focus point
            if (checkEff(Stickmen_Slots+current_char,Card_Vampir)){                                                          // boxer Vampire's Card
                box_vampHeal = maxOf(1,floor(this.PL_dmg_dealt[current_char]*getEff(Stickmen_Slots+current_char,Eff1)/100));               // set life gain amount
                antiCheatCheck();
                LP_Current[current_char] = clamp(LP_Current[current_char]+box_vampHeal,0,LP_Max[current_char]);              // add life gain to current LP
                antiCheatSet();
                Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,box_vampHeal,0x00FF00); // output life gain
            }
            if (checkEff(Stickmen_Slots+current_char,Card_ONIGIR) && Game_Mode==0 && random(100)<getEff(Stickmen_Slots+current_char,Eff1)) // boxer ONIGIRI's card
                Drops.DPadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,2,0,0);                                      // drop onigiri

            if (checkEff(Stickmen_Slots+current_char,Card_Gldrsh) && Game_Mode==0 && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){    // boxer Gold rush Card
                box_gold_mult = 100;                                                                                                           // 100 as in 100%
                for (var s=0; s<Stickmen_Slots; s++){
                    if (checkEff(Stickmen_Slots+s,Medal_Gold))
                        box_gold_mult += getEff(Stickmen_Slots+s,Eff1);                                                                        // get gold medal effect from all 4 stickmen
                }
                Drops.DPadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,1,floor(this.PL_dmg_dealt[current_char]*box_gold_mult/100),0); // drop gold
            }
            if (checkEff(Stickmen_Slots+current_char,Card_Knockb) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){ // boxer Knockback's Card
                box_KB = getEff(Stickmen_Slots+current_char,Eff2);                                                          // set knockback power
                if (Game_Mode!=1)
                     box_kb_vector.Vdistance(Enemies.EN_joint[getLeader(current_char,1)][0],this.PL_joint[current_char][1]);
                else box_kb_vector.Vdistance(Players.PL_joint[getLeader(current_char,1)][1],this.PL_joint[current_char][1]);
                normalize(box_kb_vector);
                scaleVector2D(box_kb_vector,0.2*box_KB);
                if (Game_Mode!=1)
                     scaleVector2D(box_kb_vector,Text_Spacing[EN_Info[Enemies.EN_array_ID[getLeader(current_char,1)]][EN_Species]]/EN_Info[Enemies.EN_array_ID[getLeader(current_char,1)]][EN_Size]);
                else scaleVector2D(box_kb_vector,0.1);
                if (Game_Mode!=1)
                     Enemies.EN_joint_destination[getLeader(current_char,1)][0].Vsub(box_kb_vector);
                else Players.PL_joint_destination[getLeader(current_char,1)][0].Vsub(box_kb_vector);
            }
        }
    }
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6,0.5,0.5); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6,0.5,0.5); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,4.8,0.5,0.5); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,4.8,0.5,0.5); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8,0.5,0.5); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8,0.5,0.5); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,4.8,0.5,0.5); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,4.8,0.5,0.5); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8,0.5,0.5); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8,0.5,0.5); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1,0.1); // left knee to right knee
};
