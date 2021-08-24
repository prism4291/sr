//var DPSM_Calculator = new SR_calculator;
function SR_calculator(){ // new function
    this.CL_dmg_session = Array((Stickmen_Slots<<1)); // damage done during current session
    this.CL_DPS_session = Array((Stickmen_Slots<<1)); // DPS done during current session
    this.CL_dmg_stage = Array((Stickmen_Slots<<1));   // damage done during current stage
    this.CL_DPS_stage = Array((Stickmen_Slots<<1));   // DPS done during current stage
    this.CL_interval_count = 5;                       // number of intervals
    this.CL_intervals = [6,15,30,60,120];             // list of intervals
    this.CL_dmg = Array((Stickmen_Slots<<1));         // damage dealt, resets after each interval
    this.CL_dmg_intv = Array((Stickmen_Slots<<1));    // damage dealt during the previous interval
    this.CL_DPS_avg = Array((Stickmen_Slots<<1));     // average damage per active interval
    this.CL_dmg_sum = Array((Stickmen_Slots<<1));     // sum of damage during all active intervals
    this.CL_intv_count = Array((Stickmen_Slots<<1));  // count of active intervals
    this.CL_time_screen = 0;                          // time when screen started
    this.CL_time_stage = 0;                           // time when stage started
    for (var s=0; s<Stickmen_Slots<<1; s++){
        this.CL_dmg[s] = Array(this.CL_interval_count);
        this.CL_dmg_intv[s] = Array(this.CL_interval_count);
        this.CL_DPS_avg[s] = Array(this.CL_interval_count);
        this.CL_dmg_sum[s] = Array(this.CL_interval_count);
        this.CL_intv_count[s] = Array(this.CL_interval_count);
    }
}
