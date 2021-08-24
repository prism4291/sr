// sniper class     original name: ua
window.fff = SR_Player.prototype.Sniper;
SR_Player.prototype.Sniper = function(current_char){
    var snp_target,snp_is_controlled,snp_heals_eff;
    var snp_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1); // set base stats
    var snp_range = Range[current_char];
    var snp_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var snp_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             snp_target = Enemies.ENfindEnemy(snp_Xpos-snp_range,snp_Ypos-snp_range,snp_Xpos+snp_range,snp_Ypos+snp_range);
        else snp_target = Players.PLfindPlayer(snp_Xpos-snp_range,snp_Ypos-snp_range,snp_Xpos+snp_range,snp_Ypos+snp_range,getLeader(current_char,1));

        snp_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            snp_is_controlled = 1;
        }

        if (snp_target!=-1){ // when a target is found
            // body movement while aiming
            if (snp_Xpos < (Game_Mode!=1? Enemies.EN_joint[snp_target][Enemies.EN_center].x :this.PL_joint[snp_target][2].x)){ // if enemy is to the right
                this.PL_joint[current_char][6].x += 0.2; // move right hand right
                this.PL_joint[current_char][6].y -= 0.2; // move right hand up
                this.PL_joint[current_char][5].x -= 0.2; // move left hand left
            } else {                                 // if enemy is to the left
                this.PL_joint[current_char][6].x -= 0.2; // move right hand left
                this.PL_joint[current_char][6].y -= 0.2; // move right hand up
                this.PL_joint[current_char][5].x += 0.2; // move left hand right
            }
            this.PL_joint[current_char][5].y += 0.2;     // move left hand down to balance forces
            if (this.PL_reload_ticks[current_char]==0){        // when ready to attack
                this.PL_reload_ticks[current_char] = snp_AGI;  // restart reload timer
                // body movement while attacking
                pullJoints(this.PL_joint[current_char][5],this.PL_joint[current_char][6],2,0.2,0.2); // create bow and arrow
                this.PL_focus[current_char] = 6;                                                     // set focus point to right hand

                if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                            // sniper Heal's Card
                    snp_heals_eff = getEff(Stickmen_Slots+current_char,Eff1);
                    antiCheatCheck();
                    LP_Current[current_char] = clamp(LP_Current[current_char]+snp_heals_eff,0,LP_Max[current_char]);              // increase LP
                    antiCheatSet();
                    Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,snp_heals_eff,0x00FF00); // output LP increase
                }
                if (this.PL_focus[current_char] != -1){                                                                                 // base attack activation
                    this.PLprojectileAttack(current_char,this.PL_joint[current_char][6].x,this.PL_joint[current_char][6].y,snp_target); // perform projectile attack
                    this.PL_focus[current_char] = -1;                                                                                   // unset focus point
                }
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && snp_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
            Swim(this,current_char);
        }
    }
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6,0.5 ,0.5 ); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6,0.5 ,0.5 ); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,4.8,0.5 ,0.5 ); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,4.8,0.5 ,0.5 ); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8,0.5 ,0.5 ); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8,0.5 ,0.5 ); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][5],this.PL_joint[current_char][6] ,9.6,0.02,0.02); // right hand to left hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,4.8,0.5 ,0.5 ); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,4.8,0.5 ,0.5 ); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8,0.5 ,0.5 ); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8,0.5 ,0.5 ); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1 ,0.1 ); // left knee to right knee
};
