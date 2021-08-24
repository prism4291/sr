// map size
var WorldMap = new SR_map; // qe = new uh
function SR_map(){ // original name: uh()
    this.MAP_width = 78;                             // total width (in tiles) of world map              original name: .i
    this.MAP_height = 16;                            // total height (in tiles) of world map             original name: .s
    this.MAP_tile_horizontal_spacer = 0;             // spacing adjust for scrolling                     original name: .t
    this.MAP_land_array = Array(this.MAP_height);    // array of land tiles (sand, ice, cliff)           original name: .e
    this.MAP_feature_array = Array(this.MAP_height); // array of feature tiles (trees, bulidings, caves) original name: .W
    for (var y=0; y<this.MAP_height; y++){
        this.MAP_land_array[y] = new Int32Array(this.MAP_width);
        this.MAP_feature_array[y] = new Int32Array(this.MAP_width);
    }
}
