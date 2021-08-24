// spawn a drop
SR_Drop.prototype.DPadd = function(x_pos,y_pos,item_ID,attribute1,attribute2){ // aa.add
    if (this.DP_index!=Drop_Limit){ // don't do < Drop_Limit
        x_pos = clamp(x_pos,16,Win_Width-16-1);
        y_pos = clamp(y_pos,8,Inv_Top-8-1);
        assignVector2D(this.DP_position[this.DP_index],x_pos,y_pos);

        if (Mouse_Xpos<x_pos) // send items dropped in the direction of the mouse
             this.DP_velocity[this.DP_index].x = randomRange(-0.5,-1);
        else this.DP_velocity[this.DP_index].x = randomRange(0.5,1);

        this.DP_velocity[this.DP_index].y = randomRange(-1,-2);
        this.DP_item_ID[this.DP_index] = item_ID;
        this.DP_val1[this.DP_index] = attribute1;
        this.DP_val2[this.DP_index] = attribute2;
        this.DP_count[this.DP_index] = 0;
        this.DP_index++;
        this.DP_log = 0;
        for (var d=0; d<this.DP_index; d++)
            this.DP_log += 7*this.DP_item_ID[d]+3*this.DP_val1[d]+11*this.DP_val2[d];
    }
};
