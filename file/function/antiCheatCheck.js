// hard locks the game if certain conditions are not true
function antiCheatCheck(){ // original name: Ne()
    var class_ID,item_type,item_bullet,eff_ID;
    var en_highest_lv,enemy_types,xp_for_prev_LV,xp_for_next_LV,SP_sum;
    var item_attribute_data,enemy_spawn_data,monster_data,shop_item_data;

    if (LV<0 || 99<LV[0]){
        console.log("Error: PvE LV is above limit");
        Game_Canvas = null;
    }
    if (LV[1]<0 || 99<LV[1]){
        console.log("Error: PvP LV is above limit");
        Game_Canvas = null;
    }
    if (Team_EXP<0 || 9999999<Team_EXP){
        console.log("Error: EXP is above limit");
        Game_Canvas = null;
    }
    if (Team_Gold<0 || 9999999<Team_Gold){
        console.log("Error: Gold is above limit");
        Game_Canvas = null;
    }
    for (var s=0; s<Stickmen_Slots<<1; s++){
        if (SP[s]<0 || 196<SP[s]){
            console.log("Error: SP is above limit");
            Game_Canvas = null;
        }
        if (LP_SP[s]<0 || 196<LP_SP[s]){
            console.log("Error: SP in LP is above limit");
            Game_Canvas = null;
        }
        if (STR_SP[s]<0 || 196<STR_SP[s]){
            console.log("Error: SP in STR is above limit");
            Game_Canvas = null;
        }
        if (DEX_SP[s]<0 || 196<DEX_SP[s]){
            console.log("Error: SP in DEX is above limit");
            Game_Canvas = null;
        }
        if (MAG_SP[s]<0 || 196<MAG_SP[s]){
            console.log("Error: SP in MAG is above limit");
            Game_Canvas = null;
        }
    }
    for (var s=0; s<Stickmen_Slots<<1; s++){
        if (Item_Inv[Stickmen_Slots+s]!=0 && Ranger_Class[s]!=getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID)){
            console.log("Error: ranger "+(s+1)+" has weapon on wrong class");
            Game_Canvas = null;
        }
    }
    for (var i=0; i<Stickmen_Slots<<1; i++){
        class_ID = getVal(Item_Inv[Stickmen_Slots+i],Item_Class_ID);
        item_type = getVal(Item_Inv[Stickmen_Slots+i],Item_Type);
        item_bullet = getVal(Item_Inv[Stickmen_Slots+i],Item_Bullet);
        if (Comp1_Inv[Stickmen_Slots+i]!=0){                                           // if weapon has a 1st compo item equipped
            if (getVal(Comp1_Inv[Stickmen_Slots+i],Item_Class_ID) != Class_Compo){
                console.log("Error: ranger "+(i+1)+" has compo in slot 1 that is not a compo type item");
                Game_Canvas = null;
            }
            if (getVal(Comp1_Inv[Stickmen_Slots+i],Eff_ID) == getVal(Comp2_Inv[Stickmen_Slots+i],Eff_ID)){
                console.log("Error: ranger "+(i+1)+" has duplicate compo equipped");
                Game_Canvas = null;
            }
            eff_ID = getVal(Comp1_Inv[Stickmen_Slots+i],Eff_ID);
            if (compRestrCheck(eff_ID,class_ID,item_type,item_bullet)==false){
                console.log("Error: ranger "+(i+1)+" has illegal bullet's card equipped in slot 1");
                Game_Canvas = null;
            }
        }
        if (Comp2_Inv[Stickmen_Slots+i]!=0 && Comp2_Inv[Stickmen_Slots+i]!=Null_Slot){ // if weapon has a 2nd compo item equipped
            if (getVal(Comp2_Inv[Stickmen_Slots+i],Item_Class_ID) != Class_Compo){
                console.log("Error: ranger "+(i+1)+" has compo in slot 2 that is not a compo type item");
                Game_Canvas = null;
            }
            eff_ID = getVal(Comp2_Inv[Stickmen_Slots+i],Eff_ID);
            if (compRestrCheck(eff_ID,class_ID,item_type,item_bullet)==false){
                console.log("Error: ranger "+(i+1)+" has illegal bullet's card equipped in slot 2");
                Game_Canvas = null;
            }
        }
    }
    if (Game_Mode==0 || Game_Mode==2){
        en_highest_lv = 0;
        for (var s=0; s<Stage_Count; s++){
            if ((Stage_Status[s]&Unlocked) != 0){
                enemy_types = Book_Indexer[s+1]-Book_Indexer[s];
                for (var e=0; e<enemy_types; e++){
                    if (EN_Info[Book_Indexer[s]+e][EN_Lvl]>en_highest_lv)
                        en_highest_lv = EN_Info[Book_Indexer[s]+e][EN_Lvl];
                    e += EN_Info[Book_Indexer[s]+e][En_2nd_Att];
                }
            }
        }
        if (LV[0]>en_highest_lv+10+2){
            console.log("Error: team level too high for current progress");
            Game_Canvas = null;
        }
    }
    if (Game_Mode==0 || Game_Mode==2){
        xp_for_prev_LV = 4753000;
        xp_for_next_LV = 9999999;
        if (LV[0] < 98){
            xp_for_prev_LV = 0;
            for (var l=1; l<LV[0]; l++)
                xp_for_prev_LV += 1000*l;
            xp_for_next_LV = xp_for_prev_LV+1000*l;
        }
        if (Team_EXP<xp_for_prev_LV || xp_for_next_LV<Team_EXP){
            console.log("Error: experience is below/above current level");
            if (Randomizer_Mode==0)
                Game_Canvas = null;
        }
    }
    SP_sum = 0;
    for (var i=0; i<Stickmen_Slots<<1; i++)
        SP_sum += SP[i]+LP_SP[i]+STR_SP[i]+DEX_SP[i]+MAG_SP[i];

    if ((Stickmen_Slots<<1)*(LV[0]-1)+(Stickmen_Slots<<1)*(LV[1]-1) != SP_sum){
        console.log("Error: amount of SP does not match for current level");
        Game_Canvas = null;
    }

    var Check_Var2_LV = 0;
    var Check_Var2_SP = 0;
    var Check_Var2_LP_SP = 0;
    var Check_Var2_STR_SP = 0;
    var Check_Var2_DEX_SP = 0;
    var Check_Var2_MAG_SP = 0;
    var Check_Var2_Ranger_Class = 0;
    var Check_Var2_LP_Current = 0;
    var Check_Var2_MP_Bar = 0;
    var Check_Var2_LP_Max = 0;
    var Check_Var2_STR = 0;
    var Check_Var2_DEX = 0;
    var Check_Var2_MAG = 0;
    var Check_Var2_AT_Min = 0;
    var Check_Var2_AT_Max = 0;
    var Check_Var2_Agi_Min = 0;
    var Check_Var2_Agi_Max = 0;
    var Check_Var2_Range = 0;
    var Check_Var2_Item_Inv = 0;
    var Check_Var2_Comp1_Inv = 0;
    var Check_Var2_Comp2_Inv = 0;
    var Check_Var2_STR_Aura = 0;
    var Check_Var2_DEX_Aura = 0;
    var Check_Var2_Stage_Status = 0;

    var Check_Var_Secondary = Check_Var_Seed;
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Team_EXP|1);
                                            Check_Var2_Team_EXP = (Team_EXP|1);
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Team_Gold|1);
                                            Check_Var2_Team_Gold = (Team_Gold|1);
    for (var t=0; t<2; t++)                 Check_Var_Secondary += (Check_Var_Secondary&15|1)*(LV[t]|1);
    for (var t=0; t<2; t++)                 Check_Var2_LV += (LV[t]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_SP += (SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(LP_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_LP_SP += (LP_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(STR_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_STR_SP += (STR_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(DEX_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_DEX_SP += (DEX_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(MAG_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_MAG_SP += (MAG_SP[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Ranger_Class[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_Ranger_Class += (Ranger_Class[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(LP_Current[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_LP_Current += (LP_Current[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(MP_Bar[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_MP_Bar += (MP_Bar[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(LP_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_LP_Max += (LP_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(STR[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_STR += (STR[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(DEX[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_DEX += (DEX[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(MAG[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_MAG += (MAG[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(AT_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_AT_Min += (AT_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(AT_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_AT_Max += (AT_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Agi_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_Agi_Min += (Agi_Min[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Agi_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_Agi_Max += (Agi_Max[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Range[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_Range += (Range[s]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Item_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var2_Item_Inv += (Item_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Comp1_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var2_Comp1_Inv += (Comp1_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Comp2_Inv[i]|1);
    for (var i=0; i<Inv_Size; i++)          Check_Var2_Comp2_Inv += (Comp2_Inv[i]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(STR_Aura[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_STR_Aura += (STR_Aura[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var_Secondary += (Check_Var_Secondary&15|1)*(DEX_Aura[s]|1);
    for (var s=0; s<Stickmen_Slots<<1; s++) Check_Var2_DEX_Aura += (DEX_Aura[s]|1);
    for (var s=0; s<Stage_Count; s++)       Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Stage_Status[s]|1);
    for (var s=0; s<Stage_Count; s++)       Check_Var2_Stage_Status += (Stage_Status[s]|1);
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Game_Mode|1);
                                            Check_Var2_Game_Mode = (Game_Mode|1);
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(FP[0]|1);
                                            Check_Var2_FP0 = (FP[0]|1);
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(FP[1]|1);
                                            Check_Var2_FP1 = (FP[1]|1);
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Rank[0]|1);
                                            Check_Var2_Rank0 = (Rank[0]|1);
                                            Check_Var_Secondary += (Check_Var_Secondary&15|1)*(Rank[1]|1);
                                            Check_Var2_Rank1 = (Rank[1]|1);

    if (Check_Var_Secondary != (Check_Var_Total^16777215)){
        //console.log("Error: Check_Var_Secondary does not match previous check");
        Game_Canvas = null;
    }
    if (Check_Var_Team_EXP != Check_Var2_Team_EXP){
        console.log("Team_EXP:"+Check_Var_Team_EXP+" != Team_EXP2:"+Check_Var2_Team_EXP);
        Game_Canvas = null;
    }
    if (Check_Var_Team_Gold != Check_Var2_Team_Gold){
        console.log("Team_Gold:"+Check_Var_Team_Gold+" != Team_Gold2:"+Check_Var2_Team_Gold);
        Game_Canvas = null;
    }
    if (Check_Var_LV != Check_Var2_LV){
        console.log("LV:"+Check_Var_LV+" != LV2:"+Check_Var2_LV);
        Game_Canvas = null;
    }
    if (Check_Var_SP != Check_Var2_SP){
        console.log("SP:"+Check_Var_SP+" != SP2:"+Check_Var2_SP);
        Game_Canvas = null;
    }
    if (Check_Var_LP_SP != Check_Var2_LP_SP){
        console.log("LP_SP:"+Check_Var_LP_SP+" != LP_SP2:"+Check_Var2_LP_SP);
        Game_Canvas = null;
    }
    if (Check_Var_STR_SP != Check_Var2_STR_SP){
        console.log("STR_SP:"+Check_Var_STR_SP+" != STR_SP2:"+Check_Var2_STR_SP);
        Game_Canvas = null;
    }
    if (Check_Var_DEX_SP != Check_Var2_DEX_SP){
        console.log("DEX_SP:"+Check_Var_DEX_SP+" != DEX_SP2:"+Check_Var2_DEX_SP);
        Game_Canvas = null;
    }
    if (Check_Var_MAG_SP != Check_Var2_MAG_SP){
        console.log("MAG_SP:"+Check_Var_MAG_SP+" != MAG_SP2:"+Check_Var2_MAG_SP);
        Game_Canvas = null;
    }
    if (Check_Var_Ranger_Class != Check_Var2_Ranger_Class){
        console.log("Ranger_Class:"+Check_Var_Ranger_Class+" != Ranger_Class2:"+Check_Var2_Ranger_Class);
        Game_Canvas = null;
    }
    if (Check_Var_LP_Current != Check_Var2_LP_Current){
        //console.log("LP_Current:"+Check_Var_LP_Current+" != LP_Current2:"+Check_Var2_LP_Current);
        Game_Canvas = null;
    }
    if (Check_Var_MP_Bar != Check_Var2_MP_Bar){
        console.log("MP_Bar:"+Check_Var_MP_Bar+" != MP_Bar2:"+Check_Var2_MP_Bar);
        Game_Canvas = null;
    }
    if (Check_Var_LP_Max != Check_Var2_LP_Max){
        console.log("LP_Max:"+Check_Var_LP_Max+" != LP_Max2:"+Check_Var2_LP_Max);
        Game_Canvas = null;
    }
    if (Check_Var_STR != Check_Var2_STR){
        console.log("STR:"+Check_Var_STR+" != STR2:"+Check_Var2_STR);
        Game_Canvas = null;
    }
    if (Check_Var_DEX != Check_Var2_DEX){
        console.log("DEX:"+Check_Var_DEX+" != DEX2:"+Check_Var2_DEX);
        Game_Canvas = null;
    }
    if (Check_Var_MAG != Check_Var2_MAG){
        console.log("MAG:"+Check_Var_MAG+" != MAG2:"+Check_Var2_MAG);
        Game_Canvas = null;
    }
    if (Check_Var_AT_Min != Check_Var2_AT_Min){
        console.log("AT_Min:"+Check_Var_AT_Min+" != AT_Min2:"+Check_Var2_AT_Min);
        Game_Canvas = null;
    }
    if (Check_Var_AT_Max != Check_Var2_AT_Max){
        console.log("AT_Max:"+Check_Var_AT_Max+" != AT_Max2:"+Check_Var2_AT_Max);
        Game_Canvas = null;
    }
    if (Check_Var_Agi_Min != Check_Var2_Agi_Min){
        console.log("Agi_Min:"+Check_Var_Agi_Min+" != Agi_Min2:"+Check_Var2_Agi_Min);
        Game_Canvas = null;
    }
    if (Check_Var_Agi_Max != Check_Var2_Agi_Max){
        console.log("Agi_Max:"+Check_Var_Agi_Max+" != Agi_Max2:"+Check_Var2_Agi_Max);
        Game_Canvas = null;
    }
    if (Check_Var_Range != Check_Var2_Range){
        console.log("Range:"+Check_Var_Range+" != Range2:"+Check_Var2_Range);
        Game_Canvas = null;
    }
    if (Check_Var_Item_Inv != Check_Var2_Item_Inv){
        console.log("Item_Inv:"+Check_Var_Item_Inv+" != Item_Inv2:"+Check_Var2_Item_Inv);
        Game_Canvas = null;
    }
    if (Check_Var_Comp1_Inv != Check_Var2_Comp1_Inv){
        console.log("Comp1_Inv:"+Check_Var_Comp1_Inv+" != Comp1_Inv2:"+Check_Var2_Comp1_Inv);
        Game_Canvas = null;
    }
    if (Check_Var_Comp2_Inv != Check_Var2_Comp2_Inv){
        console.log("Comp2_Inv:"+Check_Var_Comp2_Inv+" != Comp2_Inv2:"+Check_Var2_Comp2_Inv);
        Game_Canvas = null;
    }
    if (Check_Var_STR_Aura != Check_Var2_STR_Aura){
        console.log("STR_Aura:"+Check_Var_STR_Aura+" != STR_Aura2:"+Check_Var2_STR_Aura);
        Game_Canvas = null;
    }
    if (Check_Var_DEX_Aura != Check_Var2_DEX_Aura){
        console.log("DEX_Aura:"+Check_Var_DEX_Aura+" != DEX_Aura2:"+Check_Var2_DEX_Aura);
        Game_Canvas = null;
    }
    if (Check_Var_Stage_Status != Check_Var2_Stage_Status){
        console.log("Stage_Status:"+Check_Var_Stage_Status+" != Stage_Status2:"+Check_Var2_Stage_Status);
        Game_Canvas = null;
    }
    if (Check_Var_Game_Mode != Check_Var2_Game_Mode){
        console.log("Game_Mode:"+Check_Var_Game_Mode+" != Game_Mode2:"+Check_Var2_Game_Mode);
        Game_Canvas = null;
    }
    if (Check_Var_FP0 != Check_Var2_FP0){
        console.log("FP0:"+Check_Var_FP0+" != FP0_2:"+Check_Var2_FP0);
        Game_Canvas = null;
    }
    if (Check_Var_FP1 != Check_Var2_FP1){
        console.log("FP1:"+Check_Var_FP1+" != FP1_2:"+Check_Var2_FP1);
        Game_Canvas = null;
    }
    if (Check_Var_Rank0 != Check_Var2_Rank0){
        console.log("Rank0:"+Check_Var_Rank0+" != Rank0_2:"+Check_Var2_Rank0);
        Game_Canvas = null;
    }
    if (Check_Var_Rank1 != Check_Var2_Rank1){
        console.log("Rank1:"+Check_Var_Rank1+" != Rank1_2:"+Check_Var2_Rank1);
        Game_Canvas = null;
    }

    if (random(100)<1){
        for (var i=0; i<Item_Catalogue.length; i++){
            item_attribute_data = 0;
            for (var j=0; j<Item_Catalogue[i].length; j++){
                if (typeof Item_Catalogue[i][j]=='number')
                    item_attribute_data += Item_Catalogue[i][j]&255;
            }
            if (Item_Attribute_Data[i]!=item_attribute_data){
                console.log("Error: Item_Attribute_Data does not match previous check");
                Game_Canvas = null;
            }
        }
    }
    if (random(100)<1){
        enemy_spawn_data = 0;
        for (var i=0; i<Stage_Spawns.length; i++){
            for (var j=0; j<Stage_Spawns[i].length; j++){
                for (var k=0; k<Stage_Spawns[i][j].length; k++)
                    enemy_spawn_data += Stage_Spawns[i][j][k];
            }
        }
        if (Enemy_Spawn_Data!=enemy_spawn_data){
            console.log("Error: Enemy_Spawn_Data does not match previous check");
            Game_Canvas = null;
        }
    }
    if (random(100)<1){
        monster_data = 0;
        for (var i=0; i<EN_Info.length; i++){
            for (var j=0; j<EN_Info[i].length; j++)
                monster_data += EN_Info[i][j]&65535;
        }
        if (Monster_Data!=monster_data){
            console.log("Error: Monster_Data does not match previous check");
            Game_Canvas = null;
        }
    }
    if (random(100)<1){
        shop_item_data = 0;
        for (var i=0; i<Shop_Items.length; i++){
            for (var j=0; j<Shop_Items[i].length; j++){
                for (var k=0; k<Shop_Items[i][j].length; k++)
                    shop_item_data += Shop_Items[i][j][k]*k&65535;
            }
        }
        if (Shop_Item_Data!=shop_item_data){
            console.log("Error: Shop_Item_Data does not match previous check");
            Game_Canvas = null;
        }
    }
}
