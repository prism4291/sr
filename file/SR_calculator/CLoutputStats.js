// draw comparison bar and other DPS mod stats
SR_calculator.prototype.CLoutputStats = function(){
    var screen_time = this.CL_time_screen;
    var stage_time = this.CL_time_stage;
    var dmg_session_total = 0;
    var dmg_stg_total = 0;
    var avg_total = Array(this.CL_interval_count);
    var bar_left,bar_top,bar_width,segment_left,segment_width;

    for (var i=0; i<this.CL_interval_count; i++)
        avg_total[i] = 0;

    for (var s=0; s<Stickmen_Slots; s++){
        for (var i=0; i<this.CL_interval_count; i++){
            //Small_Text.TXoutputB(192+24*4+8*3+2,Inv_Top+2+4+2+2+4+s*8,""+this.CL_dmg_session[s],0xFF0000,0x000000);        // damage per session
            //Small_Text.TXoutputB(192+24*4+8*3+2,Inv_Top+2+4+2+2+4+(24+4)*2+s*8,""+this.CL_DPS_stage[s],0xFF0000,0x000000); // damage per stage

            // damage per second during active periods
            if (stage_time%this.CL_intervals[i]==0 && this.CL_dmg[i][s]!=0){
                this.CL_dmg_intv[i][s] = this.CL_dmg[i][s];
                this.CL_dmg_sum[i][s] += this.CL_dmg[i][s]; // add current to sum
                this.CL_intv_count[i][s]++;                 // increase count
                this.CL_DPS_avg[i][s] = this.CL_dmg_sum[i][s]/maxOf(this.CL_intv_count[i][s],1)*60/this.CL_intervals[i];
                this.CL_dmg[i][s] = 0;
            }
            //Small_Text.TXoutputB(480,4+20+4+s*8,""+Math.round(this.CL_DPS_avg[0][s]),0xFF0000,0x000000);
            Small_Text.TXoutputB(192+24*4+8*3+2,Inv_Top+2+4+2+2+4+s*8,""+this.CL_dmg_intv[3][s],0xFF0000,0x000000); // damage per interval
            //Small_Text.TXoutputB(480,4+20+4+(32+4)*3+s*8,""+Math.round(this.CL_DPS_avg[3][s]),0xFF0000,0x000000);
            //Small_Text.TXoutputB(480,4+20+4+(32+4)*4,""+stage_time,0xFF0000,0x000000); // seconds
            avg_total[i] += this.CL_DPS_avg[i][s];
        }
        dmg_session_total += this.CL_dmg_session[s];
        dmg_stg_total += this.CL_dmg_stage[s];
    }
    // damage comparison bar
    bar_left = 192;
    bar_width = 120;
    this.CLsegmentBar(bar_left,Inv_Top-6,bar_width,4,this.CL_dmg_session,dmg_session_total);
    if (isMouseHovered(bar_left,Inv_Top-6,bar_width,4))                                         // hover over bar to display percents
        centeredText(Small_Text,Mouse_Xpos,Mouse_Ypos-12,this.CLdivide(this.CL_dmg_session[0]*100,dmg_session_total)+"% "+this.CLdivide(this.CL_dmg_session[1]*100,dmg_session_total)+"% "+this.CLdivide(this.CL_dmg_session[2]*100,dmg_session_total)+"% "+this.CLdivide(this.CL_dmg_session[3]*100,dmg_session_total)+"% ",0x808080,0x000000);

    // DPS comparison bars
    bar_width = 164;
    bar_left = Win_Width-bar_width-4;
    /*for (var i=0; i<this.CL_interval_count; i++){
        this.CLsegmentBar(bar_left,Inv_Top-6-8*(this.CL_interval_count-1-i),bar_width,4,this.CL_DPS_avg[i],avg_total[0]);                     // DPS comparison bar for interval
        //Small_Text.TXoutputB(bar_left+bar_width+5+1,Inv_Top-7-8*(this.CL_interval_count-1-i)-1,this.CL_intervals[0]+"F",0xFF0000,0x000000); // measurement period display
        if (isMouseHovered(bar_left,Inv_Top-6-8*(this.CL_interval_count-1-i),bar_width,4))                                                    // hover over bar to display values
            centeredText(Small_Text,Mouse_Xpos,Mouse_Ypos-12,Math.round(this.CL_DPS_avg[i][0])+"  "+Math.round(this.CL_DPS_avg[i][1])+"  "+Math.round(this.CL_DPS_avg[i][2])+"  "+Math.round(this.CL_DPS_avg[i][3]),0x808080,0x000000);
    }*/
    this.CLsegmentBar(bar_left,Inv_Top+3,bar_width,9,this.CL_DPS_avg[3],avg_total[3]);      // DPS comparison bar for interval 4
    centeredText(Small_Text,bar_left+(bar_width>>1),Inv_Top+7,Math.round(this.CL_DPS_avg[3][0])+"     "+Math.round(this.CL_DPS_avg[3][1])+"     "+Math.round(this.CL_DPS_avg[3][2])+"     "+Math.round(this.CL_DPS_avg[3][3]),0xFFFFFF,0x000000);

    if (Sequence_Step!=20){
        this.CL_time_screen++;
        this.CL_time_stage++;
    }
}
