// Dragon species original name: ua
window.fff = SR_Enemy.prototype.ENdgn;
SR_Enemy.prototype.ENdgn = function(current_en){
    var dgn_target,tiles_under_dgn,dgn_size2,dead_dgn_size;
    var dgn_direction = new Vector2D;
    var dgn_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0,0.99);
        for (var i=1; i<6; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0,0.9);

        assignVector2D(dgn_direction,0,0);

        // movement
        dgn_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-200,this.EN_joint[current_en][0].y-200,this.EN_joint[current_en][0].x+200,this.EN_joint[current_en][0].y+200,0);
        if (dgn_target!=-1){
            dgn_direction.Vdistance(Players.PL_joint[dgn_target][2],this.EN_joint[current_en][0]);
            dgn_target = normalize(dgn_direction);
            dgn_target -= EN_Info[this.EN_array_ID[current_en]][32]/2-10;
            if (dgn_target<0)
                 scaleVector2D(dgn_direction,-0.01);
            else scaleVector2D(dgn_direction,0.01);
        }
        tiles_under_dgn = Terrain.TR_tile_data[clamp(this.EN_joint[current_en][0].y+24,0,Inv_Top-1)>>3][clamp(this.EN_joint[current_en][0].x,0,Win_Width-1)>>3];
        if (0<=tiles_under_dgn && tiles_under_dgn<=8) // if dragon is <= 3 tiles away from solid land, fly up
            dgn_direction.y -= 0.02;
        if (random(100)<2){
            dgn_direction.x += randomRange(-0.5,0.5);
            dgn_direction.y += randomRange(-0.5,0.5);
        }

        // sew limbs
        this.EN_joint[current_en][0].Vadd(dgn_direction);
        dgn_size2 = 5*dgn_size;
        for (var i=0; i<5; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],dgn_size2,0,0.02);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<6; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][0]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            this.EN_piece_size[current_en] = 0;
            for (var i=0; i<6; i++){
                this.EN_joint[current_en][i].x += randomRange(-1,1);
                this.EN_joint[current_en][i].y -= randomRange(1,2);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<6; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        dead_dgn_size = 10*(150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],dead_dgn_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],dead_dgn_size,0.5,0.5);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][4],dead_dgn_size,0.5,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<6; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
