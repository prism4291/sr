// Bouncer species original name: pb
window.fff = SR_Enemy.prototype.ENbon;
SR_Enemy.prototype.ENbon = function(current_en){
    var bon_target,bon_var1,bon_size2;
    var bon_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 1;
        this.EN_joint[current_en][0].y += 0;
        this.EN_joint[current_en][1].x += 0;
        this.EN_joint[current_en][1].y += 1;
        this.EN_joint[current_en][2].x += 2;
        this.EN_joint[current_en][2].y += 1;
        for (var i=0; i<3; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],-0.15,0.99);
        moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0.1,0.99);
        moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],0.1,0.99);

        // movement
        bon_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-200,this.EN_joint[current_en][0].y-50,this.EN_joint[current_en][0].x+200,this.EN_joint[current_en][0].y+50,0);
        if ((this.EN_is_grounded[current_en]&2)>0 && random(100)<5){
            bon_var1 = 0;
            if (bon_target!=-1){
                if (Players.PL_joint[bon_target][2].x < this.EN_joint[current_en][0].x)
                     bon_var1 = -1;
                else bon_var1 = 1;
            } else fiftyfifty(-1,1);
            this.EN_joint[current_en][0].x += randomRange(0.4,0.6)*bon_var1;
            this.EN_joint[current_en][0].y += randomRange(-1.5,-2);
        }

        // sew limbs
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],5*bon_size,0.01,0.01);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][2],5*bon_size,0.01,0.01);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],6*bon_size,0.01,0.01);

        // attack
        if (bon_size>1 && this.EN_is_provoked[current_en]>0 && random(100)<10)
            this.ENadd(this.EN_joint[current_en][0].x>>3,this.EN_joint[current_en][0].y>>3,this.EN_array_ID[current_en]-1);
        this.EN_is_provoked[current_en] = 0;
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<3; i++)
            this.ENgroundCollision(current_en,i,0.9);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en]++;
            this.EN_joint[current_en][3].Vset(this.EN_joint[current_en][0]);
            this.EN_joint_destination[current_en][3].Vset(this.EN_joint[current_en][0]);
            for (var i=0; i<4; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            enemyDeath(this,current_en,0);
        }
    }

    else {
        for (var i=0; i<4; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        bon_size2 = (150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],5*bon_size2,0.01,0.01);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][2],5*bon_size2,0.01,0.01);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],6*bon_size2,0.01,0.01);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<4; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
