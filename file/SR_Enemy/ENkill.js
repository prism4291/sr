SR_Enemy.prototype.ENkill = function(a){ // aa.sub
    for (var i=0; i<21; i++){
        this.EN_joint[a][i].Vset(this.EN_joint[this.EN_index_current-1][i]);
        this.EN_joint_destination[a][i].Vset(this.EN_joint_destination[this.EN_index_current-1][i]);
    }
    this.EN_array_ID[a] = this.EN_array_ID[this.EN_index_current-1];
    this.EN_species_ID[a] = this.EN_species_ID[this.EN_index_current-1];
    this.EN_state[a] = this.EN_state[this.EN_index_current-1];
    this.EN_piece_size[a] = this.EN_piece_size[this.EN_index_current-1];
    this.EN_is_grounded[a] = this.EN_is_grounded[this.EN_index_current-1];
    this.EN_health[a] = this.EN_health[this.EN_index_current-1];
    this.EN_reload[a] = this.EN_reload[this.EN_index_current-1];
    this.EN_is_found[a] = this.EN_is_found[this.EN_index_current-1];
    this.EN_is_provoked[a] = this.EN_is_provoked[this.EN_index_current-1];
    this.EN_ice_ticks[a] = this.EN_ice_ticks[this.EN_index_current-1];
    this.EN_slowness[a] = this.EN_slowness[this.EN_index_current-1];
    this.EN_poison_ticks[a] = this.EN_poison_ticks[this.EN_index_current-1];
    this.EN_poison_dmg[a] = this.EN_poison_dmg[this.EN_index_current-1];
    this.EN_DPSM_poisoner[a] = this.EN_DPSM_poisoner[this.EN_index_current-1];
    this.EN_frozen_ticks[a] = this.EN_frozen_ticks[this.EN_index_current-1];
    this.EN_index_current--;
};
