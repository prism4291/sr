window.fff = menuAndMap; // da.fff = uf
function menuAndMap(){ // original name: uf()
    var IC_level,AC_level,new_game_plus;

    if (Sequence_Step==0){                                                            // Sequence: reset players and enemies for title screen
        Players.PLreset();
        Enemies.ENreset(0);
        DPSM_Calculator.CLreset(0);
        Sequence_Step++;

        if (Game_Mode==1)
            Sequence_Step = 60;
        else if (Game_Mode==2 || Game_Mode==3)
            Sequence_Step = 70;

    } else if (Sequence_Step==1){                                                     // Sequence: load in stickmen for title screen
        Current_Screen = 0;
        Inv_Height = 0;
        Inv_Top = Win_Height;
        if (Terrain.TRset(0)){
            Players.PLadd(0,(Win_Width>>4)-12,Terrain.TR_low_surface[(Win_Width>>4)-12]); // set spawn positions for the rangers
            Players.PLadd(1,(Win_Width>>4)-4,Terrain.TR_low_surface[(Win_Width>>4)-4]);
            Players.PLadd(2,(Win_Width>>4)+4,Terrain.TR_low_surface[(Win_Width>>4)+4]);
            Players.PLadd(3,(Win_Width>>4)+12,Terrain.TR_low_surface[(Win_Width>>4)+12]);
            setRangersUI();
            Enemies.ENreset(1);
            Sequence_Step++;
        }
    } else if (Sequence_Step==2){                                                     // Sequence: make buttons for new game, new game+, load game, vs mode
        Players.PLmain();
        setRangersUI();
        Terrain.TRdrawTerrain();
        Players.PLrenderPlayer();
        dispItemCentered(Title_Img,Win_Hcenter,100,365,121,0,Game_Language? 0 :121,365,121,0xFFFFFFFF);

        IC_level = 100;
        AC_level = 0;
        new_game_plus = false;

        // add up crowns
        for (var i=Stickmen_Slots; i<Inv_Last; i++){
            if (getVal(Item_Inv[i] ,Eff_ID) == Crown_Imprl) IC_level += getVal(Item_Inv[i] ,Eff1);
            if (getVal(Comp1_Inv[i],Eff_ID) == Crown_Imprl) IC_level += getVal(Comp1_Inv[i],Eff1);
            if (getVal(Comp2_Inv[i],Eff_ID) == Crown_Imprl) IC_level += getVal(Comp2_Inv[i],Eff1);
            if (getVal(Item_Inv[i] ,Eff_ID) == Crown_Anger) AC_level = 1;
            if (getVal(Comp1_Inv[i],Eff_ID) == Crown_Anger) AC_level = 1;
            if (getVal(Comp2_Inv[i],Eff_ID) == Crown_Anger) AC_level = 1;
        }
        IC_level = clamp(IC_level,100,100+50*Max_Crowns);
        if (IC_level>100 || AC_level==1)
            new_game_plus = true;

        if (new_game_plus==false)
             centeredText(Large_Text,Win_Hcenter,195,"New Game" ,0xFFFFFF,0x996633);
        else centeredText(Large_Text,Win_Hcenter,195,"New Game+",0xFFFFFF,0x996633);

        if (isMouseHoveredCenter(new_game_plus==false? Win_Hcenter :316,195,new_game_plus==false? 128 :248,24)){
            if (Clicked){
                antiCheatCheck();
                Selected_Player = Displayed_Object = 3;

                for (var s=0; s<Stickmen_Slots; s++){
                    // assign current team+equipped items to placeholder
                    Ranger_Class_Proxy[s] = Ranger_Class[s];
                    Item_Inv_Proxy[s] = Item_Inv[Stickmen_Slots+s];
                    Comp1_Inv_Proxy[s] = Comp1_Inv[Stickmen_Slots+s];
                    Comp2_Inv_Proxy[s] = Comp2_Inv[Stickmen_Slots+s];

                    // resest team and equipped items
                    Ranger_Class[s] = 0;
                    Item_Inv[Stickmen_Slots+s] = 0;
                    Comp1_Inv[Stickmen_Slots+s] = 0;
                    Comp2_Inv[Stickmen_Slots+s] = 0;
                }
                Sequence_Step++;
                antiCheatSet();
                setRangersUI();
            }
            if (new_game_plus==false)
                 drawLine(Win_Hcenter-64,203,Win_Hcenter+64,203,0xAA0000);
            else drawLine(Win_Hcenter-64,203,Win_Hcenter+64,203,0xAA0000);
        }
        if (Ranger_Class[0]!=0 && Ranger_Class[1]!=0 && Ranger_Class[2]!=0 && Ranger_Class[3]!=0){
            centeredText(Large_Text,Win_Hcenter,235,"Load Game",0xFFFFFF,0x996633);
            if (isMouseHoveredCenter(Win_Hcenter,235,128,24)){
                if (Clicked)
                    Sequence_Step = 5;
                drawLine(Win_Hcenter-64,243,Win_Hcenter+64,243,0xAA0000);
            }
        }
        centeredText(Large_Text,Win_Hcenter,275,"VS Mode",0xFFFFFF,0x4D4D99);
        if (isMouseHoveredCenter(Win_Hcenter,275,128,24)){
            if (Clicked){
                if (Game_Language)
                     location.pathname = "/javagame/ranger/versus.html";
                else location.pathname  = "/en/javagame/ranger/versus.html";
            }
            drawLine(Win_Hcenter-64,283,Win_Hcenter+64,283,0xAA0000);
        }
        menuCredits();
    } else if (Sequence_Step==3){                                                     // Sequence: Class Select screen
        Players.PLmain();
        Terrain.TRdrawTerrain();
        Players.PLrenderPlayer();

        largeMessage(Large_Text,Win_Hcenter,50,"Player's Class Selection",204,148,73,0xFF,100,0,0,0xFF,16,24);

        for (var s=0; s<Stickmen_Slots; s++){ // clicking on stickman slots when choosing class
            if (isMouseHoveredCenter(160+64*s,140,24,24)){
                if (Clicked)
                    Selected_Player = Displayed_Object = s;
                filledRectCentered(160+64*s,140,24,24,0x800000); // fill color when chosing stickman slot
            }
            outlineRectCentered(160+64*s,140,25,25,0xFFFFFF);
            dispItemCentered(Player_Img,160+64*s,140,24,24,24*Ranger_Class[s],0,24,24,0xFFFFFFFF);
        }
        outlineRectCentered(160+64*Displayed_Object,140,25,25,0xFF0000); // box around stickman slot

        antiCheatCheck();

        for (var i=0; i<8; i++){ // number of classes
            Large_Text.TX_spacing = -1;
            centeredText(Large_Text,46+60*i,220,Class_Name_List[i+1],0xCC9449,0x640000);
            Large_Text.TX_spacing = 0;

            if (isMouseHoveredCenter(46+60*i,240,24,24)){
                if (Clicked){
                    Ranger_Class[Displayed_Object] = i+1;
                    Item_Inv[Stickmen_Slots+Displayed_Object] = [3,4,5,6,58,76,188,289][i];
                    Comp1_Inv[Stickmen_Slots+Displayed_Object] = 0;
                    Comp2_Inv[Stickmen_Slots+Displayed_Object] = 0;
                }
                filledRectCentered(46+60*i,240,24,24,0x800000); // fill color when hovering over class choices
            }
            outlineRectCentered(46+60*i,240,25,25,0xFFFFFF);
            dispItemCentered(Player_Img,46+60*i,240,24,24,24*(i+1),0,24,24,0xFFFFFFFF);
        }

        if (Ranger_Class[0]!=0 && Ranger_Class[1]!=0 && Ranger_Class[2]!=0 && Ranger_Class[3]!=0){
            centeredText(Large_Text,464,300,"Start",0xFFFFFF,0x996633);
            if (isMouseHoveredCenter(464,300,128,24)){
                if (Clicked)
                    Sequence_Step++;
                drawLine(416,308,512,308,0xAA0000);
            }
        }

        centeredText(Large_Text,48,300,"Return",0xFFFFFF,0x996633);
        if (isMouseHoveredCenter(48,300,128,24)){
            if (Clicked){
                for (var s=0; s<Stickmen_Slots; s++){ // restore previous team
                    Ranger_Class[s] = Ranger_Class_Proxy[s];
                    Item_Inv[Stickmen_Slots+s] = Item_Inv_Proxy[s];
                    Comp1_Inv[Stickmen_Slots+s] = Comp1_Inv_Proxy[s];
                    Comp2_Inv[Stickmen_Slots+s] = Comp2_Inv_Proxy[s];
                }
                Sequence_Step = 2; // return to step 2
            }
            drawLine(0,308,96,308,0xAA0000);
        }
        antiCheatSet();
        menuCredits();
    } else if (Sequence_Step==4){                                                     // Sequence: loading after clicking New Game
        antiCheatCheck();
        // add up crowns
        var IC_level = 100;
        var AC_level = 0;
        /** edit: delete "#" to also check crowns of equipped weapons on existing team **#/
        for (var s=0; s<Stickmen_Slots; s++){
            if (getVal(Comp1_Inv_Proxy[s],Eff_ID)==Crown_Imprl) IC_level += getVal(Comp1_Inv_Proxy[s],Eff1);
            if (getVal(Comp2_Inv_Proxy[s],Eff_ID)==Crown_Imprl) IC_level += getVal(Comp2_Inv_Proxy[s],Eff1);
            if (getVal(Comp1_Inv_Proxy[s],Eff_ID)==Crown_Anger) AC_level = 1;
            if (getVal(Comp2_Inv_Proxy[s],Eff_ID)==Crown_Anger) AC_level = 1;
        }
        /********************************************************************************/
        for (var i=Inv_First; i<Inv_Last; i++){ // check current inventory
            if (getVal(Item_Inv[i] ,Eff_ID)==Crown_Imprl) IC_level += getVal(Item_Inv[i] ,Eff1);
            if (getVal(Comp1_Inv[i],Eff_ID)==Crown_Imprl) IC_level += getVal(Comp1_Inv[i],Eff1);
            if (getVal(Comp2_Inv[i],Eff_ID)==Crown_Imprl) IC_level += getVal(Comp2_Inv[i],Eff1);
            if (getVal(Item_Inv[i] ,Eff_ID)==Crown_Anger) AC_level = 1;
            if (getVal(Comp1_Inv[i],Eff_ID)==Crown_Anger) AC_level = 1;
            if (getVal(Comp2_Inv[i],Eff_ID)==Crown_Anger) AC_level = 1;
        }
        IC_level = clamp(IC_level,100,100+50*Max_Crowns);

        // reset stages
        Current_Stage = 0;
        for (var s=0; s<Stage_Count; s++)
            Stage_Status[s] = 0;
        Stage_Status[0] = Beaten|Unlocked;
        Stage_Status[1] = Unlocked;

        // reset stats
        LV[0] = 1;
        FP[0] = 1;
        Team_Gold = Team_EXP = Rank[0] = 0;
        for (var s=0; s<Stickmen_Slots; s++){
            SP[s] = 0;
            LP_Current[s] = 50;
            MP_Bar[s] = 0;
            LP_SP[s] = 0;
            STR_SP[s] = 0;
            DEX_SP[s] = 0;
            MAG_SP[s] = 0;
            Sett_Auto_Move[s] = 1;
        }
        // reset options
        Sett_PL_Symbol = Sett_LP_Bar_Disp = Sett_Dmg_Indicators = Sett_Move_If_Dying = 0;
        Sett_Drag_Dead_Body = 1;

        // reset inventory
        for (var i=Inv_First; i<Inv_Size; i++){
            Item_Inv[i] = 0;
            Comp1_Inv[i] = 0;
            Comp2_Inv[i] = 0;
        }
        // reset team
        for (var s=0; s<Stickmen_Slots; s++)
            Players.PL_class_ID[s] = 0;

        // based on IC_level, give an imperial crown of the appropriate level
        if (IC_level >= 300)
            Item_Inv[Inv_First+0] = 560;
        else if (IC_level >= 250)
            Item_Inv[Inv_First+0] = 559;
        else if (IC_level >= 200)
            Item_Inv[Inv_First+0] = 558;
        else if (IC_level >= 150)
            Item_Inv[Inv_First+0] = 557;

        if (AC_level==1 && IC_level==100) // if no imperial crown
            Item_Inv[Inv_First] = 561;    // place anger crown in 1st inventory slot
        if (AC_level==1 && IC_level!=100) // if you have imperial crown
            Item_Inv[Inv_First+1] = 561;  // place anger crown in 2nd inventory slot

        Current_Screen = 0;
        WorldMap.MAP_tile_horizontal_spacer = 0;
        Sequence_Step = 6;
        antiCheatSet();
        menuCredits();
    } else if (Sequence_Step==5){                                                     // Sequence: loading after clicking Load Game
        Current_Screen = 0;
        Sequence_Step = 6;
    } else if (Sequence_Step==6){                                                     // Sequence: World Map
        DPSM_Calculator.CLreset(1);
        WorldMap.MAPmain();
        drawUI(2);
    }
}
