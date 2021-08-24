// Copter species original name: ob
window.fff = SR_Enemy.prototype.ENcop;
SR_Enemy.prototype.ENcop = function(current_en){
    var cop_target,cop_sight,cop_size2;
    var cop_direction = new Vector2D;
    var cop_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 2;
        this.EN_joint[current_en][0].y += 4;
        this.EN_joint[current_en][1].x += 2;
        this.EN_joint[current_en][1].y += 2;
        this.EN_joint[current_en][2].x += 0;
        this.EN_joint[current_en][2].y += 0;
        this.EN_joint[current_en][3].x += 4;
        this.EN_joint[current_en][3].y += 0;
        for (var i=0; i<4; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0.1,0.99);
        moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0.1,0.99);
        moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],-0.1,0.99);
        moveJoint(this.EN_joint[current_en][3],this.EN_joint_destination[current_en][3],-0.1,0.99);
        assignVector2D(cop_direction,0,0);

        // movement
        cop_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-150,this.EN_joint[current_en][0].y-250,this.EN_joint[current_en][0].x+150,this.EN_joint[current_en][0].y+250,0);
        if (cop_target!=-1){
            cop_direction.x = Players.PL_joint[cop_target][2].x-this.EN_joint[current_en][0].x;
            cop_direction.y = Players.PL_joint[cop_target][2].y-10-this.EN_joint[current_en][0].y;
            if (cop_direction.x<-10)
                cop_direction.x = -0.02;
            else if (cop_direction.x>10)
                cop_direction.x = 0.02;
            else
                cop_direction.x = randomRange(-0.02,0.02);

            cop_sight = EN_Info[this.EN_array_ID[current_en]][32]/2;
            if (cop_direction.y<-cop_sight)
                cop_direction.y = -0.02;
            else if (cop_direction.y>cop_sight)
                cop_direction.y = 0.02;
            else
                cop_direction.y = randomRange(-0.1,0.1);
        }
        this.EN_joint[current_en][0].Vadd(cop_direction);
        this.EN_joint[current_en][2].x -= random(0.8);
        this.EN_joint[current_en][3].x += random(0.8);

        // sew limbs
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],8*cop_size,0.3,0.3);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][3],8*cop_size,0.3,0.3);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],16*cop_size,0.3,0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][2],12*cop_size,0.3,0.3);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][3],12*cop_size,0.3,0.3);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<4; i++)
            this.ENgroundCollision(current_en,i,1);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            for (var i=0; i<4; i++){
                this.EN_joint[current_en][i].x += randomRange(-1,1);
                this.EN_joint[current_en][i].y -= randomRange(1,2);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<4; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        cop_size2 = (150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],8*cop_size2,0.3,0.3);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][3],8*cop_size2,0.3,0.3);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],16*cop_size2,0.3,0.3);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<4; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
