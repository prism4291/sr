SR_Animated_Indicator.prototype.INmain = function(){ // aa.move
    for (var i=0; i<this.IN_index; i++){
        if (this.IN_direction[i].x==0){
            this.IN_direction[i].y += 0;
            scaleVector2D(this.IN_direction[i],0.96);
        } else {
            this.IN_direction[i].y += 0.05;
            scaleVector2D(this.IN_direction[i],0.99);
        }

        this.IN_position[i].Vadd(this.IN_direction[i]);
        this.IN_position[i].x = clamp(this.IN_position[i].x,16,Win_Width-16-1);
        this.IN_position[i].y = clamp(this.IN_position[i].y,8,Inv_Top-8-1);

        this.IN_fade_ticks[i]++;
        if (this.IN_fade_ticks[i] >= 100)
            this.INsubtract(i--);
    }
};
