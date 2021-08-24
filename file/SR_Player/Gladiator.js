// gladiator class  original name: ta
window.fff = SR_Player.prototype.Gladiator;
SR_Player.prototype.Gladiator = function(current_char){
    var gla_target,gla_is_controlled,sword_MP,gla_heals_eff,gla_combatant,gla_vampHeal,gla_gold_mult;
    var sword_vector = new Vector2D;
    var gla_ATin = AT_Min[current_char]; // set base stats
    var gla_ATax = AT_Max[current_char];
    var gla_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1);
    var gla_range = Range[current_char];
    var gla_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var gla_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;
    var gla_is_critical = 0;

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             gla_target = Enemies.ENfindEnemy(gla_Xpos-gla_range,gla_Ypos-gla_range,gla_Xpos+gla_range,gla_Ypos);
        else gla_target = Players.PLfindPlayer(gla_Xpos-gla_range,gla_Ypos-gla_range,gla_Xpos+gla_range,gla_Ypos,getLeader(current_char,1));

        gla_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            gla_is_controlled = 1;
        }

        if (gla_target!=-1){ // when a target is found
            if (this.PL_reload_ticks[current_char]==0){       // when ready to attack
                this.PL_reload_ticks[current_char] = gla_AGI; // restart reload timer
                // body movement when attacking
                if (gla_Xpos < (Game_Mode!=1? Enemies.EN_joint[gla_target][Enemies.EN_center].x :this.PL_joint[gla_target][2].x)){ // if enemy is to the right
                    this.PL_joint[current_char][5].x += 3;                                                 // move left hand right
                    this.PL_joint[current_char][5].y += 0.2*(gla_Ypos-2-this.PL_joint[current_char][5].y); // move left hand down
                    this.PL_joint[current_char][6].x = this.PL_joint[current_char][5].x-2;                 // move right hand behind left hand
                    this.PL_joint[current_char][6].y = this.PL_joint[current_char][5].y;                   // move right hand to same height as left hand
                    this.PL_joint[current_char][1].x -= 3;                                                 // move neck right
                } else {                                                                               // if enemy is to the left
                    this.PL_joint[current_char][5].x -= 3;                                                 // move left hand left
                    this.PL_joint[current_char][5].y += 0.2*(gla_Ypos-2-this.PL_joint[current_char][5].y); // move left hand down
                    this.PL_joint[current_char][6].x = this.PL_joint[current_char][5].x+2;                 // move right hand in front of left hand
                    this.PL_joint[current_char][6].y = this.PL_joint[current_char][5].y;                   // move right hand to same height as left hand
                    this.PL_joint[current_char][1].x += 3;                                                 // move neck right
                }
                this.PL_focus[current_char] = 5;                                                       // set focus point to left hand
                antiCheatCheck();
                sword_MP = getVal(Item_Inv[Stickmen_Slots+current_char],Weap_MP_Price); // bonus attack activation
                if (MP_Bar[current_char]+MAG[current_char] < sword_MP)                  // if this hit doesn't fill MP bar
                     MP_Bar[current_char] += MAG[current_char];                         // add MAG to the magic bar
                else MP_Bar[current_char] = sword_MP;                                   // otherwise set the magic bar to full (maxOf capacity of magic bar is the weapon's MP)
                if (MP_Bar[current_char]==sword_MP && sword_MP>0){                      // if magic bar is full and the weapon has a bonus attack
                    MP_Bar[current_char] = 0;                                           // reset mp bar
                    this.PL_gladr_resid_count[current_char] = getVal(Item_Inv[Stickmen_Slots+current_char],41); // perform projectile attack
                }
                if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                            // gladiator Heal's Card
                    gla_heals_eff = getEff(Stickmen_Slots+current_char,Eff1);
                    LP_Current[current_char] = clamp(LP_Current[current_char]+gla_heals_eff,0,LP_Max[current_char]);              // increase LP
                    Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,gla_heals_eff,0x00FF00); // output LP increase
                }
                antiCheatSet();
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && gla_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
        }
        Swim(this,current_char);
    }
    if (this.PL_focus[current_char]!=-1 && this.PL_held_player!=current_char){ // base attack activation
        if (checkEff(Stickmen_Slots+current_char,Card_Critcl) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){ // gladiator Critical's Card
            gla_ATin += floor(getEff(Stickmen_Slots+current_char,Eff2)*gla_ATin/100);
            gla_ATax += floor(getEff(Stickmen_Slots+current_char,Eff2)*gla_ATax/100);
            gla_is_critical = 1;
        }
        sword_vector.Vdistance(this.PL_joint[current_char][5],this.PL_joint[current_char][6]);
        normalize(sword_vector);
        scaleVector2D(sword_vector,gla_range);

        if (Game_Mode!=1) // detect if basic attack hits
             gla_combatant = Enemies.ENtakeDamage(current_char,1,0,0,gla_ATin,gla_ATax,gla_is_critical,this.PL_joint[current_char][6].x+sword_vector.x/2,this.PL_joint[current_char][6].y+sword_vector.y/2,absVal(sword_vector.x),absVal(sword_vector.y));
        else gla_combatant = Players.PLtakeDamage(current_char,1,0,0,gla_ATin,gla_ATax,gla_is_critical,this.PL_joint[current_char][6].x+sword_vector.x/2,this.PL_joint[current_char][6].y+sword_vector.y/2,absVal(sword_vector.x),absVal(sword_vector.y),getLeader(current_char,1));

        if (gla_combatant!=-1){ // if going to do damage
            this.PL_focus[current_char] = -1; // unset focus point
            if (checkEff(Stickmen_Slots+current_char,Card_Vampir)){                                                          // gladiator Vampire's Card
                gla_vampHeal = maxOf(1,floor(this.PL_dmg_dealt[current_char]*getEff(Stickmen_Slots+current_char,Eff1)/100));               // set life gain amount
                antiCheatCheck();
                LP_Current[current_char] = clamp(LP_Current[current_char]+gla_vampHeal,0,LP_Max[current_char]);              // add life gain to current LP
                antiCheatSet();
                Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,gla_vampHeal,0x00FF00); // output life gain
            }
            if (checkEff(Stickmen_Slots+current_char,Card_ONIGIR) && Game_Mode==0 && random(100)<getEff(Stickmen_Slots+current_char,Eff1)) // gladiator ONIGIRI's Card
                Drops.DPadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,2,0,0);                                      // drop onigiri

            if (checkEff(Stickmen_Slots+current_char,Card_Gldrsh) && Game_Mode==0 && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){    // gladiator Gold rush Card
                gla_gold_mult = 100;                                                                                                           // 100 as in 100%
                for (var s=0; s<Stickmen_Slots; s++){
                    if (checkEff(Stickmen_Slots+s,Medal_Gold))
                        gla_gold_mult += getEff(Stickmen_Slots+s,Eff1);                                                                        // get gold medal effect from all 4 stickmen
                }
                Drops.DPadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,1,floor(this.PL_dmg_dealt[current_char]*gla_gold_mult/100),0); // drop gold
            }
        }
    }
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6,0.5 ,0.5 ); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6,0.5 ,0.5 ); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,4.8,0.5 ,0.5 ); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,4.8,0.5 ,0.5 ); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8,0.5 ,0.5 ); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8,0.5 ,0.5 ); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][4] ,4.8,0.01,0.01); // right elbow to left elbow
    pullJoints(this.PL_joint[current_char][5],this.PL_joint[current_char][6] ,2.4,0.5 ,0.5 ); // right hand to left hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,4.8,0.5 ,0.5 ); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,4.8,0.5 ,0.5 ); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8,0.5 ,0.5 ); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8,0.5 ,0.5 ); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1 ,0.1 ); // left knee to right knee

    if (this.PL_gladr_resid_count[current_char]>0){ // gladiator emits 1 residue at a time
        this.PL_gladr_resid_count[current_char]--;

        sword_vector.Vdistance(this.PL_joint[current_char][5],this.PL_joint[current_char][6]);
        normalize(sword_vector);
        scaleVector2D(sword_vector,gla_range);
        sword_vector.Vadd(this.PL_joint[current_char][6]);
        if (Game_Mode!=1)
             this.PLprojectileAttack(current_char,sword_vector.x,sword_vector.y,0);
        else this.PLprojectileAttack(current_char,sword_vector.x,sword_vector.y,getLeader(current_char,1));
    }
};
