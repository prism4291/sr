// Bat species original name: ta
window.fff = SR_Enemy.prototype.ENbat;
SR_Enemy.prototype.ENbat = function(current_en){
    var bat_target,bat_size2;
    var bat_direction = new Vector2D;
    var bat_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 1;
        this.EN_joint[current_en][0].y += 1;
        this.EN_joint[current_en][1].x += 1;
        this.EN_joint[current_en][1].y += 1;
        this.EN_joint[current_en][2].x += 0;
        this.EN_joint[current_en][2].y += 0;
        this.EN_joint[current_en][3].x += 0;
        this.EN_joint[current_en][3].y += 2;
        this.EN_joint[current_en][4].x += 1;
        this.EN_joint[current_en][4].y += 1;
        this.EN_joint[current_en][5].x += 2;
        this.EN_joint[current_en][5].y += 0;
        this.EN_joint[current_en][6].x += 2;
        this.EN_joint[current_en][6].y += 2;
        for (var i=0; i<7; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0,0.99);
        moveJoint(this.EN_joint[current_en][1],this.EN_joint_destination[current_en][1],0,0.99);
        moveJoint(this.EN_joint[current_en][2],this.EN_joint_destination[current_en][2],0,0.99);
        moveJoint(this.EN_joint[current_en][3],this.EN_joint_destination[current_en][3],0,0.99);
        moveJoint(this.EN_joint[current_en][4],this.EN_joint_destination[current_en][4],0,0.99);
        moveJoint(this.EN_joint[current_en][5],this.EN_joint_destination[current_en][5],0,0.99);
        moveJoint(this.EN_joint[current_en][6],this.EN_joint_destination[current_en][6],0,0.99);

        assignVector2D(bat_direction,0,0);

        // movement
        bat_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-150,this.EN_joint[current_en][0].y-150,this.EN_joint[current_en][0].x+150,this.EN_joint[current_en][0].y+150,0);
        if (bat_target!=-1){
            bat_direction.Vdistance(Players.PL_joint[bat_target][2],this.EN_joint[current_en][0]);
            bat_target = normalize(bat_direction);
            bat_target -= EN_Info[this.EN_array_ID[current_en]][32]-10;
            if (bat_target<0)
                 scaleVector2D(bat_direction,-0.05);
            else scaleVector2D(bat_direction,0.05);
        }
        this.EN_joint[current_en][0].Vadd(bat_direction);
        if (random(100)<10){
            this.EN_joint[current_en][0].x += randomRange(-1,1);
            this.EN_joint[current_en][0].y += randomRange(-1,1);
        }
        this.EN_joint[current_en][2].x += randomRange(0,-0.1);
        this.EN_joint[current_en][3].x += randomRange(0,-0.1);
        this.EN_joint[current_en][5].x += randomRange(0,0.1);
        this.EN_joint[current_en][6].x += randomRange(0,0.1);

        // sew limbs
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],3*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][4],3*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],6*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][3],6*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],6*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][4],this.EN_joint[current_en][5],6*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][4],this.EN_joint[current_en][6],6*bat_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][5],this.EN_joint[current_en][6],6*bat_size,0.5,0.5);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<7; i++)
            this.ENgroundCollision(current_en,i,1);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            for (var i=0; i<7; i++){
                this.EN_joint[current_en][i].x += randomRange(-1,1);
                this.EN_joint[current_en][i].y -= randomRange(1,2);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<8; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        bat_size2 = 6*(150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],bat_size2,0.5,0.5);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][3],bat_size2,0.5,0.5);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],bat_size2,0.5,0.5);
        pullJoints(this.EN_joint[current_en][4],this.EN_joint[current_en][5],bat_size2,0.5,0.5);
        pullJoints(this.EN_joint[current_en][4],this.EN_joint[current_en][6],bat_size2,0.5,0.5);
        pullJoints(this.EN_joint[current_en][5],this.EN_joint[current_en][6],bat_size2,0.5,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<7; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
