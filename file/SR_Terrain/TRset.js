SR_Terrain.prototype.TRset = function(stage_number){ // th.prototype.j
    var tile_height_adjust,terr_start_column,cur_pxl,left_pxl,right_pxl,above_pxl,below_pxl,auxb;
    this.TR_stage_num = stage_number;
    if (this.TR_img != Stage_Spawns[this.TR_stage_num][Current_Screen][1]){ // if tileset for terrain is not correct
        this.TR_img = Stage_Spawns[this.TR_stage_num][Current_Screen][1];   // update terrain tileset
        Stage_Terrain_Img = new SR_Image;
        Stage_Terrain_Img.IGset("st"+this.TR_img+".gif");
    }
    imgToArray(Stage_Terrain_Img);
    if (Tile_Counter1!=0)
        return false;

    //this.TR_height = Stage_Terrain_Img.IG_height;
    this.TR_height = Inv_Top>>3;
    tile_height_adjust = this.TR_height-Stage_Terrain_Img.IG_height;

    for (var y=0; y<this.TR_height; y++){ // reset pixel data
        for (var x=0; x<this.TR_width; x++)
            this.TR_tile_data[y][x] = -1;
    }
    for (var y=0; y<this.TR_height; y++){ // reset tile indicator color
        for (var x=0; x<this.TR_width; x++)
            this.TR_tile_indicator_color[y][x] = 0x999999;
    }
    terr_start_column = floor(random(Stage_Terrain_Img.IG_width-this.TR_width));
    for (var y=0; y<this.TR_height; y++){ // top to bottom
        for (var x=0; x<this.TR_width; x++){ // left to right
            //cur_pxl = y*Stage_Terrain_Img.IG_width+clamp(x,3,Terrain.TR_width-4)+terr_start_column;                                             // start of row + number from 3-60 + start pos
            cur_pxl = (y-tile_height_adjust)*Stage_Terrain_Img.IG_width+clamp(x,3,Terrain.TR_width-4)+terr_start_column;                                             // start of row + number from 3-60 + start pos

            left_pxl = Stage_Terrain_Img.IG_pxl_color_index[x<=3 || this.TR_width-3<=x? cur_pxl :cur_pxl-1];                    // if x is between 3 and width-3? current pixel else left pixel
            right_pxl = Stage_Terrain_Img.IG_pxl_color_index[x<=2 || this.TR_width-4<=x? cur_pxl :cur_pxl+1];                   // if x is between 2 and width-4? current pixel else right pixel
            above_pxl = Stage_Terrain_Img.IG_pxl_color_index[y==0? cur_pxl :cur_pxl-Stage_Terrain_Img.IG_width];                // if at the top row? current pixel else above pixel

            below_pxl = Stage_Terrain_Img.IG_pxl_color_index[y==this.TR_height-1? cur_pxl :cur_pxl+Stage_Terrain_Img.IG_width]; // if at the bottom row? current pixel else below pixel
            //below_pxl = Stage_Terrain_Img.IG_pxl_color_index[y==(this.TR_height-tile_height_adjust)-1? cur_pxl :cur_pxl+Stage_Terrain_Img.IG_width]; // if at the bottom row? current pixel else below pixel

            // set pixel data
            if (Stage_Terrain_Img.IG_pxl_color_index[cur_pxl]==0){
                if (left_pxl!=0 && right_pxl==0 && above_pxl!=0 && below_pxl==0)
                    this.TR_tile_data[y][x] = 0;
                else if (left_pxl==0 && right_pxl==0 && above_pxl!=0 && below_pxl==0)
                    this.TR_tile_data[y][x] = 1;
                else if (left_pxl==0 && right_pxl!=0 && above_pxl!=0 && below_pxl==0)
                    this.TR_tile_data[y][x] = 2;
                else if (left_pxl!=0 && right_pxl==0 && above_pxl==0 && below_pxl==0)
                    this.TR_tile_data[y][x] = 3;
                else if (left_pxl==0 && right_pxl==0 && above_pxl==0 && below_pxl==0)
                    this.TR_tile_data[y][x] = 4;
                else if (left_pxl==0 && right_pxl!=0 && above_pxl==0 && below_pxl==0)
                    this.TR_tile_data[y][x] = 5;
                else if (left_pxl!=0 && right_pxl==0 && above_pxl==0 && below_pxl!=0)
                    this.TR_tile_data[y][x] = 6;
                else if (left_pxl==0 && right_pxl==0 && above_pxl==0 && below_pxl!=0)
                    this.TR_tile_data[y][x] = 7;
                else if (left_pxl==0 && right_pxl!=0 && above_pxl==0 && below_pxl!=0)
                    this.TR_tile_data[y][x] = 8;

            } else if (Stage_Terrain_Img.IG_pxl_color_index[cur_pxl]==0x0000FF){ // if pixel is blue
                this.TR_tile_data[y][x] = 9;
            }
        }
    } // set player spawns to the first 4 open tiles
    for (var x=0; x<this.TR_width; x++){         // left to right
        for (var y=this.TR_height-1; y>=0; y--){ // bottom to top
            if (this.TR_tile_data[y][x]==-1 || this.TR_tile_data[y][x]==9){ // if tile is air or water
                this.TR_low_surface[x] = y;
                if (Item_Inv[Inv_First]!=0) this.TR_tile_indicator_color[y][x] = 0x0000FF;
                break;
            }
        }
    } // sets air or water tiles that are directly on the ground surface
    for (var x=0; x<this.TR_width; x++){      // left to right
        for (var y=1; y<this.TR_height; y++){ // top to bottom
                // if (above tile is air or water) && current tile is solid
            if ((this.TR_tile_data[y-1][x]==-1 || this.TR_tile_data[y-1][x]==9) && 0<=this.TR_tile_data[y][x] && this.TR_tile_data[y][x]<=8){
                this.TR_high_surface[x] = y-1;
                if (Item_Inv[Inv_First+1]!=0) this.TR_tile_indicator_color[y-1][x] = 0xFFFF00;
                break;
            }
        }
    } // sets air or water tiles that are directly on the ceiling surface
    for (var x=0; x<this.TR_width; x++){      // left to right
        for (var y=0; y<this.TR_height; y++){ // top to bottom
            if (this.TR_tile_data[y][x]==-1 || this.TR_tile_data[y][x]==9){ // if current tile is air or water
                this.TR_air_ceil[x] = y;
                if (Item_Inv[Inv_First+2]!=0) this.TR_tile_indicator_color[y][x] = 0xFF0000;
                break;
            }
        }
    } // sets air tiles that are directly above solid or water surface
    for (var x=0; x<this.TR_width; x++){      // left to right
        this.TR_air_floor[x] = this.TR_air_ceil[x];
        for (var y=1; y<this.TR_height; y++){ // top to bottom
                // if (above tile is air or water) current tile is solid or water
            if ((this.TR_tile_data[y-1][x]==-1 || this.TR_tile_data[y-1][x]==9) && 0<=this.TR_tile_data[y][x] && this.TR_tile_data[y][x]<=9){
                this.TR_air_floor[x] = y-1;
                if (Item_Inv[Inv_First+3]!=0) this.TR_tile_indicator_color[y-1][x] = 0x0000FF;
                break;
            }
        }
    } // sets water tiles that do not include the water's surface
    this.TR_water_count = 0;
    for (var x=12; x<this.TR_width-4; x++){     // left to right
        for (var y=1; y<this.TR_height-1; y++){ // top to bottom
            if (this.TR_tile_data[y-1][x]==9 && this.TR_tile_data[y][x]==9){
                this.TR_water_nonsurface[this.TR_water_count++] = y*this.TR_width+x;
                if (Item_Inv[Inv_First+4]!=0) this.TR_tile_indicator_color[y][x] = 0xFF00FF;
            }
        }
    }

    if (Current_Screen==0){
        for (var i=0; i<Win_Width*Win_Height; i++)
            Stage_Eff_Canvas.IG_pxl_color_index[i] = 0;

        auxb = Game_Canvas;
        switch (this.TR_stage_num){ // stage mist effect?
            case 15:
            case 16:
            case 30:
            case 31:
            case 32:
            case 33:
            case 66:
            case 67:
            case 68:
            case 69:
                Display_Mode = 1;
                Display_Mode2 = 3;
                Game_Canvas = Stage_Eff_Canvas.IG_pxl_color_index;
                for (var i=0; i<Win_Width*Win_Height; i++)
                    Game_Canvas[i] = 0;
                for (var i=0; i<100; i++){
                    c = randomRange(1.7,3.69);
                    c *= c*c*c;
                    dispItemCentered(Projectiles_Img,floor(randomRange(0,Win_Width)),floor(Win_Hcenter-c),Win_Hcenter,32,96,0,16,16,0x18FFFFFF);
                }
                Game_Canvas = auxb;
                Display_Mode = Display_Mode2 = 0;
        }
    }
    return true;
};
