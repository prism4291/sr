// Walker species original name: lb
window.fff = SR_Enemy.prototype.ENwlk; // da.fff = hh.prototype.lb
SR_Enemy.prototype.ENwlk = function(current_en){
    var wlk_var1;
    var wlk_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 1;
        this.EN_joint[current_en][0].y += 0-4*(wlk_size-1);
        this.EN_joint[current_en][1].x += 0;
        this.EN_joint[current_en][1].y += 2-4*(wlk_size-1);
        this.EN_joint[current_en][2].x += 2;
        this.EN_joint[current_en][2].y += 2-4*(wlk_size-1);
        for (var i=0; i<3; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],-0.05,0.99);
        moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0.05 ,0.99);
        moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],0.05 ,0.99);

        // movement
        if ((this.EN_is_grounded[current_en]&3)>0){
            wlk_var1 = -0.1;
            if (this.EN_state[current_en]==2)
                wlk_var1 *= -1;
            this.EN_joint[current_en][1].x += random(wlk_var1);
            this.EN_joint[current_en][2].x += random(wlk_var1);
            if (random(100)<1)
                this.EN_state[current_en] = cycle(this.EN_state[current_en]+1,1,2);
        }

        // sew limbs
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],9*wlk_size ,0.2,0.2);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][2],9*wlk_size ,0.2,0.2);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],11*wlk_size,0.2,0.2);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<3; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            // number of parts of the body used in the death animation
            for (var i=0; i<3; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            enemyDeath(this,current_en,0);
        }

    }
    // die
    else {
        // number of parts of the body used in the death animation
        for (var i=0; i<3; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<3; i++)
            this.ENgroundCollision(current_en,i,0.5);
        // how long dead body parts exist. Larger numbers make parts grow back and get larger.
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
