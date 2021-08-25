function mainSequence(){ // original name: rf()
    var game_ticks_passed,area,b;
    var ticks_per_second = 60;
    if (Animation_Frame){
        Animation_Frame(mainSequence);
        Animation_Frame_Counter++;
        Time_Current = Date.now();
        game_ticks_passed = floor(ticks_per_second*(Time_Current-Time_Prev)/1000+0.5);

        if (game_ticks_passed<0 || ticks_per_second<=game_ticks_passed){
            Animation_Frame_Counter = 0;
            Frame_Rate = Frame_Counter;
            Frame_Counter = 0;
            Time_Per_Second = floor((2*Time_Per_Second+Time_Period1)/3);
            Time_Period1 = 0;
            Time_Prev = Time_Current;
            game_ticks_passed = 0;
        } else if (game_ticks_passed==Prev_Game_Ticks_Passed){
            return;
        }
        Frame_Counter++;
        Prev_Game_Ticks_Passed = game_ticks_passed;
    }

    Clicked = Left_Click_Is_Down && !Left_Click_Was_Down;
    Released = !Left_Click_Is_Down && Left_Click_Was_Down;
    Right_Click_Released = !Right_Click_Is_Down && Right_Click_Was_Down;
    Left_Click_Was_Down = Left_Click_Is_Down;
    Right_Click_Was_Down = Right_Click_Is_Down;
    Left_Click_Is_Up = !(Released|Left_Click_Was_Down|Right_Click_Released|Right_Click_Was_Down);

    if (Released)
        Sett_Change = 1;
    else if (Right_Click_Released)
        Sett_Change = -1;
    else
        Sett_Change = 0;

    Mouse_Xpos = Mouse_Xpos2;
    Mouse_Ypos = Mouse_Ypos2;
    for (var k=0; k<256; k++){
        Is_Key_Pressed1[k] = Arr256_2[k];
        Arr256_2[k] = false;
    }
    Rand_EF = Rand_EF+floor(1024*Math.random())&1023;
    Rand_FF = floor(512*Math.random())|1;
    playSequence();

    if (Check_Host2==11)
         area = Win_Width*Win_Height;
    else area = 0;

    b = 0;
    for (var i=0; i<area; i++){
        Bit_8_Color[b++] = Game_Canvas[i]>>16&0xFF;
        Bit_8_Color[b++] = Game_Canvas[i]>>8&0xFF;
        Bit_8_Color[b++] = Game_Canvas[i]&0xFF;
        b++;
    }
    putImageData(My_Img_Data,0,0);

    if (Animation_Frame)
        Time_Period1 += Date.now()-Time_Current;
    else
        setTimeout(mainSequence,timePF());
}
