// Snake species original name: sa
window.fff = SR_Enemy.prototype.ENsnk;
SR_Enemy.prototype.ENsnk = function(current_en){
    var snk_target,snk_var1,aux;
    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 0;
        this.EN_joint[current_en][1].x += 1;
        this.EN_joint[current_en][2].x += 2;
        for (var i=0; i<3; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0.05,0.99); // gravity
        moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0.05,0.9);
        moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],0.05,0.9);

        // movement
        snk_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-200,this.EN_joint[current_en][0].y-50,this.EN_joint[current_en][0].x+200,this.EN_joint[current_en][0].y+50,0);
        if (snk_target!=-1){
            if (Players.PL_joint[snk_target][2].x < this.EN_joint[current_en][0].x)
                 this.EN_joint[current_en][0].x += -0.001;
            else this.EN_joint[current_en][0].x += 0.001; // set to -1.001:1.001 to have enemies home on you. Players tracking code??
        }
        if ((this.EN_is_grounded[current_en]&2)>0){
            snk_var1 = 0;
            if (snk_target!=-1){
                if (Players.PL_joint[snk_target][2].x<this.EN_joint[current_en][0].x)
                     snk_var1 = -1;
                else snk_var1 = 1; // set to -1.001:1.001 to have enemies home on you. Players tracking code??
            } else   snk_var1 = fiftyfifty(-1,1);

            if (random(100)<10){
                this.EN_joint[current_en][0].x += randomRange(0.4,0.6)*snk_var1;
                this.EN_joint[current_en][0].y += randomRange(-1.5,-2);
            }
        }

        // sew limbs
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],0,0,0.01); // tail thing
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],0,0,0.01);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        this.ENgroundCollision(current_en,0,0.5);
        aux = this.EN_is_grounded[current_en];
        this.ENgroundCollision(current_en,1,0.5);
        this.ENgroundCollision(current_en,2,0.5);
        this.EN_is_grounded[current_en] = aux;
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            for (var i=0; i<3; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<3; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<3; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
