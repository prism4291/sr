function timePF(){ // original name: pf()
    Time_Current = Date.now();
    var time_next = clamp(Time_Future-Time_Current,5,20);
    Frame_Counter++;
    //Time_Desert_Haze++;
    Time_Period1 += time_next;
    Time_Future += 20;
    if (Time_Min<=Time_Current+time_next || Time_Current<Time_Prev){
        Time_Per_Second = Time_Per_Second+Time_Period1>>1;
        Time_Period1 = 0;
        Frame_Rate = Frame_Counter;
        Frame_Counter = 0;
        Time_Future = Time_Current+20;
        Time_Min = Time_Current+1000; // minimum time increment is one second
    }
    Time_Prev = Time_Current;
    return time_next;
}
