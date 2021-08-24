SR_calculator.prototype.CLreset = function(scope){
    for (var s=0; s<Stickmen_Slots<<1; s++){
        switch (scope){
            case 0:
                this.CL_dmg_session[s] = 0;
                this.CL_DPS_session[s] = 0;
            case 1:
                this.CL_time_stage = 0;
                this.CL_dmg_stage[s] = 0;
                this.CL_DPS_stage[s] = 0;
                for (var i=0; i<this.CL_interval_count; i++){
                    this.CL_dmg[i][s] = 0;
                    this.CL_dmg_intv[i][s] = 0;
                    this.CL_DPS_avg[i][s] = 0;
                    this.CL_dmg_sum[i][s] = 0;
                    this.CL_intv_count[i][s] = 0;
                }
            case 2:
                this.CL_time_screen = 0;
                break;
        }
    }
}
