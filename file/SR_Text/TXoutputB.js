SR_Text.prototype.TXoutputB = function(x_pos,y_pos,message,fill_color,outline_color){ // original name: Zh.prototype.b
    var fill_pixel,outline_pixel,lett,screen_pos,index_pos,px_color,n;
    var screen_newline = Win_Width-this.TX_width;
    var index_newline = this.TX_image.IG_width-this.TX_width;

    if (fill_color > -1)
         fill_pixel = 0xFFFFFF;
    else fill_pixel = 1;
    if (outline_color > -1)
         outline_pixel = 0;
    else outline_pixel = 1;

    for (var i=0; i<message.length; i++, x_pos += this.TX_width+this.TX_spacing){
        lett = message.charCodeAt(i)-32;
        if (lett!=0){
            if (lett>=96)
                lett = 31;

            if (this.TX_start_pos!=0)
                x_pos -= PvP_Text_Spaces[this.TX_start_pos-1][lett];

            index_pos = lett*this.TX_width;
            screen_pos = y_pos*Win_Width+x_pos;

            for (var h=0; h<this.TX_height; h++,screen_pos+=screen_newline,index_pos+=index_newline){
                for (var w=0; w<this.TX_width; w++,screen_pos++,index_pos++){
                    px_color = this.TX_image.IG_pxl_color_index[index_pos];
                    if (px_color==fill_pixel)
                        Game_Canvas[screen_pos] = fill_color;
                    else if (px_color==outline_pixel)
                        Game_Canvas[screen_pos] = outline_color;
                }
            }
            if (this.TX_start_pos!=0)
                x_pos -= PVE_Text_Spaces[this.TX_start_pos-1][lett];
        }
    }
    this.TX_start_pos = 0;
};
