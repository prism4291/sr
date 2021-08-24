window.fff = playSequence;
function playSequence(){ // original name: sf()
    if (Check_Host1 > 0){
        Check_Host1++;
    } else {
        Inv_Top = Win_Height-Inv_Height; // used to adjust tile drawing to fit above the inventory
        setSaveCode("");
        saveGame("");
        for (var i=Win_Width*Win_Height-1; i>=0; i--)
            Game_Canvas[i] = 0;

        if (Sequence_Step <= 9)
            menuAndMap();
        else if (Sequence_Step <= 49)
            PvEscreens();
        else if (Sequence_Step <= 59)
            townScreens();
        else if (Sequence_Step <= 60)
            PvPscreens();

        if (Saving_Text_Timer > 0){
            Saving_Text_Timer--;
            centeredText(Large_Text,Win_Width-32,Inv_Top-8-1,"Saving...",0xFF0000,0x660000);
        }
        if (Save_Error_Text_Timer > 0){
            Save_Error_Text_Timer--;
            if (Save_Error==2)
                Large_Text.TXoutputB(10,10,"Version Error",0xFF0000,0x660000);
            else if (Save_Error==3)
                Large_Text.TXoutputB(10,10,"Data Error",0xFF0000,0x660000);
            else if (Save_Error==4)
                Large_Text.TXoutputB(10,10,"User Error",0xFF0000,0x660000);

        }
        if (Debug_Mode==1){
            Large_Text.TXoutputB(0,0,Frame_Rate+"fps",0xFFFFFF,0x000000);
            if (Debug_Mode==1)
                Large_Text.TXoutputB(48,0,Time_Per_Second+"sl",0xFFFFFF,0x000000);
            Large_Text.TXoutputB(0,14,""+Curr_Sequence[Sequence_Step],0xFFFFFF,0x000000);
            Large_Text.TXoutputB(Win_Width-88,0,"X:"+Mouse_Xpos,0xFFFFFF,0x000000);
            Large_Text.TXoutputB(Win_Width-40,0,"Y:"+Mouse_Ypos,0xFFFFFF,0x000000);
        }
        antiCheatCheck();
    }
}
