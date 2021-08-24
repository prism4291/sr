// Locate a player and return its numerical ID
SR_Player.prototype.PLfindPlayer = function(left_bound,bottom_bound,right_bound,top_bound,enemy_leader){ // Pg.prototype.m
    var range = (left_bound+right_bound)>>1;
    var max_range = 1000;
    var target_ID = -1;
    var player_pos
    if (this.PL_team_is_dead==1)
        return target_ID;
    for (var s=enemy_leader; s<enemy_leader+Stickmen_Slots; s++){
        this.PL_is_chosen[s] = 0;          // set target player as not chosen
        player_pos = this.PL_joint[s][2]; // get position of attacker
        if (this.PL_class_ID[s]!=Class_Dead && player_pos.x-5<=right_bound && player_pos.x+5>=left_bound && player_pos.y-10<=top_bound && player_pos.y+10>=bottom_bound){
            this.PL_is_chosen[s] = 1;      // if attacker is alive and within range, set target player as chosen
            if (max_range > absVal(player_pos.x-range)){
                max_range = absVal(player_pos.x-range);
                target_ID = s;
            }
        }
    }
    return target_ID;
};
