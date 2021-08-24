window.fff = SR_Player.prototype.PLmovement;
SR_Player.prototype.PLmovement = function(current_char,current_joint){ // Pg.prototype.kb
    var joint = this.PL_joint[current_char][current_joint];
    var pl_direction = new Vector2D;
    pl_direction.Vdistance(this.PL_joint[current_char][current_joint],this.PL_joint_destination[current_char][current_joint]);
    joint.Vset(this.PL_joint_destination[current_char][current_joint]);
    var mag1 = (magnitudeOf(pl_direction)>>2)+1;
    scaleVector2D(pl_direction,1/mag1);
    var x_move,x_move,y_move;
    var x_tile = clamp(joint.x,0,Win_Width-1)>>3;
    var y_tile = clamp(joint.y,0,Win_Height-1)>>3;
    var tile_type = Terrain.TR_tile_data[y_tile][x_tile];
    if (tile_type==9){ // if stickman is in water
        scaleVector2D(pl_direction,0.95);
        this.PL_is_grounded[current_char] |= 2;
    }
    var friction = 0.5;
    var tile_type_under;
    if (Stage_Spawns[Terrain.TR_stage_num][Current_Screen][0]==8) // if terrain is frozen lake (icey)
        friction = 1;
    for (var i=0; i<mag1; i++){
        y_move = joint.y+pl_direction.y;
        x_tile = clamp(joint.x,0,Win_Width-1)>>3;
        y_tile = clamp(y_move,0,Win_Height-1)>>3;
        tile_type = Terrain.TR_tile_data[y_tile][x_tile];
        tile_type_under = Terrain.TR_tile_data[y_tile+1][x_tile];
        if (y_move<Win_Height){
            if (0<=tile_type && tile_type<=8){ // if stickman is on land
                pl_direction.x *= friction;
                pl_direction.y =- pl_direction.y;
                this.PL_is_grounded[current_char] |= 1;
            } else {
                joint.y = y_move;
            }
            /** edit: delete "#" to have stickmen sill attack if their feet are up to 8 pixels (1 tile) off the ground **#/
            if (0<=tile_type_under && tile_type_under<=8)
                this.PL_is_grounded[current_char] |= 4;
            /************************************************************************************************************/
        }
        x_move = joint.x+pl_direction.x;
        x_tile = clamp(x_move,0,Win_Width-1)>>3;
        y_tile = clamp(joint.y,0,Win_Height-1)>>3;
        tile_type = Terrain.TR_tile_data[y_tile][x_tile];
        tile_type_under = Terrain.TR_tile_data[y_tile+1][x_tile];
        if (0<=x_move && x_move<Win_Width){
            if (0<=tile_type && tile_type<=8){ // if stickman is on land
                pl_direction.y *= friction;
                pl_direction.x =- pl_direction.x;
                this.PL_is_grounded[current_char] |= 1;
            } else {
                joint.x = x_move;
            }
            /** edit: delete "#" to have stickmen sill attack if their feet are up to 8 pixels (1 tile) off the ground **#/
            if (0<=tile_type_under && tile_type_under<=8)
                this.PL_is_grounded[current_char] |= 4;
            /************************************************************************************************************/
        }
    }
};
