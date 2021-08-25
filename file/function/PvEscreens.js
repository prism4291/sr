window.fff = PvEscreens; // da.fff = vf;
function PvEscreens(){ // original name: vf()
    var b,opacity,x_pos;
    var static_left,static_middle,static_right,group_pos,group_en_type,group_count,en_xpos,en_ypos,tile_num;
    var screen_intro_text1 = "";

    if (Sequence_Step==10){                                                           // Sequence: load PvE screen
        if (Terrain.TRset(Current_Stage)){
            Players.PLadd(0,0,Terrain.TR_low_surface[0]);
            Players.PLadd(1,1,Terrain.TR_low_surface[1]);
            Players.PLadd(2,2,Terrain.TR_low_surface[2]);
            Players.PLadd(3,3,Terrain.TR_low_surface[3]);
            Enemies.ENreset(1);

            Enemy_Spawn_Scale = 100;
            for (var s=Stickmen_Slots; s<Inv_Last; s++){
                if (getVal(Item_Inv[s],Eff_ID) == Crown_Imprl)
                    Enemy_Spawn_Scale += getVal(Item_Inv[s],Eff1);
                if (getVal(Comp1_Inv[s],Eff_ID) == Crown_Imprl)
                    Enemy_Spawn_Scale += getVal(Comp1_Inv[s],Eff1);
                if (getVal(Comp2_Inv[s],Eff_ID) == Crown_Imprl)
                    Enemy_Spawn_Scale += getVal(Comp2_Inv[s],Eff1);
            }
            Enemy_Spawn_Scale = clamp(Enemy_Spawn_Scale,100,100+50*Max_Crowns);

            static_left = floor(randomRange(12,(Win_Width>>5)+12));
            static_middle = floor(randomRange((Win_Width>>5)+12,(Win_Width>>4)+12));
            static_right = floor(randomRange((Win_Width>>4)+12,(Win_Width>>3)-4));
            for (var l=0; l<floor((Stage_Spawns[Current_Stage][Current_Screen].length-2)/3); l++){
                group_pos = Stage_Spawns[Current_Stage][Current_Screen][3*l+2];
                group_en_type = Stage_Spawns[Current_Stage][Current_Screen][3*l+3];
                group_count = floor(Stage_Spawns[Current_Stage][Current_Screen][3*l+4]*Enemy_Spawn_Scale/100*Enemy_Mult); // multiply the enemy group sizes

                for (var e=0; e<group_count; e++){
                    if (group_pos==Ground){
                        en_xpos = floor(randomRange(12,(Win_Width>>3)-4));
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Ground_Left){
                        en_xpos = floor(randomRange(12,(Win_Width>>5)+12));
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Ground_Middle){
                        en_xpos = floor(randomRange((Win_Width>>5)+12,(Win_Width>>4)+12));
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Ground_Right){
                        en_xpos = floor(randomRange((Win_Width>>4)+12,(Win_Width>>3)-4));
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Air_Water){
                        en_xpos = floor(randomRange(12,(Win_Width>>3)-4));
                        en_ypos = floor(randomRange(Terrain.TR_air_ceil[en_xpos]+2,Terrain.TR_high_surface[en_xpos]));
                    } else if (group_pos==Air){
                        en_xpos = floor(randomRange(12,(Win_Width>>3)-4));
                        en_ypos = floor(randomRange(Terrain.TR_air_ceil[en_xpos]+2,Terrain.TR_air_floor[en_xpos]));
                    } else if (group_pos==Water && Terrain.TR_water_count>0){
                        tile_num = floor(random(Terrain.TR_water_count));
                        en_xpos = Terrain.TR_water_nonsurface[tile_num]%Terrain.TR_width;
                        en_ypos = floor(Terrain.TR_water_nonsurface[tile_num]/Terrain.TR_width);
                    } else if (group_pos==Ground_Left_Clump){
                        en_xpos = static_left;
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Ground_Middle_Clump){
                        en_xpos = static_middle;
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Ground_Right_Clump){
                        en_xpos = static_right;
                        en_ypos = fiftyfifty(Terrain.TR_low_surface[en_xpos],Terrain.TR_high_surface[en_xpos]);
                    } else if (group_pos==Ceiling){
                        en_xpos = floor(randomRange(12,(Win_Width>>3)-4));
                        en_ypos = Terrain.TR_air_ceil[en_xpos];
                    } else if (group_pos==Ceiling_Left){
                        en_xpos = floor(randomRange(12,(Win_Width>>5)+12));
                        en_ypos = Terrain.TR_air_ceil[en_xpos];
                    } else if (group_pos==Ceiling_Middle){
                        en_xpos = floor(randomRange((Win_Width>>5)+12,(Win_Width>>4)+12));
                        en_ypos = Terrain.TR_air_ceil[en_xpos];
                    } else if (group_pos==Ceiling_Left){
                        en_xpos = floor(randomRange((Win_Width>>4)+12,(Win_Width>>3)-4));
                        en_ypos = Terrain.TR_air_ceil[en_xpos];
                    } else {
                        continue;
                    }
                    Enemies.ENadd(en_xpos,en_ypos,group_en_type);
                }
            }
            Projectiles.PJ_index = 0;
            Indicators.IN_index = 0;
            Drops.DP_index = 0;
            Text_Fade = 0;
            Sign_Touched_Mode = 0;
            Target_Array_ID = 0;
            En_Count_From_Max = 0;
            Target_HP_Max = 0;
            Target_HP_Current = 0;
            Drops.DP_log = 0;
            DPSM_Calculator.CLreset(2);
            Sequence_Step++;
        }
    } else if (Sequence_Step==11){                                                    // Sequence: fade in screen (including splash text for first screen and boss screen)
        drawStage(0);
        drawUI(0);
        DPSM_Calculator.CLoutputStats();
        r = 30;
        screen_intro_text1 = "";

        if (Current_Screen==0){
            r = 110;
            screen_intro_text1 = Stage_Names[Current_Stage];
        } else if (Stage_Spawns[Current_Stage].length == Current_Screen+1){
            r = 110;
            screen_intro_text1 = "Boss Area";
        }

        screenTransition(0xFF-floor(0xFF*(Text_Fade<30? Text_Fade :30)/30));

        if (r==110){
            opacity = 0xFF;
            if (Text_Fade<30)
                opacity = floor(0xFF*Text_Fade/30);
            else if (Text_Fade>80)
                opacity = 0xFF-floor(0xFF*(Text_Fade-80)/30);
            largeMessage(Large_Text,Win_Hcenter,128,screen_intro_text1,0xFF,0xFF,0xFF,opacity,64,64,64,opacity,16,24);
            x_pos = -1024+floor(512*Text_Fade/30);
            drawLine(x_pos,112,x_pos+1024,112,0x808080);
            x_pos = 512-floor(512*Text_Fade/30);
            drawLine(x_pos,141,x_pos+1024,141,0x808080);
        }
        Text_Fade++;
        //Text_Fade = r; // skip fade-in for testing
        if (Text_Fade==r){
            Text_Fade = 0;
            Sequence_Step++;
        }
    } else if (Sequence_Step==12){                                                    // Sequence: play screen (after fade-in)
        drawStage(0);
        drawUI(0);
        DPSM_Calculator.CLoutputStats();

        if (LP_Current[0]+LP_Current[1]+LP_Current[2]+LP_Current[3] == 0){ // if team is dead
            Text_Fade = 0;
            Sequence_Step = 30;
        } else if (Sign_Touched_Mode!=0){
            Sequence_Step++;
        } else if (isMouseHovered(Win_Width-56-4-8-80-4,4,56,20)){
            if (Clicked)
                Sequence_Step = 20;
            else if (Is_Key_Pressed1[32]) // spacebar
                Sequence_Step = 20;

            Large_Text.TXoutputB(Win_Width-52-4-8-80-4,8,"Option",0xFF0000,0x000000); // options button (red highlight while in normal stages)
        } else if (Is_Key_Pressed1[32]){ // spacebar
            Sequence_Step = 20;
        } else if (isMouseHovered(Win_Width-80-4,4,80,20)){
            if (Clicked)
                Sequence_Step = 6;
            Large_Text.TXoutputB(Win_Width-4-70-6,8,"World Map",0xFF0000,0x000000); // World Map button (red highlight while in normal stages)
        }
    } else if (Sequence_Step==13){                                                    // Sequence: fade out screen after touching sign
        drawStage(0);
        drawUI(0);
        DPSM_Calculator.CLoutputStats();
        screenTransition(floor(0xFF*Text_Fade/30));
        Text_Fade++;
        //Text_Fade = 30; //  skip fade-out for testing

        if (Text_Fade==30){
            if (Sign_Touched_Mode==1){
                Sign_Touched_Mode = 0;
                Current_Screen++;
                Text_Fade = 0;
                Sequence_Step = 10;
            } else if (Sign_Touched_Mode==2){
                Text_Fade = Current_Screen = Sign_Touched_Mode = 0;
                antiCheatCheck();
                Stage_Status[Current_Stage] |= Beaten;
                if (Dot_Locations[Current_Stage][3]>0)
                    Stage_Status[Dot_Locations[Current_Stage][3]] |= Unlocked;
                if (Dot_Locations[Current_Stage][4]>0)
                    Stage_Status[Dot_Locations[Current_Stage][4]] |= Unlocked;
                antiCheatSet();
                Sequence_Step = 6;
                if (Dot_Locations[Current_Stage][3] == -1)
                    Sequence_Step = 40;
            }
            Save_Code3 = genSaveCode(0);
            Save_Code1 = 1;
        }
    } else if (Sequence_Step==20){                                                    // Sequence: paused game
        drawStage(1);
        drawUI(1);
        var T,options_list1,options_list2,options_list3,options_list4,options_list5;
        var resume = 12;

        if ((Current_Stage==0 || Current_Stage==20 || Current_Stage==47 || Current_Stage==70 || Current_Stage==77) && Current_Screen==1)
            resume = 52;
        else
            DPSM_Calculator.CLoutputStats();

        if (isMouseHovered(Win_Width-56-4-8-80-4,4,56,20)){
            if (Clicked)
                Sequence_Step = resume;
            else if (Is_Key_Pressed1[32]) // spacebar
                Sequence_Step = resume;

            Large_Text.TXoutputB(Win_Width-52-4-8-80-4,8,"Option",0xFF0000,0x000000); // options button (red highlight while options window is open)
        } else if (Is_Key_Pressed1[32]){ // spacebar
            Sequence_Step = resume;
        }

        T = (Inv_Top>>1)-(152>>1)-10;
        Display_Mode = 1;
        filledRect(Win_Hcenter-128,T,256,151,0xCC333333);
        Display_Mode = 0;
        /**********************************************************/
        centeredText(Large_Text,Win_Hcenter,58,"Options",0xFFFFFF,0x000000); // options (white background and red highlighted)
        /**********************************************************/
        /** edit: delete "#" to add debug option to Options menu **#/
        centeredText(Large_Text,Win_Hcenter-56,T+16,"Options",0xFFFFFF,0x000000); // options (white background and red highlighted)
        options_list1 = ["OFF","ON"];
            Large_Text.TXoutputB(Win_Hcenter-16,T+10,"  Debug Mode: "+options_list1[Debug_Mode],0xFFFFFF,0x000000);
        if (isMouseHovered(Win_Hcenter-128,T+10,256,13)){
            Large_Text.TXoutputB(Win_Hcenter-16,T+10,"  Debug Mode: "+options_list1[Debug_Mode],0xFF0000,0x000000);
            Debug_Mode = cycle(Debug_Mode+Sett_Change,0,1);
        }
        /**********************************************************/
        for (var s=0; s<Stickmen_Slots; s++){
            dispItemCentered(Player_Img,Win_Hcenter+32*s,T+36,24,24,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),0,24,24,0xFFFFFFFF);
            colorPortraitWeap(Win_Hcenter+32*s-12,T+24,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),getVal(Item_Inv[Stickmen_Slots+s],Item_Color));
        }
        centeredText(Large_Text,Win_Hcenter-76,T+56,"Auto Move:",0xFFFFFF,0x000000);
        options_list1 = ["OFF","ON"];
        for (var s=0; s<Stickmen_Slots; s++){
            centeredText(Large_Text,Win_Hcenter+32*s,T+56,options_list1[Sett_Auto_Move[s]],0xFFFFFF,0x000000);

            if (isMouseHoveredCenter(Win_Hcenter+32*s,T+56,32,13)){
                centeredText(Large_Text,Win_Hcenter+32*s,T+56,options_list1[Sett_Auto_Move[s]],0xFF0000,0x000000);
                if (Clicked == true)
                    Sett_Auto_Move[s] = 1-Sett_Auto_Move[s];
            }
        }
        options_list2 = ["No","Yes"]; // Move If Dying setting
        Large_Text.TXoutputB(Win_Hcenter-128,T+66,"  Move If Dying : "+options_list2[Sett_Move_If_Dying],0xFFFFFF,0x000000);
        if (isMouseHovered(Win_Hcenter-128,T+66,256,13)){
            Large_Text.TXoutputB(Win_Hcenter-128,T+66,"  Move If Dying : "+options_list2[Sett_Move_If_Dying],0xFF0000,0x000000);
            Sett_Move_If_Dying = cycle(Sett_Move_If_Dying+Sett_Change,0,1);
        }
        options_list3 = ["Player&Enemy","Player","Enemy","OFF"]; // Damage Effect setting
        Large_Text.TXoutputB(Win_Hcenter-128,T+79," Damage Numbers : "+options_list3[Sett_Dmg_Indicators],0xFFFFFF,0x000000);
        if (isMouseHovered(Win_Hcenter-128,T+79,256,13)){
            Large_Text.TXoutputB(Win_Hcenter-128,T+79," Damage Numbers : "+options_list3[Sett_Dmg_Indicators],0xFF0000,0x000000);
            Sett_Dmg_Indicators = cycle(Sett_Dmg_Indicators+Sett_Change,0,3); // red
        }
        options_list4 = ["OFF","Player","Enemy","Player&Enemy"]; // LP Bar setting
        Large_Text.TXoutputB(Win_Hcenter-128,T+92,"        LP Bars : "+options_list4[Sett_LP_Bar_Disp],0xFFFFFF,0x000000);
        if (isMouseHovered(Win_Hcenter-128,T+92,256,13)){
            Large_Text.TXoutputB(Win_Hcenter-128,T+92,"        LP Bars : "+options_list4[Sett_LP_Bar_Disp],0xFF0000,0x000000);
            Sett_LP_Bar_Disp = cycle(Sett_LP_Bar_Disp+Sett_Change,0,3);
        }
        options_list5 = ["Square","Triangle","Shadow","OFF"]; // PL Symbol setting
        Large_Text.TXoutputB(Win_Hcenter-128,T+105,"      PL Symbol : "+options_list5[Sett_PL_Symbol],0xFFFFFF,0x000000);
        if (isMouseHovered(Win_Hcenter-128,T+105,256,13)){
            Large_Text.TXoutputB(Win_Hcenter-128,T+105,"      PL Symbol : "+options_list5[Sett_PL_Symbol],0xFF0000,0x000000);
            Sett_PL_Symbol = cycle(Sett_PL_Symbol+Sett_Change,0,3);
        }
        Large_Text.TXoutputB(Win_Hcenter-128,T+118," Drag Dead Body : "+options_list1[Sett_Drag_Dead_Body],0xFFFFFF,0x000000); // Drag Dead Body setting
        if (isMouseHovered(Win_Hcenter-128,T+118,256,13)){
            Large_Text.TXoutputB(Win_Hcenter-128,T+118," Drag Dead Body : "+options_list1[Sett_Drag_Dead_Body],0xFF0000,0x000000);
            Sett_Drag_Dead_Body = cycle(Sett_Drag_Dead_Body+Sett_Change,0,1);
        }
        centeredText(Large_Text,Win_Hcenter,T+140,"Space Bar: open & close",0xC0C0C0,0x000000);
        if (isMouseHoveredCenter(Win_Hcenter,T+140,256,13)){
            centeredText(Large_Text,Win_Hcenter,T+140,"Space Bar: open & close",0xFF0000,0x000000);
            if (Sett_Change!=0)
                Sequence_Step = resume;
        }
    } else if (Sequence_Step==30){                                                    // Sequence: Game Over text
        drawStage(0);
        drawUI(0);
        DPSM_Calculator.CLoutputStats();
        if (Text_Fade<100)
            Text_Fade++;
        opacity = floor(0xFF*Text_Fade/100);
        largeMessage(Large_Text,Win_Hcenter,Inv_Top>>1,"Game Over",100,20,10,opacity,200,0,0,opacity,16,24);
        if (Text_Fade==100 && Clicked){
            antiCheatCheck();
            for (var s=0; s<Stickmen_Slots; s++){
                if (LP_Current[s]==0)
                    LP_Current[s] = 1;
            }
            antiCheatSet();
            Sequence_Step = 1;
        }
    } else if (Sequence_Step==40){                                                    // Sequence: Game Clear screen
        largeMessage(Large_Text,Win_Hcenter,112,"Congratulation",204,148,73,0xFF,100,0,0,0xFF,16,24);
        largeMessage(Large_Text,Win_Hcenter,144,"Game Clear",204,148,73,0xFF,100,0,0,0xFF,16,24);
        centeredText(Large_Text,Win_Hcenter,256,"(C) 2008-2017 DAN-BALL",0xCC9449,0x640000);
        for (var s=0; s<Stickmen_Slots; s++){
            xx = 166+60*s-Players.PL_joint[s][2].x;
            yy = 224-Players.PL_joint[s][2].y;
            for (var j=0; j<21; j++){
                Players.PL_joint[s][j].x += xx;
                Players.PL_joint[s][j].y += yy;
            }
            drawItem(Terrain_Textures[12],166+60*s-12,233,24,8,0,0,24,8);
        }
        Players.PLrenderPlayer();
        if (Clicked){
            antiCheatCheck();
            for (var s=0; s<Stickmen_Slots; s++){
                if (LP_Current[s]==0)
                    LP_Current[s] = 1;
            }
            antiCheatSet();
            Sequence_Step = 1;
        }
    }
}
