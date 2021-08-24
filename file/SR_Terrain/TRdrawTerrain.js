SR_Terrain.prototype.TRdrawTerrain = function(){ // th.prototype.b
    var tile_type,fill_R,fill_G,fill_B;
    var gif_xpos = new Int32Array([0,8,16,0,8,16,0 ,8 ,16]);
    var gif_ypos = new Int32Array([0,0,0 ,8,8,8 ,16,16,16]);
    var texture = Terrain_Textures[Stage_Spawns[this.TR_stage_num][Current_Screen][0]];

    for (var y=0; y<this.TR_height; y++){
        for (var x=0; x<this.TR_width; x++){
            tile_type = this.TR_tile_data[y][x];
            if (tile_type!=-1){                                // if tile is not air
                if (tile_type==9){                             // if tile is water
                    if (this.TR_stage_num==82){                // if stage is blood lake
                        if (this.TR_tile_data[y-1][x]==-1)     // if this tile is the water surface (of blood lake)
                            drawItem(Water_Red_Img,8*x,8*y,8,8,0,0,8,8);
                        else
                            backgroundFill(8*x-4,8*y,16,8,0x550000);
                    } else if (this.TR_tile_data[y-1][x]==-1){ // if this tile is the water surface
                        drawItem(Water_Img,8*x,8*y,8,8,0,0,8,8);
                    } else {
                        backgroundFill(8*x-4,8*y,16,8,0x00559C);
                    }
                } else {
                    drawItem(texture,8*x,8*y,8,8,gif_xpos[tile_type],gif_ypos[tile_type],8,8);
                }
            }
            fill_R = this.TR_tile_indicator_color[y][x]>>16&0xFF;
            fill_G = this.TR_tile_indicator_color[y][x]>>8&0xFF;
            fill_B = this.TR_tile_indicator_color[y][x]&0xFF;
            if (Debug_Mode==1)
                largeMessage(Small_Text,x*8+3,y*8+4,""+tile_type,fill_R,fill_G,fill_B,0xCC,0,0,0,0,5,7);
        }
    }
};
