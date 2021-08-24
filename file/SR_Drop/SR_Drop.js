// item drops
//var Drops = new SR_Drop;
function SR_Drop(){ // original name: sh()
    this.DP_position = Array(Drop_Limit);         // original name: .a
    this.DP_velocity = Array(Drop_Limit);         // original name: .k
    this.DP_item_ID = new Int32Array(Drop_Limit); // original name: .item
    this.DP_val1 = new Int32Array(Drop_Limit);    // original name: .value
    this.DP_val2 = new Int32Array(Drop_Limit);    // original name: .da
    this.DP_count = new Int32Array(Drop_Limit);   // original name: .count
    this.DP_log = 0;                                   // original name: .J
    this.DP_index = 0;                                 // original name: .index
    for (var d=0; d<Drop_Limit; d++){
        this.DP_position[d] = new Vector2D;
        this.DP_velocity[d] = new Vector2D;
    }
}
