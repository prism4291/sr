//var Terrain = new SR_Terrain; // I = new th
function SR_Terrain(){ // original name: th()
    this.TR_width = Win_Width>>3;                                            // original name: .i
    this.TR_height = Win_Height>>3;                                          // original name: .s
    this.TR_tile_data = Array(this.TR_height);                               // original name: .e
    this.TR_tile_indicator_color = Array(this.TR_height);                    //  (new variable)
    this.TR_low_surface = new Int32Array(this.TR_width);                     // original name: .o
    this.TR_high_surface = new Int32Array(this.TR_width);                    // original name: .I
    this.TR_air_ceil = new Int32Array(this.TR_width);                        // original name: .$
    this.TR_air_floor = new Int32Array(this.TR_width);                       // original name: .hb
    this.TR_water_nonsurface = new Int32Array(this.TR_width*this.TR_height); // original name: .gb
    this.TR_stage_num = 0;                                                   // original name: .w
    this.TR_water_count = 0;                                                 // original name: .ab
    this.TR_img = -1;                                                        // original name: .cb
    for (var y=0; y<this.TR_height; y++){
        this.TR_tile_data[y] = new Int32Array(this.TR_width);
        this.TR_tile_indicator_color[y] = Array(this.TR_width);
    }

}
