// Digger species original name: rb
window.fff = SR_Enemy.prototype.ENdig;
SR_Enemy.prototype.ENdig = function(current_en){
    var dgr_sway;
    var dig_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_state[current_en] = floor(randomRange(4,7));
        this.EN_piece_size[current_en] = floor(random(400));
    }
    // perform
    else if (this.EN_state[current_en]<10){

        // sew body
        if (this.EN_piece_size[current_en]<500)
             moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0.1,0.99);
        else moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],-0.1,0.99);
        for (var i=1; i<this.EN_state[current_en]-1; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0,0.99);
        moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],1,0.99);

        // movement
        if (random(100)<10){
            dgr_sway = floor(random(4));
            this.EN_joint[current_en][dgr_sway].x += randomRange(-0.5,0.5);
        }
        this.EN_piece_size[current_en]++;
        if (this.EN_piece_size[current_en]>600)
            this.EN_piece_size[current_en] = floor(random(400));

        // sew limbs
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],8*dig_size,0.2,0.2);
        for (var i=1; i<this.EN_state[current_en]-2; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],6*dig_size,0.2,0.2);
        pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],6*dig_size,0.2,0);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=this.EN_state[current_en]-1; i<this.EN_state[current_en]; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            for (var i=0; i<this.EN_state[current_en]; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            this.EN_piece_size[current_en] = 0;
            enemyDeath(this,current_en,0);
            this.EN_state[current_en] += 10;
        }
    }
    // die
    else {
        for (var i=0; i<this.EN_state[current_en]-10; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        this.EN_is_grounded[current_en] = 0;
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
