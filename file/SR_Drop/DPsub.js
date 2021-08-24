SR_Drop.prototype.DPsub = function(a){ // aa.sub
    this.DP_position[a].Vset(this.DP_position[this.DP_index-1]);
    this.DP_velocity[a].Vset(this.DP_velocity[this.DP_index-1]);
    this.DP_item_ID[a] = this.DP_item_ID[this.DP_index-1];
    this.DP_val1[a] = this.DP_val1[this.DP_index-1];
    this.DP_val2[a] = this.DP_val2[this.DP_index-1];
    this.DP_count[a] = this.DP_count[this.DP_index-1];
    this.DP_index--;
    this.DP_log = 0;
    for (var d=0; d<this.DP_index; d++)
        this.DP_log += 7*this.DP_item_ID[d] + 3*this.DP_val1[d] + 11*this.DP_val2[d];
};
