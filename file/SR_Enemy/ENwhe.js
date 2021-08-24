// Wheel species original name: va
window.fff = SR_Enemy.prototype.ENwhe;
SR_Enemy.prototype.ENwhe = function(current_en){
    var whe_target,whe_size;
    var whe_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_joint[current_en][0].x += 1;
        this.EN_joint[current_en][0].y += 1;
        this.EN_joint[current_en][1].x += 1;
        this.EN_joint[current_en][1].y += 0;
        this.EN_joint[current_en][2].x += 1.85;
        this.EN_joint[current_en][2].y += 0.5;
        this.EN_joint[current_en][3].x += 1.85;
        this.EN_joint[current_en][3].y += 1.5;
        this.EN_joint[current_en][4].x += 1;
        this.EN_joint[current_en][4].y += 2;
        this.EN_joint[current_en][5].x += 1-0.85;
        this.EN_joint[current_en][5].y += 1.5;
        this.EN_joint[current_en][6].x += 1-0.85;
        this.EN_joint[current_en][6].y += 0.5;
        for (var i=0; i<7; i++)
            this.EN_joint_destination[current_en][i].Vset(this.EN_joint[current_en][i]);

        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0.5,0.99);
        for (var i=1; i<7; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0,0.99);

        // movement
        whe_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-200,this.EN_joint[current_en][0].y-50,this.EN_joint[current_en][0].x+200,this.EN_joint[current_en][0].y+50,0);
        if (whe_target!=-1 && random(100)<40 && (this.EN_is_grounded[current_en]&2)>0){
            if (Players.PL_joint[whe_target][2].x<this.EN_joint[current_en][0].x)
                 this.EN_joint[current_en][0].x += -2;
            else this.EN_joint[current_en][0].x += 2;
        }

        // sew limbs
        whe_size = 1.2*whe_size;
        for (var i=1; i<4; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+3],20*whe_size,0.1,0.1);
        for (var i=1; i<5; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+2],17*whe_size,0.1,0.1);
        pullJoints(this.EN_joint[current_en][i+0],this.EN_joint[current_en][1],17*whe_size,0.1,0.1);
        pullJoints(this.EN_joint[current_en][i+1],this.EN_joint[current_en][2],17*whe_size,0.1,0.1);
        for (var i=1; i<6; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],10*whe_size,0.1,0.1);
        pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][1],10*whe_size,0.1,0.1);
        for (var i=1; i<7; i++)
            pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][i],10*whe_size,0.2,0.2);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<7; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            this.EN_piece_size[current_en] = 0;
            for (var i=0; i<7; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<7; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        whe_size2 = 1.2*whe_size*(150-this.EN_piece_size[current_en])/150;
        for (var i=1; i<6; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],10*whe_size2,0.5,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<7; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
