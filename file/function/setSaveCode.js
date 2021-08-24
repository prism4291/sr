window.GameLoad = setSaveCode;
function setSaveCode(save_string_var){ // original name: me()
    if (save_string_var.length != 0){
        Save_Code_le = save_string_var;
        return 0;
    }
    if (save_string_var.length==0){
        if (Save_Code_le.length==0)
            return -1;

        Displayed_Object = 0;
        Sign_Touched_Mode = 0;
        Current_Screen = 0;
        Current_Stage = 0;
        Text_Fade = 0;
        Sequence_Step = 0;
        Selected_Player = 3;
        Mouse_Up = false;
        for (var s=0; s<Stickmen_Slots; s++)
            MP_Bar[s] = 0;
        Click_To_Sell_Mode = 0;
        Players.PLreset();
        Indicators.INreset();
        Projectiles.PJreset();
        Drops.DPreset();
        WorldMap.MAPset();
        Save_Error = loadGame(Save_Code_le,0);

        if (Save_Error>0)
            Save_Error_Text_Timer = 50;
        else
            Save_Code3 = genSaveCode(0);

        Save_Code_le = "";
        antiCheatSet();
    }
    return -1;
}
