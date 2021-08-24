// magician class   original name: ma
window.fff = SR_Player.prototype.Magician;
SR_Player.prototype.Magician = function(current_char){
    var mgi_target,mgi_is_controlled,mgi_heals_eff;
    var mgi_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1); // set base stats
    var mgi_range = Range[current_char];
    var mgi_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var mgi_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             mgi_target = Enemies.ENfindEnemy(mgi_Xpos-mgi_range,mgi_Ypos-mgi_range,mgi_Xpos+mgi_range,mgi_Ypos+mgi_range);
        else mgi_target = Players.PLfindPlayer(mgi_Xpos-mgi_range,mgi_Ypos-mgi_range,mgi_Xpos+mgi_range,mgi_Ypos+mgi_range,getLeader(current_char,1));

        mgi_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            mgi_is_controlled = 1;
        }

        if (mgi_target!=-1){ // if a target is found
            // body movement while attacking
            if (mgi_Xpos < (Game_Mode!=1? Enemies.EN_joint[mgi_target][Enemies.EN_center].x :this.PL_joint[mgi_target][2].x)){ // if enemy is to the right
                this.PL_joint[current_char][5].x += 0.1; // move left hand right
                this.PL_joint[current_char][6].x += 0.1; // move right hand right
                this.PL_joint[current_char][1].x -= 0.2; // move neck left
            } else {                                 // if enemy is to the left
                this.PL_joint[current_char][5].x -= 0.1; // move left hand left
                this.PL_joint[current_char][6].x -= 0.1; // move right hand left
                this.PL_joint[current_char][1].x += 0.2; // move neck right
            }
            if (this.PL_reload_ticks[current_char]==0){       // when ready to attack
                this.PL_reload_ticks[current_char] = mgi_AGI; // restart reload timer

                pullJoints(this.PL_joint[current_char][5],this.PL_joint[current_char][6],0,0.1,0.1); // create held orb
                if (mgi_Xpos < (Game_Mode!=1? Enemies.EN_joint[mgi_target][Enemies.EN_center].x :this.PL_joint[mgi_target][2].x))
                     this.PL_focus[current_char] = 6; // set focus point to right hand
                else this.PL_focus[current_char] = 5; // set focus point to left hand

                if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                            // magician Heal's Card
                    mgi_heals_eff = getEff(Stickmen_Slots+current_char,Eff1);
                    antiCheatCheck();
                    LP_Current[current_char] = clamp(LP_Current[current_char]+mgi_heals_eff,0,LP_Max[current_char]);              // increase LP
                    antiCheatSet();
                    Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,mgi_heals_eff,0x00FF00); // output LP increase
                }

                if (this.PL_focus[current_char] != -1){                                                                                 // base attack activation
                    this.PLprojectileAttack(current_char,this.PL_joint[current_char][6].x,this.PL_joint[current_char][6].y,mgi_target); // perform projectile attack
                    this.PL_focus[current_char] = -1;                                                                                   // unset focus point
                }
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && mgi_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
            Swim(this,current_char);
        }
    }
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6 ,0.5 ,0.5 ); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6 ,0.5 ,0.5 ); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,4.8 ,0.5 ,0.5 ); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,4.8 ,0.5 ,0.5 ); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8 ,0.5 ,0.5 ); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8 ,0.5 ,0.5 ); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][5],this.PL_joint[current_char][6] ,10.8,0.01,0.01); // right hand to left hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,4.8 ,0.5 ,0.5 ); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,4.8 ,0.5 ,0.5 ); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8 ,0.5 ,0.5 ); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8 ,0.5 ,0.5 ); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6   ,0.1 ,0.1 ); // left knee to right knee
};
