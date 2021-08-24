// Eel species original name: eb
window.fff = SR_Enemy.prototype.ENeel;
SR_Enemy.prototype.ENeel = function(current_en,type){
    var eel_target,eel_var1,eel_var2;
    var eel_direction = new Vector2D;
    var eel_size = EN_Info[this.EN_array_ID[current_en]][EN_Size];

    // spawn
    if (this.EN_state[current_en]==0){
        if (random(100)<50)
             this.EN_state[current_en] = 1;
        else this.EN_state[current_en] = 2;
    }
    // perform
    else if (this.EN_state[current_en]==1 || this.EN_state[current_en]==2){

        // sew body
        moveJoint(this.EN_joint[current_en][0],this.EN_joint_destination[current_en][0],0,0.98);
        for (var i=1; i<6; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0,0.9);

        // movement
        if (type==9){
            assignVector2D(eel_direction,0,0);
            eel_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-150,this.EN_joint[current_en][0].y-50,this.EN_joint[current_en][0].x+150,this.EN_joint[current_en][0].y+50,0);
            if (eel_target!=-1){
                eel_direction.Vdistance(Players.PL_joint[eel_target][2],this.EN_joint[current_en][0]);
                eel_target = normalize(eel_direction);
                eel_target -= EN_Info[this.EN_array_ID[current_en]][32]/2-10;
                if (eel_target<0){
                    scaleVector2D(eel_direction,-0.05);
                    if (this.EN_joint[current_en][0].x>Win_Height)
                        setPerpendicular(eel_direction);

                    if (this.EN_joint[current_en][0].x<128){
                        setPerpendicular(eel_direction);
                        scaleVector2D(eel_direction,-1);
                    }
                } else  scaleVector2D(eel_direction,0.01);
            }
            eel_target = clamp(this.EN_joint[current_en][0].x,0,Win_Width-1)>>3;
            eel_var1 = clamp(this.EN_joint[current_en][0].y-7,0,Inv_Top-1)>>3;
            eel_target = Terrain.TR_tile_data[eel_var1][eel_target];
            if (eel_target<0)
                eel_direction.y += 0.05;
            eel_target = clamp(this.EN_joint[current_en][0].x+eel_direction.x,0,Win_Width-1)>>3;
            eel_var1 = clamp(this.EN_joint[current_en][0].y+eel_direction.y,0,Inv_Top-1)>>3;
            eel_target = Terrain.TR_tile_data[eel_var1][eel_target];
            if (0<=eel_target && eel_target<=8)
                setPerpendicular(eel_direction);
        } else {
            assignVector2D(eel_direction,0,0);
            eel_target = Players.PLfindPlayer(this.EN_joint[current_en][0].x-500,this.EN_joint[current_en][0].y-500,this.EN_joint[current_en][0].x+500,this.EN_joint[current_en][0].y+500,0);
            if (eel_target!=-1){
                eel_direction.Vdistance(Players.PL_joint[eel_target][2],this.EN_joint[current_en][0]);
                eel_target = normalize(eel_direction);
                eel_target -= EN_Info[this.EN_array_ID[current_en]][32]/2-10;
                if (eel_target<0){
                    if (this.EN_state[current_en]==1){
                        scaleVector2D(eel_direction,-0.05);
                    } else {
                        scaleVector2D(eel_direction,0.05);
                        setPerpendicular(eel_direction);
                    }
                } else  scaleVector2D(eel_direction,0.02);
            }
            eel_target = clamp(this.EN_joint[current_en][0].x+eel_direction.x,0,Win_Width-1)>>3;
            eel_var1 = clamp(this.EN_joint[current_en][0].y+eel_direction.y,0,Inv_Top-1)>>3;
            eel_target = Terrain.TR_tile_data[eel_var1][eel_target];
            if (0<=eel_target && eel_target<=8){
                setPerpendicular(eel_direction);
                if (this.EN_state[current_en]==2)
                    scaleVector2D(eel_direction,-1);
            }
        }
        eel_target = clamp(this.EN_joint[current_en][0].x+eel_direction.x,0,Win_Width-1)>>3;
        eel_var1 = clamp(this.EN_joint[current_en][0].y+eel_direction.y,0,Inv_Top-1)>>3;
        eel_target = Terrain.TR_tile_data[eel_var1][eel_target];
        if (0<=eel_target && eel_target<=8){
            setPerpendicular(eel_direction);
            if (this.EN_state[current_en]==2)
                scaleVector2D(eel_direction,-1);
        }
        if (random(100)<2){
            eel_direction.x += randomRange(-0.5,0.5);
            eel_direction.y += randomRange(-0.5,0.5);
        }
        this.EN_joint[current_en][0].Vadd(eel_direction);

        // sew limbs
        for (var i=0; i<6; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],6*eel_size,0,0.5);

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
            for (var i=0; i<6; i++)
                this.EN_joint[current_en][i].x += randomRange(-2,2);
                this.EN_joint[current_en][i].y -= randomRange(2,4);
            enemyDeath(this,current_en,0);
        }
    }
    // die
    else {
        for (var i=0; i<6; i++)
            moveJoint(this.EN_joint[current_en][i],this.EN_joint_destination[current_en][i],0.05,0.99);
        eel_var2 = 6*(150-this.EN_piece_size[current_en])/150;
        for (var i=1; i<5; i++)
            pullJoints(this.EN_joint[current_en][i],this.EN_joint[current_en][i+1],eel_var2*eel_size,0,0.5);
        this.EN_is_grounded[current_en] = 0;
        for (var i=0; i<6; i++)
            this.ENgroundCollision(current_en,i,0.5);
        if (this.EN_piece_size[current_en]++ > 150)
            this.ENkill(current_en--);
    }
    return current_en;
};
