SR_Enemy.prototype.ENadd = function(x_pos,y_pos,ID){ // aa.add
    var EN_limit = floor(100*Enemy_Spawn_Scale*Enemy_Mult/100);
    if (this.EN_index_current!=EN_limit && this.EN_index_total!=EN_limit){
        x_pos *= 8;
        y_pos *= 8;

        for (var i=0; i<21; i++){
            assignVector2D(this.EN_joint[this.EN_index_current][i],x_pos+random(1),y_pos+random(1)); // makes enemies move slightly when spawned in
            this.EN_joint_destination[this.EN_index_current][i].Vset(this.EN_joint[this.EN_index_current][i]);
        }
        this.EN_array_ID[this.EN_index_current] = ID;
        this.EN_species_ID[this.EN_index_current] = EN_Info[ID][EN_Species];
        this.EN_state[this.EN_index_current] = 0;
        this.EN_piece_size[this.EN_index_current] = 0;
        this.EN_is_grounded[this.EN_index_current] = 0;
        this.EN_health[this.EN_index_current] = EN_Info[ID][EN_LP];
        this.EN_reload[this.EN_index_current] = 0;
        this.EN_is_found[this.EN_index_current] = 0;
        this.EN_is_provoked[this.EN_index_current] = 0;
        this.EN_ice_ticks[this.EN_index_current] = 0;
        this.EN_slowness[this.EN_index_current] = 0;
        this.EN_poison_ticks[this.EN_index_current] = 0;
        this.EN_poison_dmg[this.EN_index_current] = 0;
        this.EN_frozen_ticks[this.EN_index_current] = 0;
        this.EN_index_current++;
        this.EN_index_total++;
    }
};
