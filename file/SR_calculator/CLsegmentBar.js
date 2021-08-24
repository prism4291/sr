// seperate into equal segments
SR_calculator.prototype.CLsegmentBar = function(bar_left,bar_top,bar_width,bar_height,numerator,denominator){
    var segment_width = 0;
    var segment_left = bar_left;
    var longest_segment = 0;
    var segment = Array(Stickmen_Slots);
    for (var s=0; s<Stickmen_Slots; s++)
        segment[s] = Array(2);

    filledRect(bar_left,bar_top-1,bar_width,bar_height+2,0x000000); // bar background

    for (var s=0; s<Stickmen_Slots; s++){
        segment_left += segment_width+1; // adjust segment over by the previous segment's width and 1 space for seperation
        segment[s][0] = segment_left;
        if (denominator==0)
            segment_width = bar_width-5>>2; // seperate into 4 equal parts if the total sum is 0
        else
            segment_width = maxOf(floor(numerator[s]/denominator*(bar_width-5)),1);
        segment[s][1] = floor(segment_width);

        if (segment[s][1] > segment[longest_segment][1])
            longest_segment = s;
    }

    while (segment[0][1]+segment[1][1]+segment[2][1]+segment[3][1] < bar_width-5){ // if the segment total sum exceeds the width
        segment[longest_segment][1]++;                                         // adjust longest segment
        for (var s=longest_segment+1; s<Stickmen_Slots; s++)
            segment[s][0]++;                                                   // shift the rest of the segments
    }
    while (segment[0][1]+segment[1][1]+segment[2][1]+segment[3][1] > bar_width-5){ // if the segment total sum is lower than the width
        segment[longest_segment][1]--;                                         // adjust longest segment
        for (var s=longest_segment+1; s<Stickmen_Slots; s++)
            segment[s][0]--;                                                   // shift the rest of the segments
    }

    for (var s=0; s<Stickmen_Slots; s++)
        filledRect(segment[s][0],bar_top,segment[s][1],bar_height,getVal(Item_Inv[Stickmen_Slots+s],Item_Color)); // dmg comparison segments
}
