SR_Text.prototype.TXoutputM = function(x_pos,y_pos,message,fill_R,fill_G,fill_B,fill_opacity,outline_R,outline_G,outline_B,outline_opacity,width,height){ // original name: Zh.prototype.M
    var pixel_pos,character1,width1,px_color,lett_height,lett_width,default_fill,default_outline;
    var newline = Win_Width-width;

    fill_R = fill_R*fill_opacity>>8;
    fill_G = fill_G*fill_opacity>>8;
    fill_B = fill_B*fill_opacity>>8;
    fill_opacity = 0xFF-fill_opacity;

    outline_R = outline_R*outline_opacity>>8;
    outline_G = outline_G*outline_opacity>>8;
    outline_B = outline_B*outline_opacity>>8;
    outline_opacity = 0xFF-outline_opacity;

    if (fill_opacity!=0xFF)
         default_fill = 0xFFFFFF;
    else default_fill = 1;
    if (outline_opacity!=0xFF)
         default_outline = 0;
    else default_outline = 1;

    for (var c=0; c<message.length; c++,x_pos+=width+this.TX_spacing){
        character1 = message.charCodeAt(c)-32;
        if (character1!=0){
            if (character1 >= 96)
                character1 = 31;
            if (this.TX_start_pos!=0)
                x_pos -= floor(PvP_Text_Spaces[this.TX_start_pos-1][character1]*width/this.TX_width);

            width1 = character1*this.TX_width;
            pixel_pos = y_pos*Win_Width+x_pos;

            for (var y=0; y<height; y++,pixel_pos+=newline){
                lett_height = floor(y*this.TX_height/height)*this.TX_image.IG_width+width1<<8;
                lett_width = floor((this.TX_width<<8)/width);
                for (var x=0; x<width; x++,pixel_pos++,lett_height+=lett_width){
                    px_color = this.TX_image.IG_pxl_color_index[lett_height>>8];
                    if (px_color==default_fill){
                        px_color = Game_Canvas[pixel_pos];
                        Game_Canvas[pixel_pos] = fill_R+((px_color>>16&0xFF)*fill_opacity>>8)<<16|fill_G+((px_color>>8&0xFF)*fill_opacity>>8)<<8|fill_B+((px_color&0xFF)*fill_opacity>>8);
                    } else if (px_color==default_outline){
                        px_color = Game_Canvas[pixel_pos];
                        Game_Canvas[pixel_pos] = outline_R+((px_color>>16&0xFF)*outline_opacity>>8)<<16|outline_G+((px_color>>8&0xFF)*outline_opacity>>8)<<8|outline_B+((px_color&0xFF)*outline_opacity>>8);
                    }
                }
            }
            if (this.TX_start_pos!=0)
                x_pos -= floor(PVE_Text_Spaces[this.TX_start_pos-1][character1]*width/this.TX_width);
        }
    }
    this.TX_start_pos = 0;
};
