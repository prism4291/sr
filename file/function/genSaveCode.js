// save code
function genSaveCode(gen_vs_mode){
    var Stage_Status_d,segment_status,gen_var1,generated_save_code;
    var arr_len = 0;
    var save_arr = new Int32Array(512);
    var Save_Code_Translated = new Array(512);

    Save_Code_Translated[arr_len] = "1:";
    save_arr[arr_len++] = 1; // 0
    Save_Code_Translated[arr_len] = ", 0:";
    save_arr[arr_len++] = 0; // 1
    Save_Code_Translated[arr_len] = ", 0:";
    save_arr[arr_len++] = 0; // 2
    Save_Code_Translated[arr_len] = ", random:";
    save_arr[arr_len++] = floor(random(64)); // 3
    Save_Code_Translated[arr_len] = ", random:";
    save_arr[arr_len++] = floor(random(64)); // 4

    for (var s=0; s<Stickmen_Slots<<1; s++){
        Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" game ID:";
        save_arr[arr_len++] = VS_Game_ID_Plain[s]; // 5,6,7,8,9,10,11,12
    }

    if (gen_vs_mode==0){
        Save_Code_Translated[arr_len] = ", Current_Stage:";
        save_arr[arr_len++] = Current_Stage>>6&63; // 13
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = Current_Stage>>0&63; // 14
    }
    Save_Code_Translated[arr_len] = ", Team LV:";
    save_arr[arr_len++] = LV[0]>>6&63; // 15
    Save_Code_Translated[arr_len] = "*64+";
    save_arr[arr_len++] = LV[0]>>0&63; // 16

    //if (gen_vs_mode==1)
        //save_arr[arr_len++] = Rank[0]; // 17

    for (var s=0; s<Stickmen_Slots; s++){
        Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" SP:";
        save_arr[arr_len++] = SP[s]>>6&63; // 17,19,21,23
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = SP[s]>>0&63; // 18,20,22,24
    }
    if (gen_vs_mode==0){
        Save_Code_Translated[arr_len] = ", EXP:";
        save_arr[arr_len++] = Team_EXP>>18&63;  // 25
        Save_Code_Translated[arr_len] = "*262144+";
        save_arr[arr_len++] = Team_EXP>>12&63;  // 26
        Save_Code_Translated[arr_len] = "*4096+";
        save_arr[arr_len++] = Team_EXP>>6&63;   // 27
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = Team_EXP>>0&63;   // 28
        Save_Code_Translated[arr_len] = ", Gold:";
        save_arr[arr_len++] = Team_Gold>>18&63; // 29
        Save_Code_Translated[arr_len] = "*262144+";
        save_arr[arr_len++] = Team_Gold>>12&63; // 30
        Save_Code_Translated[arr_len] = "*4096+";
        save_arr[arr_len++] = Team_Gold>>6&63;  // 31
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = Team_Gold>>0&63;  // 32
    }

    for (var s=0; s<Stickmen_Slots; s++){
        Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" class:";
        save_arr[arr_len++] = Ranger_Class[s]>>0&63; // 33,34,35,36
    }

    if (gen_vs_mode==0){
        for (var s=0; s<Stickmen_Slots; s++){
            Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" LP current:";
            save_arr[arr_len++] = LP_Current[s]>>12&63; // 37,40,43,46 "hundreds" place
            Save_Code_Translated[arr_len] = "*4096+";
            save_arr[arr_len++] = LP_Current[s]>>6&63;  // 38,41,44,47 "tens" place
            Save_Code_Translated[arr_len] = "*64+";
            save_arr[arr_len++] = LP_Current[s]>>0&63;  // 39,42,45,48 "ones" place
        }
    }
    for (var s=0; s<Stickmen_Slots; s++){
        Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" LP SP:";
        save_arr[arr_len++] = LP_SP[s]>>6&63;  // 49,57,65,73
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = LP_SP[s]>>0&63;  // 50,58,66,74
        Save_Code_Translated[arr_len] = " STR SP:";
        save_arr[arr_len++] = STR_SP[s]>>6&63; // 51,59,67,75
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = STR_SP[s]>>0&63; // 52,60,68,76
        Save_Code_Translated[arr_len] = " DEX SP:";
        save_arr[arr_len++] = DEX_SP[s]>>6&63; // 53,61,69,77
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = DEX_SP[s]>>0&63; // 54,62,70,78
        Save_Code_Translated[arr_len] = " MAG SP:";
        save_arr[arr_len++] = MAG_SP[s]>>6&63; // 55,63,71,79
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = MAG_SP[s]>>0&63; // 56,64,72,80
    }
    for (var s=Stickmen_Slots; s<Stickmen_Slots<<1; s++){
        Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" weapon:";
        save_arr[arr_len++] = Item_Inv[s]>>6&63;  // 81,87,93,99
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = Item_Inv[s]>>0&63;  // 82,88,94,100
        Save_Code_Translated[arr_len] = " compo 1:";
        save_arr[arr_len++] = Comp1_Inv[s]>>6&63; // 83,89,95,101
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = Comp1_Inv[s]>>0&63; // 84,90,96,102
        Save_Code_Translated[arr_len] = " compo 2:";
        save_arr[arr_len++] = Comp2_Inv[s]>>6&63; // 85,91,97,103
        Save_Code_Translated[arr_len] = "*64+";
        save_arr[arr_len++] = Comp2_Inv[s]>>0&63; // 86,92,98,104
    }

    if (gen_vs_mode==0){
        for (var i=Inv_First; i<Inv_Size; i++){
            Save_Code_Translated[arr_len] = ", Slot "+(i+1)+" item:";
            save_arr[arr_len++] = Item_Inv[i]>>6&63;  // 105,111,117,123,129,135,141,147,153,159,165,171,177,183,189,195,201,207,213,219,225,231,237,243,249
            Save_Code_Translated[arr_len] = "*64+";
            save_arr[arr_len++] = Item_Inv[i]>>0&63;  // 106,112,118,124,130,136,142,148,154,160,166,172,178,184,190,196,202,208,214,220,226,232,238,244,250
            Save_Code_Translated[arr_len] = " Compo 1:";
            save_arr[arr_len++] = Comp1_Inv[i]>>6&63; // 107,113,119,125,131,137,143,149,155,161,167,173,179,185,191,197,203,209,215,221,227,233,239,245,251
            Save_Code_Translated[arr_len] = "*64+";
            save_arr[arr_len++] = Comp1_Inv[i]>>0&63; // 108,114,120,126,132,138,144,150,156,162,168,174,180,186,192,197,204,210,216,222,228,234,240,246,252
            Save_Code_Translated[arr_len] = " Compo 2:";
            save_arr[arr_len++] = Comp2_Inv[i]>>6&63; // 109,115,121,127,133,139,145,151,157,163,169,175,181,187,193,199,205,211,217,223,229,235,241,247,253
            Save_Code_Translated[arr_len] = "*64+";
            save_arr[arr_len++] = Comp2_Inv[i]>>0&63; // 110,116,122,128,134,140,146,152,158,164,170,176,182,188,194,200,206,212,218,224,230,236,242,248,254
        }

        for (var s=0; s<Stickmen_Slots; s++){
            Save_Code_Translated[arr_len] = ", Ranger "+(s+1)+" auto move:";
            save_arr[arr_len++] = Sett_Auto_Move[s]; // 255,256,257,258
        }
        Save_Code_Translated[arr_len] = ", Move If Dying:";
        save_arr[arr_len++] = Sett_Move_If_Dying;  // 259
        Save_Code_Translated[arr_len] = ", Damage Indicators:";
        save_arr[arr_len++] = Sett_Dmg_Indicators; // 260
        Save_Code_Translated[arr_len] = ", LP Bar Disply:";
        save_arr[arr_len++] = Sett_LP_Bar_Disp;    // 261
        Save_Code_Translated[arr_len] = ", Player Symbol:";
        save_arr[arr_len++] = Sett_PL_Symbol;      // 262
        Save_Code_Translated[arr_len] = ", Drag Dead Body:";
        save_arr[arr_len++] = Sett_Drag_Dead_Body; // 263

        for (var i=0; i<3; i++){
            Save_Code_Translated[arr_len] = ", 0:";
            save_arr[arr_len++] = 0; // 264,265,266
        }

        for (var i=0; i<Stage_Count; i++){
            segment_status = Stage_Status[i];
            for (var seg_len=0; i+seg_len<Stage_Count-1 && Stage_Status[i+seg_len+1]==segment_status && seg_len<31; seg_len++);
            i += seg_len;
            Save_Code_Translated[arr_len] = ", Status:";
            save_arr[arr_len++] = segment_status;
            if (seg_len>0){
                Save_Code_Translated[arr_len] = " for stages "+(i-seg_len)+"-"+i+"|";
                save_arr[arr_len++] = seg_len+16; // number of stages in segment plus 16 for no reason
            }
        }
    }

    gen_var1 = 0;
    for (var i=0; i<arr_len; i++)
        gen_var1 += save_arr[i]*(floor(i/7)+1);

    save_arr[1] = gen_var1>>6&63;
    save_arr[2] = gen_var1&63;

    gen_var1 = 0;
    for (var i=0; i<arr_len; i++)
        gen_var1 += save_arr[i]*((i&15)+1);

    save_arr[arr_len++] = gen_var1>>8&47;
    save_arr[arr_len++] = gen_var1>>4&31;
    save_arr[arr_len++] = gen_var1>>0&15;

    generated_save_code = ""+Char_List[save_arr[0]];
    generated_save_code += Char_List[save_arr[1]];
    generated_save_code += Char_List[save_arr[2]];
    gen_var1 = save_arr[2];

    for (var i=3; i<arr_len; i++){
        //generated_save_code += Save_Code_Translated[i]+save_arr[i];
        generated_save_code += Char_List[save_arr[i]+gen_var1&63];
        gen_var1 += save_arr[i]+i+save_arr[1];
    }

    return generated_save_code;
}
