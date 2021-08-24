SR_Player.prototype.PLadd = function(current_char,x_pos,y_pos){ // Pg.prototype.set
    x_pos <<= 3;
    y_pos <<= 3;
    for (var j=0; j<21; j++){
        assignVector2D(this.PL_joint[current_char][j],x_pos+random(4),y_pos+random(4));
        this.PL_joint_destination[current_char][j].Vset(this.PL_joint[current_char][j]);
    }
    this.PL_class_ID[current_char] = Ranger_Class[current_char];
    this.PL_airtime[current_char] = 0;
    this.PL_is_grounded[current_char] = 0;
    this.PL_focus[current_char] = -1;
    this.PL_reload_ticks[current_char] = 0;
    this.PL_damaged_ticks[current_char] = 0;
    this.PL_gladr_resid_count[current_char] = 0;
    this.PL_move_wait_ticks[current_char] = 0;
    this.PL_is_chosen[current_char] = 0;
    this.PL_ice_ticks[current_char] = 0;
    this.PL_slowness[current_char] = 0;
    this.PL_poison_ticks[current_char] = 0;
    this.PL_poison_dmg[current_char] = 0;
    this.PL_frozen_ticks[current_char] = 0;
    for (var r=0; r<6; r++){
        this.PL_ring_thrown_status[current_char][r] = 0;
        this.PL_ring_distance_to_travel[current_char][r] = 0;
        this.PL_ring_ticks_until_active[current_char][r] = 0;
    }
};
