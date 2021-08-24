// Cactus species original name: nb
window.fff = SR_Enemy.prototype.ENcts;
SR_Enemy.prototype.ENcts = function(current_en){
    var cts_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 1;
        this.EN_joint[current_en][0].y += 0;
        this.EN_joint[current_en][1].x += 0;
        this.EN_joint[current_en][1].y += 1;
        this.EN_joint[current_en][2].x += 2;
        this.EN_joint[current_en][2].y += 1;
        this.EN_joint[current_en][3].x += 1;
        this.EN_joint[current_en][3].y += 2;

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1){

        // sew body
        for (var i=0; i<3; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],-0.04,0.99);
        moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],1,0.99);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][3],20*cts_size,0.2,0);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][3],15*cts_size,0.2,0);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],20*cts_size,0.2,0);

        // attack
        this.EN_joint[current_en][0].x = this.EN_joint[current_en][3].x;
        this.EN_joint[current_en][1].x = this.EN_joint[current_en][3].x-8*cts_size;
        this.EN_joint[current_en][2].x = this.EN_joint[current_en][3].x+8*cts_size;
        if (this.EN_reload[current_en]>0){
            this.EN_reload[current_en]--;
        } else if (this.EN_is_provoked[current_en]>0){
            this.EN_joint[current_en][0].y += randomRange(0,1);
            this.EN_joint[current_en][1].y += randomRange(0,1);
            this.EN_joint[current_en][2].y += randomRange(0,1);
            if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
                 this.ENattack(current_en,0);
            else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));
        }
        this.EN_is_provoked[current_en] = 0;

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<4; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].x = this.EN_joint[current_en][0].x;
        this.EN_joint[current_en][this.EN_center].y = (this.EN_joint[current_en][0].y+this.EN_joint[current_en][1].y)>>1;

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en]++;
            for (var i=0; i<4; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<4; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<4; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
