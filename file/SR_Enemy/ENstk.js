// Stickman species original name: ma
window.fff = SR_Enemy.prototype.ENstk;
SR_Enemy.prototype.ENstk = function(current_en,type){
    var stk_target,stk_var1,stk_var2,stk_var3,stk_body_force,stk_size2,dead_stk_size;
    var stk_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        if (type==4){
            moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],-0.2,0.99);
            moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0,0.99);
            moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],-0.1,0.99);
            moveJoint(this.EN_joint[current_en][3],this.EN_joint_destination[current_en][3],0,0.99);
            moveJoint(this.EN_joint[current_en][4],this.EN_joint_destination[current_en][4],0,0.99);
            moveJoint(this.EN_joint[current_en][5],this.EN_joint_destination[current_en][5],0,0.99);
            moveJoint(this.EN_joint[current_en][6],this.EN_joint_destination[current_en][6],0,0.99);
            moveJoint(this.EN_joint[current_en][7],this.EN_joint_destination[current_en][7],0,0.99);
            moveJoint(this.EN_joint[current_en][8],this.EN_joint_destination[current_en][8],0,0.99);
            moveJoint(this.EN_joint[current_en][9],this.EN_joint_destination[current_en][9],0.3,0.99);
            moveJoint(this.EN_joint[current_en][10],this.EN_joint_destination[current_en][10],0.3,0.99);
        }
        if (type==12){
            moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],-0.02,0.99);
            moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0,0.99);
            moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],-0.01,0.99);
            moveJoint(this.EN_joint[current_en][3],this.EN_joint_destination[current_en][3],0,0.99);
            moveJoint(this.EN_joint[current_en][4],this.EN_joint_destination[current_en][4],0,0.99);
            moveJoint(this.EN_joint[current_en][5],this.EN_joint_destination[current_en][5],0,0.99);
            moveJoint(this.EN_joint[current_en][6],this.EN_joint_destination[current_en][6],0,0.99);
            moveJoint(this.EN_joint[current_en][7],this.EN_joint_destination[current_en][7],0,0.99);
            moveJoint(this.EN_joint[current_en][8],this.EN_joint_destination[current_en][8],0,0.99);
            moveJoint(this.EN_joint[current_en][9],this.EN_joint_destination[current_en][9],0.1,0.99);
            moveJoint(this.EN_joint[current_en][10],this.EN_joint_destination[current_en][10],0.1,0.99);
        }

        // movement
        if (random(100)<50 && (this.EN_is_grounded[current_en]&3)>0){
            stk_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-200,this.EN_joint[current_en][0].y-50,this.EN_joint[current_en][0].x+200,this.EN_joint[current_en][0].y+50,0);
            if (stk_target!=-1){
                if (Players.PL_joint[stk_target][2].x<this.EN_joint[current_en][0].x)
                     this.EN_state[current_en] = 1;
                else this.EN_state[current_en] = 2;
            } else if (random(100)<10){
                     this.EN_state[current_en] = fiftyfifty(1,2);
            }
            stk_var1 = 1;
            stk_var2 = 1;
            stk_var3 = 0;
            if (type==12){
                stk_var2 = 0.25;
                stk_var1 = 0.3;
                stk_var3 = 0.25;
            }
            if (this.EN_state[current_en]==1){
                if (this.EN_joint[current_en][9].x<this.EN_joint[current_en][10].x){
                    this.EN_joint[current_en][10].x -= random(stk_var2);
                    this.EN_joint[current_en][10].y -= stk_var1;
                } else {
                    this.EN_joint[current_en][9].x -= random(stk_var2);
                    this.EN_joint[current_en][9].y -= stk_var1;
                }
                this.EN_joint[current_en][5].x -= random(stk_var3);
                this.EN_joint[current_en][6].x -= random(stk_var3);
            } else {
                if (this.EN_joint[current_en][9].x<this.EN_joint[current_en][10].x){
                    this.EN_joint[current_en][9].x += random(stk_var2);
                    this.EN_joint[current_en][9].y -= stk_var1;
                } else {
                    this.EN_joint[current_en][10].x += random(stk_var2);
                    this.EN_joint[current_en][10].y -= stk_var1;
                }
                this.EN_joint[current_en][5].x += random(stk_var3);
                this.EN_joint[current_en][6].x += random(stk_var3);
            }
        }

        // sew limbs
        stk_body_force = 0.5;
        stk_size2 = 1.2*stk_size;
        if (type==12){
            stk_body_force = 0.02;
            stk_size2 = 1*stk_size;
        }
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],3*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],3*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][3],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][4],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][5],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][4],this.EN_joint[current_en][6],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][7],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][8],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][7],this.EN_joint[current_en][9],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][8],this.EN_joint[current_en][10],4*stk_size2,stk_body_force,stk_body_force);
        pullJoints(this.EN_joint[current_en][7],this.EN_joint[current_en][8],5*stk_size2,stk_body_force,stk_body_force);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<11; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][1]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            this.EN_piece_size[current_en] = 0;
            for (var i=0; i<11; i++){
                this.EN_joint[current_en][i].x += randomRange(-1,1);
                this.EN_joint[current_en][i].y -= randomRange(1,2);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<11; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        dead_stk_size = 1.2*(150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],3*dead_stk_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][5],4*dead_stk_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][4],this.EN_joint[current_en][6],4*dead_stk_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][7],this.EN_joint[current_en][9],4*dead_stk_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][8],this.EN_joint[current_en][10],4*dead_stk_size,0.5,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<11; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
