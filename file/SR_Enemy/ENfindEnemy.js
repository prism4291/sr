SR_Enemy.prototype.ENfindEnemy = function(left_bound,bottom_bound,right_bound,top_bound){ // aa.m
    var en_size,species,hitbox,enemy_pos;
    var Range = (left_bound+right_bound)>>1;
    var distance = 1000;
    var closest_target_ID = -1;

    for (var i=0; i<this.EN_index_current; i++){
        en_size = EN_Info[this.EN_array_ID[i]][EN_Size];
        species = EN_Info[this.EN_array_ID[i]][EN_Species];
        hitbox = (Hitboxvar1[species]>>1)*((en_size>>1)+1);

        en_size *= Hitboxvar2[species]>>1;
        this.EN_is_found[i] = 0;
        enemy_pos = this.EN_joint[i][this.EN_center];

        if (this.EN_health[i]!=0 && right_bound>=enemy_pos.x-hitbox && left_bound<=enemy_pos.x+hitbox && top_bound>=enemy_pos.y-en_size && bottom_bound<=enemy_pos.y+en_size){
            this.EN_is_found[i] = 1;
            if (absVal(enemy_pos.x-Range) < distance){
                distance = absVal(enemy_pos.x-Range);
                closest_target_ID = i;
            }
        }
    }
    return closest_target_ID;
};
