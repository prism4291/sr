// map tiling
SR_map.prototype.MAPset = function(){ // uh.prototype.j
    var left_margin,right_margin,bottom_margin,top_margin,tile_pos,below_left,below,below_right,left_side,right_side,above_left,above,above_right,tile_color;
    for (var y=0; y<this.MAP_height; y++){
        for (var x=0; x<this.MAP_width; x++)
            this.MAP_land_array[y][x] = -1; // reset map
    }
    for (var y=0; y<this.MAP_height; y++){
        for (var x=0; x<this.MAP_width; x++){
            tile_pos = y*Map_Elev_Index.IG_width+x;
            if (x==0)
                 left_margin = 0;
            else left_margin = -1;
            if (x==this.MAP_width-1)
                 right_margin = 0;
            else right_margin = 1;
            if (y==0)
                 bottom_margin = 0;
            else bottom_margin = -this.MAP_width;
            if (y==this.MAP_height-1)
                 top_margin = 0;
            else top_margin = this.MAP_width;
            below_left = Map_Elev_Index.IG_pxl_color_index[tile_pos+left_margin+bottom_margin];
            below = Map_Elev_Index.IG_pxl_color_index[tile_pos+bottom_margin];
            below_right = Map_Elev_Index.IG_pxl_color_index[tile_pos+right_margin+bottom_margin];
            left_side = Map_Elev_Index.IG_pxl_color_index[tile_pos+left_margin];
            right_side = Map_Elev_Index.IG_pxl_color_index[tile_pos+right_margin];
            above_left = Map_Elev_Index.IG_pxl_color_index[tile_pos+left_margin+top_margin];
            above = Map_Elev_Index.IG_pxl_color_index[tile_pos+top_margin];
            above_right = Map_Elev_Index.IG_pxl_color_index[tile_pos+right_margin+top_margin];
            // set map tiles
            if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x00FFFF){         // frozen lake color
                this.MAP_land_array[y][x] = 15;                                    // 15th tile in mt.gif
            } else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x660000){  // blood lake color
                this.MAP_land_array[y][x] = 17;                                    // 17th tile in mt.gif
            } else if (Map_Elev_Index.IG_pxl_color_index[tile_pos]!=0){
                if (Map_Elev_Index.IG_pxl_color_index[tile_pos]==0x003399){           // lake color
                    this.MAP_land_array[y][x] = 13;                                   // 13th tile in mt.gif
                } else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0xFFCC66){ // desert color
                    this.MAP_land_array[y][x] = 14;                                   // 14th tile in mt.gif
                } else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x666666){ // hell tile color
                    this.MAP_land_array[y][x] = 16;                                   // 16th tile in mt.gif
                } else {
                    tile_color = Map_Elev_Index.IG_pxl_color_index[tile_pos]; // the tile's color represents its height
                    if (tile_color<=below && tile_color<=left_side && tile_color<=right_side && tile_color<=above && tile_color>above_right)
                        this.MAP_land_array[y][x] = 3;
                    else if (tile_color<=below && tile_color<=left_side && tile_color<=right_side && tile_color<=above && tile_color>above_left)
                        this.MAP_land_array[y][x] = 4;
                    else if (tile_color<=below && tile_color<=left_side && tile_color<=right_side && tile_color<=above && tile_color>below_right)
                        this.MAP_land_array[y][x] = 8;
                    else if (tile_color<=below && tile_color<=left_side && tile_color<=right_side && tile_color<=above && tile_color>below_left)
                        this.MAP_land_array[y][x] = 9;
                    else if (tile_color>left_side && tile_color<=right_side && tile_color>below && tile_color<=above)
                        this.MAP_land_array[y][x] = 0;
                    else if (tile_color<=left_side && tile_color<=right_side && tile_color>below && tile_color<=above)
                        this.MAP_land_array[y][x] = 1;
                    else if (tile_color<=left_side && tile_color>right_side && tile_color>below && tile_color<=above)
                        this.MAP_land_array[y][x] = 2;
                    else if (tile_color>left_side && tile_color<=right_side && tile_color<=below && tile_color<=above)
                        this.MAP_land_array[y][x] = 5;
                    else if (tile_color<=left_side && tile_color>right_side && tile_color<=below && tile_color<=above)
                        this.MAP_land_array[y][x] = 7;
                    else if (tile_color>left_side && tile_color<=right_side && tile_color<=below && tile_color>above)
                        this.MAP_land_array[y][x] = 10;
                    else if (tile_color<=left_side && tile_color<=right_side && tile_color<=below && tile_color>above)
                        this.MAP_land_array[y][x] = 11;
                    else if (tile_color<=left_side && tile_color>right_side && tile_color<=below && tile_color>above)
                        this.MAP_land_array[y][x] = 12;
                }
            }
        }
    }
    for (var y=0; y<this.MAP_height; y++){ // set map features
        for (var x=0; x<this.MAP_width; x++){
            tile_pos = y*Map_Feature_Index.IG_width+x;
            this.MAP_feature_array[y][x] = -1;
            if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x006600)      // tree pixel
                this.MAP_feature_array[y][x] = 0;
            else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x999999) // castle pixel
                this.MAP_feature_array[y][x] = 1;
            else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x804000) // cave mouth pixel
                this.MAP_feature_array[y][x] = 2;
            else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0xCCFFFF) // snowy tree pixel
                this.MAP_feature_array[y][x] = 5;
            else if (Map_Feature_Index.IG_pxl_color_index[tile_pos]==0x003000) // dark tree pixel
                this.MAP_feature_array[y][x] = 6;
        }
    }
};
