// Spider species original name: mb
window.fff = SR_Enemy.prototype.ENspr;
SR_Enemy.prototype.ENspr = function(current_en){
    var spr_target,spr_size2,spr_size3;
    var spr_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 4;
        this.EN_joint[current_en][0].y += 0;
        this.EN_joint[current_en][1].x += 0;
        this.EN_joint[current_en][1].y += 0;
        this.EN_joint[current_en][2].x += 0;
        this.EN_joint[current_en][2].y += 7.99;
        this.EN_joint[current_en][3].x += 7.99;
        this.EN_joint[current_en][3].y += 0;
        this.EN_joint[current_en][4].x += 7.99;
        this.EN_joint[current_en][4].y += 7.99;
        this.EN_joint[current_en][5].x += 0;
        this.EN_joint[current_en][5].y += 0;
        this.EN_joint[current_en][6].x += 0;
        this.EN_joint[current_en][6].y += 7.99;
        this.EN_joint[current_en][7].x += 7.99;
        this.EN_joint[current_en][7].y += 0;
        this.EN_joint[current_en][8].x += 7.99;
        this.EN_joint[current_en][8].y += 7.99;
        for (var i=0; i<9; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],-0.05,0.99);
        moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],-0.1,0.99);
        moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],0.8,0.99);
        moveJoint(this.EN_joint[current_en][3],this.EN_joint_destination[current_en][3],-0.1,0.99);
        moveJoint(this.EN_joint[current_en][4],this.EN_joint_destination[current_en][4],0.8,0.99);
        moveJoint(this.EN_joint[current_en][5],this.EN_joint_destination[current_en][5],-0.1,0.99);
        moveJoint(this.EN_joint[current_en][6],this.EN_joint_destination[current_en][6],0.8,0.99);
        moveJoint(this.EN_joint[current_en][7],this.EN_joint_destination[current_en][7],-0.1,0.99);
        moveJoint(this.EN_joint[current_en][8],this.EN_joint_destination[current_en][8],0.8,0.99);

        // movement
        if (random(100)<50 && (this.EN_is_grounded[current_en]&3)>0){
            spr_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-500,this.EN_joint[current_en][0].y-25,this.EN_joint[current_en][0].x+500,this.EN_joint[current_en][0].y+25,0);
            if (spr_target!=-1){
                if (Players.PL_joint[spr_target][2].x<this.EN_joint[current_en][0].x)
                     this.EN_state[current_en] = 1;
                else this.EN_state[current_en] = 2;
            } else if (random(100)<10){
                this.EN_state[current_en] = fiftyfifty(1,2);
            }
            if (this.EN_state[current_en]==1){
                if (this.EN_joint[current_en][2].x < this.EN_joint[current_en][6].x){
                    this.EN_joint[current_en][6].x -= random(1);
                    this.EN_joint[current_en][6].y += randomRange(-1,-1);
                } else {
                    this.EN_joint[current_en][2].x -= random(1);
                    this.EN_joint[current_en][2].y += randomRange(-1,-1);
                }
                if (this.EN_joint[current_en][4].x < this.EN_joint[current_en][8].x){
                    this.EN_joint[current_en][8].x -= random(1);
                    this.EN_joint[current_en][8].y += randomRange(-1,-1);
                } else {
                    this.EN_joint[current_en][4].x -= random(1);
                    this.EN_joint[current_en][4].y += randomRange(-1,-1);
                }
                if (random(100)<1){
                    this.EN_joint[current_en][0].x -= 1;
                    this.EN_joint[current_en][0].y -= 3;
                }
            } else {
                if (this.EN_joint[current_en][2].x < this.EN_joint[current_en][6].x){
                    this.EN_joint[current_en][2].x += random(1);
                    this.EN_joint[current_en][2].y += randomRange(-1,-1);
                } else {
                    this.EN_joint[current_en][6].x += random(1);
                    this.EN_joint[current_en][6].y += randomRange(-1,-1);
                }
                if (this.EN_joint[current_en][4].x < this.EN_joint[current_en][8].x){
                    this.EN_joint[current_en][4].x += random(1);
                    this.EN_joint[current_en][4].y += randomRange(-1,-1);
                } else {
                    this.EN_joint[current_en][8].x += random(1);
                    this.EN_joint[current_en][8].y += randomRange(-1,-1);
                }
                if (random(100)<1){
                    this.EN_joint[current_en][0].x += 1;
                    this.EN_joint[current_en][0].y -= 3;
                }
            }
        }

        // sew limbs
        spr_size2 = spr_size*2.2;
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][5],3*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][7],3*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][6],3*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][5],this.EN_joint[current_en][6],2*spr_size2,0.2*0.3,0.2*0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][8],3*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][7],this.EN_joint[current_en][8],2*spr_size2,0.2*0.3,0.2*0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],4*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][3],4*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][2],4*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],3*spr_size2,0.2*0.3,0.2*0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][4],4*spr_size2,0.1*0.3,0.3);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][4],3*spr_size2,0.2*0.3,0.2*0.3);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][4],8*spr_size2,0.1*0.3,0.1*0.3);
        pullJoints(this.EN_joint[current_en][5],this.EN_joint[current_en][7],7*spr_size2,0.1*0.3,0.1*0.3);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<9; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            this.EN_piece_size[current_en] = 0;
            for (var i=1; i<9; i++){
                this.EN_joint[current_en][i].x += randomRange(-1,1);
                this.EN_joint[current_en][i].y -= randomRange(1,2);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<9; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        spr_size3 = 1.2*(150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],4*spr_size3,0.5,0.5);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][4],4*spr_size3,0.5,0.5);
        pullJoints(this.EN_joint[current_en][5],this.EN_joint[current_en][6],3*spr_size3,0.5,0.5);
        pullJoints(this.EN_joint[current_en][7],this.EN_joint[current_en][8],3*spr_size3,0.5,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<9; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
