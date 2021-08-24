window.fff = SR_Player.prototype.PLmain;
SR_Player.prototype.PLmain = function(){ // Pg.prototype.move
    var team_leader,x_pos,y_pos,sign_height,opponent_leader;
    this.PLsetHeldChar();
    if (Game_Mode!=1)
         team_leader = Stickmen_Slots;
    else team_leader = Stickmen_Slots<<1;

    for (var current_char=0; current_char<team_leader; current_char++){
        if (this.PL_poison_ticks[current_char]>0 && LP_Current[current_char]>0){
            this.PL_poison_ticks[current_char]--;
            antiCheatCheck();
            LP_Current[current_char] = maxOf(LP_Current[current_char]-this.PL_poison_dmg[current_char],0);
            //LP_Current[current_char] = maxOf(LP_Current[current_char]-this.PL_poison_dmg[current_char],1); // unkillable stickmen for testing
            antiCheatSet();
        }
        if (this.PL_frozen_ticks[current_char]>0 && LP_Current[current_char]>0){
            this.PL_frozen_ticks[current_char]--;
        } else {
            if (this.PL_ice_ticks[current_char]>0 && LP_Current[current_char]>0){
                this.PL_ice_ticks[current_char]--;
                if (random(100)<this.PL_slowness[current_char])
                    continue;
            }
            if (LP_Current[current_char]!=0){
                if (Item_Inv[Stickmen_Slots+current_char]==0)
                     this.PL_class_ID[current_char] = 0;
                else this.PL_class_ID[current_char] = Ranger_Class[current_char];
            }
            // sign load zones (gauntlet style or no?)
            if ((Current_Stage!=55 && Current_Stage!=89 && Current_Screen!=Stage_Spawns[Current_Stage].length-1 || Enemies.EN_index_current==0) && (this.PL_is_grounded[current_char]&1)>0 && LP_Current[current_char]!=0){
                x_pos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)/2;
                y_pos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)/2;
                sign_height = Terrain.TR_high_surface[Terrain.TR_width-1];
                if (Stage_Spawns[Current_Stage][Current_Screen][1]==7) // if stage uses desert tileset
                    sign_height = Terrain.TR_low_surface[Terrain.TR_width-1];
                if (x_pos>Win_Width-12 && absVal(8*sign_height-y_pos)<10){
                    if (Current_Screen!=Stage_Spawns[Current_Stage].length-1)
                         Sign_Touched_Mode = 1;
                    else Sign_Touched_Mode = 2;
                }
            }
            this.PL_airtime[current_char]++; // increase time since last being grounded
            if (LP_Current[current_char]==0){
                for (var j=0; j<11; j++)
                    moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0.05,0.99);
            } else if (this.PL_is_grounded[current_char]==2){
                for (var j=0; j<11; j++)
                    moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0.01,0.99);
            } else if (this.PL_airtime[current_char]<10){
                moveJoint(this.PL_joint[current_char][0] ,this.PL_joint_destination[current_char][0] ,-0.2,0.99); // upward force to maintain stickman's posture
                moveJoint(this.PL_joint[current_char][1] ,this.PL_joint_destination[current_char][1] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][2] ,this.PL_joint_destination[current_char][2] ,-0.1,0.99); // upward force to maintain stickman's posture
                moveJoint(this.PL_joint[current_char][3] ,this.PL_joint_destination[current_char][3] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][4] ,this.PL_joint_destination[current_char][4] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][5] ,this.PL_joint_destination[current_char][5] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][6] ,this.PL_joint_destination[current_char][6] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][7] ,this.PL_joint_destination[current_char][7] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][8] ,this.PL_joint_destination[current_char][8] ,0   ,0.99);
                moveJoint(this.PL_joint[current_char][9] ,this.PL_joint_destination[current_char][9] ,0.3 ,0.99); // downward force to maintain stickman's posture
                moveJoint(this.PL_joint[current_char][10],this.PL_joint_destination[current_char][10],0.3 ,0.99); // downward force to maintain stickman's posture
            } else {
                for (var j=0; j<11; j++)
                    moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0.05,0.99);
            }
            if (LP_Current[current_char]==0 && this.PL_class_ID[current_char]!=Class_Dead){
                this.PL_class_ID[current_char] = Class_Dead;
                for (var j=0; j<11; j++){
                    this.PL_joint[current_char][j].x += randomRange(-2,2);
                    this.PL_joint[current_char][j].y += randomRange(-1,-3);
                }
                if (Game_Mode==1){
                    opponent_leader = getLeader(current_char,1);
                    for (var s=0; s<Stickmen_Slots; s++){ // spirit
                        if (checkEff(Stickmen_Slots+opponent_leader+s,Spirit_Eff) && getEff(Stickmen_Slots+opponent_leader+s,Eff1)>random(100)){
                            spirit_target = Players.PLfindPlayer(this.PL_joint[current_char][0].x-600,this.PL_joint[current_char][0].y-300,this.PL_joint[current_char][0].x+600,this.PL_joint[current_char][0].y+300,getLeader(current_char,0));
                            if (spirit_target!=-1)
                                Players.PLprojectileAttack(getEff(Stickmen_Slots+opponent_leader+s,Eff2),this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,spirit_target);
                        }
                    }
                }
            }
            if (this.PL_held_player==current_char && Game_Mode!=1){
                this.PL_joint[this.PL_held_player][this.PL_held_joint].x += (Mouse_Xpos-this.PL_joint[this.PL_held_player][this.PL_held_joint].x)*(LP_Current[current_char]==0? 0.04 :0.2);
                this.PL_joint[this.PL_held_player][this.PL_held_joint].y += (Mouse_Ypos-this.PL_joint[this.PL_held_player][this.PL_held_joint].y)*(LP_Current[current_char]==0? 0.04 :0.2);
            }

            /*if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100]))
                Walk(this,current_char,0);*/

            switch (this.PL_class_ID[current_char]){
                case 0: this.Stickman_pl(current_char); break; // previously case 0 defaulted to this.Boxer
                case 1: this.Boxer(current_char); break;
                case 2: this.Gladiator(current_char); break;
                case 3: this.Sniper(current_char); break;
                case 4: this.Magician(current_char); break;
                case 5: this.Priest(current_char); break;
                case 6: this.Gunner(current_char); break;
                case 7: this.Whipper(current_char); break;
                case 8: this.Angel(current_char); break;
                case Class_Dead:
                    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6,0.5,0.5);
                    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8,0.5,0.5);
                    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8,0.5,0.5);
                    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8,0.5,0.5);
                    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8,0.5,0.5);
                    break;
            }

            if ((this.PL_is_grounded[current_char]&1) > 0)
                this.PL_airtime[current_char] = 0; // if grounded, reset time since last being grounded

            this.PL_is_grounded[current_char] = 0; // reset grounded status
            for (var j=0; j<11; j++)
                this.PLmovement(current_char,j);
        }
    }
};
