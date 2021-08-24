// Fish species original name: wa
window.fff = SR_Enemy.prototype.ENfsh;
SR_Enemy.prototype.ENfsh = function(current_en){
    var fsh_target,fsh_size2,fsh_size3;
    var fsh_direction = new Vector2D;
    var fsh_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        this.EN_state[current_en] = 1;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0,0.99);
        for (var i=1; i<5; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0,0.9);

        assignVector2D(fsh_direction,0,0);

        // movement
        fsh_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-150,this.EN_joint[current_en][0].y-50,this.EN_joint[current_en][0].x+150,this.EN_joint[current_en][0].y+50,0);
        if (fsh_target!=-1){
            fsh_direction.Vdistance(Players.PL_joint[fsh_target][2],this.EN_joint[current_en][0]);
            fsh_target = normalize(fsh_direction);
            fsh_target -= EN_Info[this.EN_array_ID[current_en]][32]/2-10;
            if (fsh_target<0)
                 scaleVector2D(fsh_direction,-0.01);
            else scaleVector2D(fsh_direction,0.01);
        }
        if (Terrain.TR_tile_data[clamp(this.EN_joint[current_en][0].y-7,0,Inv_Top-1)>>3][clamp(this.EN_joint[current_en][0].x,0,Win_Width-1)>>3] < 0)
            fsh_direction.y += 0.03;
        if (random(100)<2){
            fsh_direction.x += randomRange(-0.5,0.5);
            fsh_direction.y += randomRange(-0.5,0.5);
        }

        // sew limbs
        this.EN_joint[current_en][0].Vadd(fsh_direction);
        fsh_size2 = 6*fsh_size;
        pullJoints(this.EN_joint[current_en][0],this.EN_joint[current_en][1],9*fsh_size,0,0.1);
        pullJoints(this.EN_joint[current_en][1],this.EN_joint[current_en][2],5*fsh_size,0,0.1);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],6*fsh_size,0,0.1);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][4],6*fsh_size,0,0.1);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][4],8*fsh_size,0.1,0.1);

        // attack
        if (EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]==0)
             this.ENattack(current_en,0);
        else this.ENattack(current_en,randInt(EN_Info[this.EN_array_ID[current_en]][En_2nd_Att]+1));

        // check if grounded
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<5; i++)
            this.ENgroundCollision(current_en,i,0.5);
        this.EN_joint[current_en][this.EN_center].Vset(this.EN_joint[current_en][1]);

        // death
        if (this.EN_health[current_en]<=0){
            this.EN_state[current_en] = 3;
            this.EN_piece_size[current_en] = 0;
            for (var i=0; i<5; i++){
                this.EN_joint[current_en][i].x += randomRange(-2,2);
                this.EN_joint[current_en][i].y -= randomRange(2,4);
            }
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<5; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        fsh_size3 = 7*fsh_size*(150-this.EN_piece_size[current_en])/150;
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][3],fsh_size3,0.5,0.5);
        pullJoints(this.EN_joint[current_en][2],this.EN_joint[current_en][4],fsh_size3,0.5,0.5);
        pullJoints(this.EN_joint[current_en][3],this.EN_joint[current_en][4],fsh_size3,0.5,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<5; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
