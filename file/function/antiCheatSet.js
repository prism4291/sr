function antiCheatSet(){ // original name: te()
    var Check_Var_Primary = floor(random(1024));

    Check_Var_LV = 0;
    Check_Var_SP = 0;
    Check_Var_LP_SP = 0;
    Check_Var_STR_SP = 0;
    Check_Var_DEX_SP = 0;
    Check_Var_MAG_SP = 0;
    Check_Var_Ranger_Class = 0;
    Check_Var_LP_Current = 0;
    Check_Var_MP_Bar = 0;
    Check_Var_LP_Max = 0;
    Check_Var_STR = 0;
    Check_Var_DEX = 0;
    Check_Var_MAG = 0;
    Check_Var_AT_Min = 0;
    Check_Var_AT_Max = 0;
    Check_Var_Agi_Min = 0;
    Check_Var_Agi_Max = 0;
    Check_Var_Range = 0;
    Check_Var_Item_Inv = 0;
    Check_Var_Comp1_Inv = 0;
    Check_Var_Comp2_Inv = 0;
    Check_Var_STR_Aura = 0;
    Check_Var_DEX_Aura = 0;
    Check_Var_Stage_Status = 0;

    Check_Var_Seed = Check_Var_Primary;
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(Team_EXP|1);
                                            Check_Var_Team_EXP = (Team_EXP|1);
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(Team_Gold|1);
                                            Check_Var_Team_Gold = (Team_Gold|1);
    for (var t=0; t<2; t++)                 Check_Var_Primary += (Check_Var_Primary&15|1)*(LV[t]|1);
    for (var t=0; t<2; t++)                 Check_Var_LV += (LV[t]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_SP += (SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(LP_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_LP_SP += (LP_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(STR_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_STR_SP += (STR_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(DEX_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_DEX_SP += (DEX_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(MAG_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_MAG_SP += (MAG_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(Ranger_Class[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Ranger_Class += (Ranger_Class[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(LP_Current[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_LP_Current += (LP_Current[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(MP_Bar[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_MP_Bar += (MP_Bar[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(LP_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_LP_Max += (LP_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(STR[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_STR += (STR[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(DEX[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_DEX += (DEX[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(MAG[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_MAG += (MAG[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(AT_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_AT_Min += (AT_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(AT_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_AT_Max += (AT_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(Agi_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Agi_Min += (Agi_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(Agi_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Agi_Max += (Agi_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(Range[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Range += (Range[s]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Primary += (Check_Var_Primary&15|1)*(Item_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Item_Inv += (Item_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Primary += (Check_Var_Primary&15|1)*(Comp1_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Comp1_Inv += (Comp1_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Primary += (Check_Var_Primary&15|1)*(Comp2_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Comp2_Inv += (Comp2_Inv[i]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(STR_Aura[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_STR_Aura += (STR_Aura[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Primary += (Check_Var_Primary&15|1)*(DEX_Aura[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_DEX_Aura += (DEX_Aura[s]|1);
    for (var s=0; s<Stage_Count; s++)       Check_Var_Primary += (Check_Var_Primary&15|1)*(Stage_Status[s]|1);
    for (var s=0; s<Stage_Count; s++)       Check_Var_Stage_Status += (Stage_Status[s]|1);
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(Game_Mode|1);
                                            Check_Var_Game_Mode = (Game_Mode|1);
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(FP[0]|1);
                                            Check_Var_FP0 = (FP[0]|1);
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(FP[1]|1);
                                            Check_Var_FP1 = (FP[1]|1);
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(Rank[0]|1);
                                            Check_Var_Rank0 = (Rank[0]|1);
                                            Check_Var_Primary += (Check_Var_Primary&15|1)*(Rank[1]|1);
                                            Check_Var_Rank1 = (Rank[1]|1);
    Check_Var_Total = Check_Var_Primary^16777215;
}
