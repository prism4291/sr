SR_Animated_Indicator.prototype.INoutput = function(){ // aa.b
    var fill_R,fill_G,fill_B,opacity;

    for (var i=0; i<this.IN_index; i++){ // split color value into RGB
        fill_R = this.IN_color[i]>>16&0xFF;
        fill_G = this.IN_color[i]>>8&0xFF;
        fill_B = this.IN_color[i]&0xFF;

        if (100-this.IN_fade_ticks[i] < 50) // fade out text
             opacity = 100-this.IN_fade_ticks[i];
        else opacity = 50;
        opacity = floor(0xFF*opacity/50); // convert opacity to Alpha value

        largeMessage(Small_Text,floor(this.IN_position[i].x),floor(this.IN_position[i].y),""+this.IN_value[i],fill_R,fill_G,fill_B,opacity,0,0,0,opacity,5,7);
    }
};
