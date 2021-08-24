// Tree species original name: na
window.fff = SR_Enemy.prototype.ENtre;
SR_Enemy.prototype.ENtre = function(current_en,type){
    var tree_sway;
    var tre_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_state[current_en] = floor(randomRange(4,8));
    }
    // perform
    else if (this.EN_state[current_en]<10){

        // sew body
        if (type==5){
            for (var i=0; i<this.EN_state[current_en]-1; i++)
                moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],-0.04,0.99);
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],1,0.99);
        } else if (type==18){
            for (var i=0; i<this.EN_state[current_en]-1; i++)
                moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.04,0.99);
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],-1,0.99);
        }

        // movement
        if (random(100)<10){
            tree_sway = floor(random(4));
            this.EN_joint[current_en][tree_sway].x += randomRange(-0.5,0.5);
        }

        // sew limbs
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],8*tre_size,0.2,0.2);
        for (var i=1; i<this.EN_state[current_en]-2; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],6*tre_size,0.2,0.2);
        pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],6*tre_size,0.2,0);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<this.EN_state[current_en]; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].x = (this.EN_joint[current_en][0].x+this.EN_joint[current_en][this.EN_state[current_en]-1].x)>>1;
        this.EN_joint[current_en][this.EN_center].y = (this.EN_joint[current_en][0].y+this.EN_joint[current_en][this.EN_state[current_en]-1].y)>>1;

        // death
        if (this.EN_health[current_en]<=0){
            for (var i=0; i<this.EN_state[current_en]; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            this.EN_state[current_en] += 10;
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<this.EN_state[current_en]-10; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<this.EN_state[current_en]-10; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
