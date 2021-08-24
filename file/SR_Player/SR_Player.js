//var Players = new SR_Player; // v = new Pg;
function SR_Player(){ // original name: Pg()
    this.PL_joint = Array((Stickmen_Slots<<1));                      // all the joints in the stickman's body             original name: .a
    this.PL_joint_destination = Array((Stickmen_Slots<<1));          // destination of the joint for the next frame       original name: .c
    this.PL_class_ID = new Int32Array((Stickmen_Slots<<1));          // class ID of stickman (1-8)                        original name: .step
    this.PL_airtime = new Int32Array((Stickmen_Slots<<1));           // number of frames since last being grounded        original name: .count
    this.PL_is_grounded = new Int32Array((Stickmen_Slots<<1));       // digit string for if stickmen is grounded/swimming original name: .h     next to ground 100/000 + in water 10/00 + on the ground 1/0
    this.PL_focus = new Int32Array((Stickmen_Slots<<1));             // focus point (body part where attack originates)   original name: .g
    this.PL_reload_ticks = new Int32Array((Stickmen_Slots<<1));      // number of frames until player can attack again    original name: .l
    this.PL_damaged_ticks = new Int32Array((Stickmen_Slots<<1));     // number of frames that character looks damaged     original name: .qa
    this.PL_gladr_resid_count = new Int32Array((Stickmen_Slots<<1)); // number of bullets to be emitted by the sword      original name: .bb
    this.PL_move_wait_ticks = new Int32Array((Stickmen_Slots<<1));   // number of frames until player can move again      original name: .Za
    this.PL_held_player = -1;                                        // array ID of stickman that is held (-1 if no one)  original name: .v
    this.PL_held_joint = 0;                                          // the joint that is being dragged                   original name: .T
    this.PL_is_chosen = new Int32Array((Stickmen_Slots<<1));         // value for each stickman if it's chosen            original name: .search
    this.PL_dmg_dealt = Array((Stickmen_Slots<<1));                  // sum of damage delt by a hit                       original name: .L
    this.PL_team_is_dead = 0;                                        // (PvP) if opponent team is dead                    original name: .fb
    this.PL_ice_ticks = new Int32Array((Stickmen_Slots<<1));         // number of frames that player will be slowed       original name: .C
    this.PL_slowness = new Int32Array((Stickmen_Slots<<1));          // degree (percent) of slowness                      original name: .X
    this.PL_poison_ticks = new Int32Array((Stickmen_Slots<<1));      // number of frames that player will be poisoned     original name: .D
    this.PL_poison_dmg = new Int32Array((Stickmen_Slots<<1));        // poison damage delt per tick                       original name: .H
    this.PL_frozen_ticks = new Int32Array((Stickmen_Slots<<1));      // number of frames that player will be frozen       original name: .B
    this.PL_ring_thrown_status = Array((Stickmen_Slots<<1));         // 0: held  1: going out  2: returning               original name: .O
    this.PL_ring_distance_to_travel = Array((Stickmen_Slots<<1));    // distance between ring and its next destination    original name: .aa
    this.PL_ring_ticks_until_active = Array((Stickmen_Slots<<1));    // number of frames until ring hitbox will be active original name: .ba
    for (var s=0; s<Stickmen_Slots<<1; s++){
        this.PL_joint[s] = Array(21);
        this.PL_joint_destination[s] = Array(21);
        this.PL_ring_thrown_status[s] = new Int32Array(6);
        this.PL_ring_distance_to_travel[s] = new Int32Array(6);
        this.PL_ring_ticks_until_active[s] = new Int32Array(6);
        for (var j=0; j<21; j++){
            this.PL_joint[s][j] = new Vector2D;
            this.PL_joint_destination[s][j] = new Vector2D;
        }
    }
}
