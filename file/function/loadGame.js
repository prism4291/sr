function loadGame(save_string_var,team_slot){ // original name: re()
    var team_leader = Stickmen_Slots*team_slot;
    var loadvar_d,load_var_e;
    var load_arr = new Int32Array(512);
    var load_vs_mode2 = 0;

    if (save_string_var.length==0)
        return 1; // no save string

    if (save_string_var.length < 90)
        load_vs_mode2 = 1;

    for (var i=0; i<save_string_var.length; i++){
        for (var j=0; j<Char_List.length; j++){
            if (Char_List[j]==save_string_var.charAt(i)){
                load_arr[i] = j;
                break;
            }
        }
    }

    if (load_arr[0] <= 0)
        return 2;

    load_var_e = load_arr[2];
    for (var i=3; i<save_string_var.length; i++){
        load_arr[i] = load_arr[i]-load_var_e&63;
        load_var_e += load_arr[i]+i+load_arr[1];
    }

    load_var_e = 0;
    for (var i=0; i<save_string_var.length-3; i++)
        load_var_e += load_arr[i]*((i&15)+1);

    if (load_arr[save_string_var.length-3] != (load_var_e>>8&47) || load_arr[save_string_var.length-2] != (load_var_e>>4&31) || load_arr[save_string_var.length-1] != (load_var_e>>0&15))
        return 3;


    if (team_slot==0){
        for (var s=0; s<Stickmen_Slots<<1; s++){
            if (load_arr[s+5] != VS_Game_ID_Plain[s])
                return 4;
        }
    }

    loadvar_d = 0;
    loadvar_d++;
    loadvar_d++;
    loadvar_d++;
    loadvar_d++;
    loadvar_d++;
    loadvar_d += 8;

    if (load_vs_mode2==0)
        Current_Stage = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];

    LV[team_slot] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];

    if (load_vs_mode2==1)
        Rank[team_slot] = load_arr[loadvar_d++];

    for (var i=team_leader; i < team_leader+Stickmen_Slots; i++)
        SP[i]=(load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];

    if (load_vs_mode2==0){
        Team_EXP = (load_arr[loadvar_d++]<<18)+(load_arr[loadvar_d++]<<12)+(load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        Team_Gold = (load_arr[loadvar_d++]<<18)+(load_arr[loadvar_d++]<<12)+(load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
    }

    for (load_var_e=team_leader; load_var_e<team_leader+Stickmen_Slots; load_var_e++)
        Ranger_Class[load_var_e] = load_arr[loadvar_d++];

    if (load_vs_mode2==0){
        for (var i=team_leader; i<team_leader+Stickmen_Slots; i++)
            LP_Current[i] = (load_arr[loadvar_d++]<<12)+(load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
    }

    for (var i=team_leader; i<team_leader+Stickmen_Slots; i++){
        LP_SP[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        STR_SP[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        DEX_SP[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        MAG_SP[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
    }
    for (var i=Stickmen_Slots+team_leader; i<(Stickmen_Slots<<1)+team_leader; i++){
        Item_Inv[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        Comp1_Inv[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        Comp2_Inv[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
    }

    if (load_vs_mode2==1)
        return 0;

    for (var i=Inv_First; i<Inv_Size; i++){
        Item_Inv[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        Comp1_Inv[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
        Comp2_Inv[i] = (load_arr[loadvar_d++]<<6)+load_arr[loadvar_d++];
    }

    for (var i=0; i<Stickmen_Slots; i++)
        Sett_Auto_Move[i] = load_arr[loadvar_d++];

    Sett_Move_If_Dying = load_arr[loadvar_d++];
    Sett_Dmg_Indicators = load_arr[loadvar_d++];
    Sett_LP_Bar_Disp = load_arr[loadvar_d++];
    Sett_PL_Symbol = load_arr[loadvar_d++];
    Sett_Drag_Dead_Body = load_arr[loadvar_d++];

    for (var i=0; i<3; i++)
        loadvar_d++;

    for (var i=0; i<Stage_Count; i++)
        Stage_Status[i] = 0;

    for (var i=0; loadvar_d < save_string_var.length-3; loadvar_d++){
        if (load_arr[loadvar_d]<16){
            Stage_Status[i++] = load_arr[loadvar_d];
        } else {
            for (var j=0; j<load_arr[loadvar_d]-16; j++)
                Stage_Status[i++] = load_arr[loadvar_d-1];
        }
    }

    for (var i=0; i<Stage_Count; i++){
        if ((Stage_Status[i]&Beaten) != 0){
            Stage_Status[i] |= Unlocked;
            if (Dot_Locations[i][3]>0)
                Stage_Status[Dot_Locations[i][3]] |= Unlocked;
            if (Dot_Locations[i][4]>0)
                Stage_Status[Dot_Locations[i][4]] |= Unlocked;
        }
    }
    return 0;
}
