// priest class     original name: na
window.fff = SR_Player.prototype.Priest;
SR_Player.prototype.Priest = function(current_char){
    var pri_target,pri_is_controlled,pri_heals_eff;
    var pri_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1); // set base stats
    var pri_range = Range[current_char];
    var pri_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var pri_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             pri_target = Enemies.ENfindEnemy(pri_Xpos-pri_range,pri_Ypos-(pri_range>>1),pri_Xpos+pri_range,pri_Ypos+(pri_range>>1)); // vertical Range is 1/2 for priest
        else pri_target = Players.PLfindPlayer(pri_Xpos-pri_range,pri_Ypos-(pri_range>>1),pri_Xpos+pri_range,pri_Ypos+(pri_range>>1),getLeader(current_char,1));

        pri_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            pri_is_controlled = 1;
        }

        if (pri_target!=-1){ // when a target is found
            if (this.PL_reload_ticks[current_char]==0){       // when ready to attack
                this.PL_reload_ticks[current_char] = pri_AGI; // restart reload timer
                // body movement when attacking
                this.PL_joint[current_char][6].y -= 2; // move right hand up
                this.PL_joint[current_char][5].y += 2; // move left hand down

                if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                              // priest Heal's Card
                    pri_heals_eff = getEff(Stickmen_Slots+current_char,Eff1);
                    antiCheatCheck();
                    for (var s=getLeader(current_char,0); s<getLeader(current_char,0)+Stickmen_Slots; s++){
                        if (s!=current_char && LP_Current[s]!=0){
                            LP_Current[s] = clamp(LP_Current[s]+pri_heals_eff,0,LP_Max[s]);                         // increase LP
                            Indicators.INadd(this.PL_joint[s][0].x,this.PL_joint[s][0].y,0,pri_heals_eff,0x00FF00); // output LP increase
                        }
                    }
                    antiCheatSet();
                }
                if (Game_Mode!=1){                                                                                                     // base attack activation
                    for (var e=0; e<Enemies.EN_index_current; e++){                                                                    // find all enemies
                        if (Enemies.EN_is_found[e]==true)
                            this.PLprojectileAttack(current_char,this.PL_joint[current_char][6].x,this.PL_joint[current_char][6].y,e); // perform projectile attack
                    }
                } else {
                    for (var s=getLeader(current_char,1); s<getLeader(current_char,1)+Stickmen_Slots; s++){                            // find all enemy players
                        if (Players.PL_is_chosen[s]==true)
                            this.PLprojectileAttack(current_char,this.PL_joint[current_char][6].x,this.PL_joint[current_char][6].y,s); // perform projectile attack
                    }
                }
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && pri_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
            Swim(this,current_char);
        }
    }
    //if (Sett_LP_Bar_Disp&1) filledRect(pri_Xpos-pri_range,pri_Ypos-pri_range,pri_range*2,pri_range*2,0xFF0000FF); // draw aura

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
