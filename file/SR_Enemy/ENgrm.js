// Germ species original name: qb
window.fff = SR_Enemy.prototype.ENgrm;
SR_Enemy.prototype.ENgrm = function(current_en){
    var grm_var1,grm_target,grm_size2,grm_size3;
    var grm_direction = new Vector2D;
    var grm_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1){

        // sew body
        for (var i=0; i<10; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0,0.98);
        if (this.EN_piece_size[current_en]<=0 && random(100)<5){
            grm_var1 = floor(random(3));
            if (grm_var1==0){
                grm_direction.x = (this.EN_joint[current_en][8].x+this.EN_joint[current_en][9].x)/2-this.EN_joint[current_en][7].x;
                grm_direction.y = (this.EN_joint[current_en][8].y+this.EN_joint[current_en][9].y)/2-this.EN_joint[current_en][7].y;
                normalize(grm_direction);
                scaleVector2D(grm_direction,grm_size);
                this.EN_joint[current_en][7].Vadd(grm_direction);
            } else if (grm_var1==1){
                grm_direction.x = (this.EN_joint[current_en][9].x+this.EN_joint[current_en][7].x)/2-this.EN_joint[current_en][8].x;
                grm_direction.y = (this.EN_joint[current_en][9].y+this.EN_joint[current_en][7].y)/2-this.EN_joint[current_en][8].y;
                normalize(grm_direction);
                scaleVector2D(grm_direction,grm_size);
                this.EN_joint[current_en][8].Vadd(grm_direction);
            } else if (grm_var1==2){
                grm_direction.x = (this.EN_joint[current_en][7].x+this.EN_joint[current_en][8].x)/2-this.EN_joint[current_en][9].x;
                grm_direction.y = (this.EN_joint[current_en][7].y+this.EN_joint[current_en][8].y)/2-this.EN_joint[current_en][9].y;
                normalize(grm_direction);
                scaleVector2D(grm_direction,grm_size);
                this.EN_joint[current_en][9].Vadd(grm_direction);
            }
            this.EN_piece_size[current_en] = 25*grm_size;
        }
        assignVector2D(grm_direction,0,0);

        // movement
        grm_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-200,this.EN_joint[current_en][0].y-200,this.EN_joint[current_en][0].x+200,this.EN_joint[current_en][0].y+200,0);
        if (grm_target!=-1){
            grm_direction.Vdistance(Players.PL_joint[grm_target][2],this.EN_joint[current_en][0]);
            normalize(grm_direction);
            for (var i=4; i<7; i++){
                this.EN_joint[current_en][i].x += 0.02*grm_direction.x;
                this.EN_joint[current_en][i].y += 0.02*grm_direction.y;
            }
        }

        // sew limbs
        for (var i=1; i<4; i++)
            pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][i],3*grm_size,0.05,0.05);
        for (var i=1; i<4; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+3],3*grm_size,0.05,0.05);
        for (var i=4; i<7; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+3],3*grm_size,0.05,0.01);
        if (this.EN_piece_size[current_en]--<5){
            grm_size2 = 0.01/grm_size;
            pullJoints(this.EN_joint[current_en][7],this.EN_joint[current_en][8],20*grm_size,grm_size2,grm_size2);
            pullJoints(this.EN_joint[current_en][8],this.EN_joint[current_en][9],20*grm_size,grm_size2,grm_size2);
            pullJoints(this.EN_joint[current_en][9],this.EN_joint[current_en][7],20*grm_size,grm_size2,grm_size2);
        }

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<10; i++) this.ENgroundCollision(current_en,i,0.9);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en]++;
            this.EN_piece_size[current_en] = 0;
            for (var i=0; i<4; i++){
                this.EN_joint[current_en][i].x += randomRange(-0.5,0.5);
                this.EN_joint[current_en][i].y -= randomRange(2,3);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<10; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.98);
        grm_size3 = (150-this.EN_piece_size[current_en])/150;
        for (var i=1; i<4; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+3],3*grm_size*grm_size3,0.05,0.05);
        for (var i=4; i<7; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+3],3*grm_size*grm_size3,0.05,0.05);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<10; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
