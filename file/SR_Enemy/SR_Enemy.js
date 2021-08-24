// enemy variable type (prototype)
//Enemies = new SR_Enemy; // G = new hh
function SR_Enemy(){ // original name: hh()
    var EN_arr_size = (100+50*Max_Crowns)*Enemy_Mult;    // required to prevent game from crashing by trying to load too many enemies
    this.EN_index_current = 0;                           // current count                            original name: .index
    this.EN_joint = Array(EN_arr_size);                  // all the joints in the enemy's body       original name: .a
    this.EN_joint_destination = Array(EN_arr_size);      // position of the joint for the next frame original name: .c
    this.EN_species_ID = new Int32Array(EN_arr_size);    // species ID number                        original name: .step
    this.EN_array_ID = new Int32Array(EN_arr_size);      // position in enemy array                  original name: .id
    this.EN_state = new Int32Array(EN_arr_size);         // activity status                          original name: .d      (0): not spawned (1): player is to the left (2): player is to the right (3): dead
    this.EN_piece_size = new Int32Array(EN_arr_size);    // dead enemy remains                       original name: .count
    this.EN_is_grounded = new Int32Array(EN_arr_size);   // ground collision                         original name: .state
    this.EN_health = new Int32Array(EN_arr_size);        // health of enemy                          original name: .r
    this.EN_reload = new Int32Array(EN_arr_size);        // duration of reload                       original name: .l
    this.EN_is_found = new Int32Array(EN_arr_size);      // found status                             original name: .search
    this.EN_is_provoked = new Int32Array(EN_arr_size);   // when enemy is hit                        original name: .S
    this.EN_ice_ticks = new Int32Array(EN_arr_size);     // duration of slow                         original name: .C
    this.EN_slowness = new Int32Array(EN_arr_size);      // percent of slow                          original name: .X
    this.EN_poison_ticks = new Int32Array(EN_arr_size);  // duration of poison                       original name: .D
    this.EN_poison_dmg = new Int32Array(EN_arr_size);    // damage of poison                         original name: .H
    this.EN_DPSM_poisoner = new Int32Array(EN_arr_size); // ranger how last poisoned enemy            (DPS mod var)
    this.EN_frozen_ticks = new Int32Array(EN_arr_size);  // duration of freeze                       original name: .B
    this.EN_index_total = 0;                             // cumulative count                         original name: .rr
    this.EN_center = 20;                                 // center of body                           original name: .n
    for (var i=0; i<EN_arr_size; i++){
        this.EN_joint[i] = Array(21);
        this.EN_joint_destination[i] = Array(21);
        for (var j=0; j<21; j++){
            this.EN_joint[i][j] = new Vector2D;
            this.EN_joint_destination[i][j] = new Vector2D;
        }
    }
}
