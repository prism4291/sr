// if grounded function
SR_Enemy.prototype.ENgroundCollision = function(monster,limb,speed){ // original name: aa.h
    var head_y,head_x_tile,head_y_tile,head_pos_tile,head_x;
    var en_direction = new Vector2D;

    en_direction.Vdistance(this.EN_joint[monster][limb],this.EN_joint_destination[monster][limb]);
    this.EN_joint[monster][limb].Vset(this.EN_joint_destination[monster][limb]);

    var vec_d_mag = (magnitudeOf(en_direction)>>2)+1;
    scaleVector2D(en_direction,1/vec_d_mag);

    for (var i=0; i<vec_d_mag; i++){
        head_y = this.EN_joint[monster][limb].y+en_direction.y;
        head_x_tile = clamp(this.EN_joint[monster][limb].x,0,Win_Width-1)>>3;
        head_y_tile = clamp(head_y,0,Inv_Top-1)>>3;
        head_pos_tile = Terrain.TR_tile_data[head_y_tile][head_x_tile];

        if (0<=head_y && head_y<Inv_Top){
            if (0<=head_pos_tile && head_pos_tile<=8){
                if (en_direction.y>0)
                    this.EN_is_grounded[monster] |= 2;
                en_direction.x *= speed;
                en_direction.y =- en_direction.y;
            } else {
                this.EN_joint[monster][limb].y = head_y;
            }
        }

        head_x = this.EN_joint[monster][limb].x+en_direction.x;
        head_x_tile = clamp(head_x,0,Win_Width-1)>>3;
        head_y_tile = clamp(this.EN_joint[monster][limb].y,0,Inv_Top-1)>>3;
        head_pos_tile = Terrain.TR_tile_data[head_y_tile][head_x_tile];

        if ((0<=head_x && head_x<Win_Width)){
            if (0<=head_pos_tile && head_pos_tile<=8){
                en_direction.y *= speed;
                en_direction.x =- en_direction.x;
                this.EN_is_grounded[monster] |= 1;
            } else {
                this.EN_joint[monster][limb].x = head_x;
            }
        }
    }
};
