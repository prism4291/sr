var Indicators = new SR_Animated_Indicator; // original name: ne
function SR_Animated_Indicator(){ // original name: rh()
    this.IN_position = Array(Ind_Limit);            // origin position of indicator           original name: .a
    this.IN_direction = Array(Ind_Limit);           // initial x and y direction of indicator original name: .k
    //this.IN_value = new Int32Array(Ind_Limit);    // value of the number                    original name: .value
    this.IN_value = new Array(Ind_Limit);           // value of the number                    original name: .value        (changed from Int32 to allow letter indicators)
    this.IN_color = new Int32Array(Ind_Limit);      // color of indicator                     original name: .G
    this.IN_fade_ticks = new Int32Array(Ind_Limit); // countdown until indicator fades away   original name: .count
    this.IN_index = 0;                              // list of each indicator                 original name: .index
    for (var i=0; i<Ind_Limit; i++){
        this.IN_position[i] = new Vector2D;
        this.IN_direction[i] = new Vector2D;
    }
}
