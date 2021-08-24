// little numbers
SR_Animated_Indicator.prototype.INadd = function(x_pos,y_pos,direction,value,color){ // aa.add
    if (this.IN_index != Ind_Limit){ // limit the quantitiy of damage numbers to Ind_Limit
        // limit position to stay inside the screen
        x_pos = clamp(x_pos,16,Win_Width-16-1);
        y_pos = clamp(y_pos,8,Inv_Top-8-1);

        assignVector2D(this.IN_position[this.IN_index],x_pos,y_pos);   // set position
        assignVector2D(this.IN_direction[this.IN_index],direction,-2); // set direction

        if (direction!=0){
            this.IN_direction[this.IN_index].x += randomRange(-0.2,0.2); // add horizontal variance
            this.IN_direction[this.IN_index].y += randomRange(-0.2,0.2); // add vertical variance
        }

        this.IN_value[this.IN_index] = value;  // set value
        this.IN_color[this.IN_index] = color;  // set color
        this.IN_fade_ticks[this.IN_index] = 0; // reset fadeout timer

        this.IN_index++;
    }
};
