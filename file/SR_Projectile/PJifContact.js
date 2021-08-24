// tracks projectile hits ? original name: aa.h
SR_Projectile.prototype.PJifContact = function(curr_proj,proj_velocity){
    var proj_is_destroyed = 0;
    proj_velocity.Vset(this.PJ_velocity[curr_proj]);
    var quar_vec_b = (magnitudeOf(proj_velocity)>>2)+1;
    var next_x,next_y,tile_type;

    scaleVector2D(proj_velocity,1/quar_vec_b);

    for (var r=0; r<quar_vec_b; r++){
        next_y = this.PJ_position[curr_proj].y+proj_velocity.y;
        tile_type = Terrain.TR_tile_data[clamp(next_y,0,Inv_Top-1)>>3][clamp(this.PJ_position[curr_proj].x,0,Win_Width-1)>>3];
        if (0<=tile_type && tile_type<=8 && this.PJ_pierce[curr_proj]==0){
            if (this.PJ_bounce[curr_proj]==0)
                proj_is_destroyed = 1;
            else if (this.PJ_bounce[curr_proj]==2){
                proj_velocity.y *= -1;               // reflect y magnitude
                this.PJ_velocity[curr_proj].y *= -1;
            }
        } else { // else continue projectile
            this.PJ_position[curr_proj].y = next_y;
        }

        next_x = this.PJ_position[curr_proj].x+proj_velocity.x;
        tile_type = Terrain.TR_tile_data[clamp(this.PJ_position[curr_proj].y,0,Inv_Top-1)>>3][clamp(next_x,0,Win_Width-1)>>3];
        if (0<=tile_type && tile_type<=8 && this.PJ_pierce[curr_proj]==0){
            if (this.PJ_bounce[curr_proj]==0 || this.PJ_bounce[curr_proj]==1)
                proj_is_destroyed = 1;
            if (this.PJ_bounce[curr_proj]==2){
                proj_velocity.x *= -1;               // reflect x magnitude
                this.PJ_velocity[curr_proj].x *= -1;
            }
        } else { // else continue projectile
            this.PJ_position[curr_proj].x = next_x;
        }
    }
    return proj_is_destroyed;
};
