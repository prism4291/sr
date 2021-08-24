SR_Animated_Indicator.prototype.INsubtract = function(curr_ind){ // aa.sub
    this.IN_position[curr_ind].Vset(this.IN_position[this.IN_index-1]);
    this.IN_direction[curr_ind].Vset(this.IN_direction[this.IN_index-1]);

    this.IN_value[curr_ind] = this.IN_value[this.IN_index-1];
    this.IN_color[curr_ind] = this.IN_color[this.IN_index-1];
    this.IN_fade_ticks[curr_ind] = this.IN_fade_ticks[this.IN_index-1];

    this.IN_index--;
};
