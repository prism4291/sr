window.fff = drawStage;
function drawStage(is_paused){ // original name: Tf()
    var pxl_color,sign_height,stage_effect_canvas,color,r,g,b,snow_intensity,tile_type,next_tile_type,current_pos,next_pos,next_xpos,next_ypos,drop,drop_slot;
    Terrain.TRdrawTerrain();
    if (Current_Stage==0 && Current_Screen==1 || Current_Stage==20 && Current_Screen==1 || Current_Stage==47 && Current_Screen==1 || Current_Stage==77 && Current_Screen==1){
        dispItemCentered(Hut_Img,400,183,117,84,0,0,78,56,0xFFFFFFFF); // hut for Inn
        dispItemCentered(Hut_Img,40,170,156,112,0,0,78,56,0xFFFFFFFF); // hut for Shop
        centeredText(Large_Text,400,168,"Inn",0xFFFFFF,0xD2953A); // white text at town type stages
        if (Current_Stage==0)
            centeredText(Large_Text,40,152,"Shop",0xFFFFFF,0xD2953A);
        else if (Current_Stage==20)
            centeredText(Large_Text,40,152," Compo Shop",0xFFFFFF,0xD2953A);
        else if (Current_Stage==47)
            centeredText(Large_Text,40,152," Junk Shop",0xFFFFFF,0xD2953A);
        else if (Current_Stage==77)
            centeredText(Large_Text,40,152," Compo Shop",0xFFFFFF,0xD2953A);
        centeredText(Large_Text,40,184,"Book",0xFFFFFF,0xD2953A);
    }
    if (Current_Stage==70 && Current_Screen==1){
        dispItem(Forget_Tree_Img,0,-288,512,512,0,0,64,64,0xFFFFFFFF);
        if (Sequence_Step==52){
            centeredText(Large_Text,Win_Hcenter,128,"Forget",0xFFFFFF,0x101814);
            centeredText(Large_Text,Win_Hcenter,160,"Inn",0xFFFFFF,0x101814); // white text at forget tree
            centeredText(Large_Text,Win_Hcenter,184,"Book",0xFFFFFF,0x101814);
        }
    }
    if (is_paused==0){
        Players.PLmain();
        Enemies.ENmain();
        Drops.DPmain();
        Indicators.INmain();
        Projectiles.PJmain();
    }

    // signs loading after all enemies killed (gauntlet style or no?)
    if (Terrain.TR_stage_num!=55 && Terrain.TR_stage_num!=89 && Current_Screen!=Stage_Spawns[Terrain.TR_stage_num].length-1 || Enemies.EN_index_current==0){
        if (Stage_Spawns[Current_Stage][Current_Screen][1]==7)
             sign_height = 8*Terrain.TR_low_surface[Terrain.TR_width-1]-16;
        else sign_height = 8*Terrain.TR_high_surface[Terrain.TR_width-1]-16;
        drawItem(Sign_Img,Win_Width-32,sign_height,32,24,0,0,32,24);

        if (Current_Screen==Stage_Spawns[Terrain.TR_stage_num].length-1){
            if (Terrain.TR_stage_num==88)
                 centeredText(Small_Text,Win_Width-16,sign_height+8,"END",0,-1);
            else centeredText(Small_Text,Win_Width-16,sign_height+8,"MAP",0,-1);
        } else if (Current_Screen==Stage_Spawns[Terrain.TR_stage_num].length-2){
            centeredText(Small_Text,Win_Width-16,sign_height+8,"BOSS",0,-1);
        } else {
            centeredText(Small_Text,Win_Width-16,sign_height+8,"NEXT",0,-1);
        }
    }
    Enemies.ENrenderEnemy();
    Drops.DPrenderDrops();
    Players.PLrenderPlayer();
    Projectiles.PJrenderProjectiles();
    stage_effect_canvas = Game_Canvas;
    switch (Terrain.TR_stage_num){
        case 15:
        case 16:
        case 30:
        case 31:
        case 32:
        case 33:
        case 66:
        case 67:
        case 68:
        case 69: // mist grove mist effect
            Display_Mode = 1;
            Display_Mode2 = 3;
            Game_Canvas = Stage_Eff_Canvas.IG_pxl_color_index;
            b = randomRange(1.7,3.69);
            b *= b*b*b;
            dispItemCentered(Projectiles_Img,randomRange(0,Win_Width),Win_Hcenter-b,Win_Hcenter,32,96,0,16,16,0x08FFFFFF);
            if (random(100)<3){
                for (var w=64*Win_Width; w<Inv_Top*Win_Width; w++)
                    Game_Canvas[w] = 250*Game_Canvas[w]>>8;
            }
            Game_Canvas = stage_effect_canvas;
            for (var w=Win_Width*64; w<Win_Width*Inv_Top; w++){
                color = Stage_Eff_Canvas.IG_pxl_color_index[w]&0xFF;
                stage_effect_canvas = Game_Canvas[w]>>16&0xFF;
                r = ((0xFF-stage_effect_canvas)*color>>8)+stage_effect_canvas;
                stage_effect_canvas = Game_Canvas[w]>>8&0xFF;
                g = ((0xFF-stage_effect_canvas)*color>>8)+stage_effect_canvas;
                stage_effect_canvas = Game_Canvas[w]&0xFF;
                b = ((0xFF-stage_effect_canvas)*color>>8)+stage_effect_canvas;
                Game_Canvas[w] = r<<16|g<<8|b;
            }
            Display_Mode = Display_Mode2 = 0;
            break;
        case 17:
        case 18:
        case 19:
        case 48:
        case 49:
        case 50:
        case 83:
        case 84: // cavern dark effect
            Game_Canvas = Stage_Eff_Canvas.IG_pxl_color_index;
            for (var a=0; a<Win_Width*Inv_Top; a++)
                Game_Canvas[a] = 0xFF;

            Display_Mode = Display_Mode2 = 3;

            for (var s=0; s<Stickmen_Slots; s++) // light around players
                dispItemCentered(Projectiles_Img,Players.PL_joint[s][0].x,Players.PL_joint[s][0].y,80,80,33,1,14,14,0xC0FFFFFF);

            for (var p=0; p<Projectiles.PJ_index; p++){ // light around projectiles
                if (Projectiles.PJ_attacker[p]!=-1)
                    dispItemCentered(Projectiles_Img,Projectiles.PJ_position[p].x,Projectiles.PJ_position[p].y,32,32,33,1,14,14,0x80FFFFFF);
            }
            for (var s=0; s<Stickmen_Slots; s++){
                if (Players.PL_class_ID[s]==8){ // if angel
                    for (var j=0; j<6; j++){
                        if (Players.PL_ring_thrown_status[s][j]!=0)
                            dispItemCentered(Projectiles_Img,Players.PL_joint[s][15+j].x,Players.PL_joint[s][15+j].y,32,32,33,1,14,14,0x80FFFFFF);
                    }
                }
            }
            for (var d=0; d<Drops.DP_index; d++) // light around drops
                dispItemCentered(Projectiles_Img,Drops.DP_position[d].x,Drops.DP_position[d].y-6,32,32,33,1,14,14,0xFFFFFFFF);

            if (Debug_Mode==1)
                 dispItemCentered(Projectiles_Img,Mouse_Xpos,Mouse_Ypos,600,600,33,1,14,14,0xC0FFFFFF); // bigger light around cursor
            else dispItemCentered(Projectiles_Img,Mouse_Xpos,Mouse_Ypos,80,80,33,1,14,14,0xC0FFFFFF);   // light around cursor

            Game_Canvas = stage_effect_canvas;
            Display_Mode = 1;
            for (var x=0; x<Win_Width*Inv_Top; x++){
                color = Stage_Eff_Canvas.IG_pxl_color_index[x];

                if (color==0xFF){
                    Game_Canvas[x] = 0x0F000000;
                } else {
                    stage_effect_canvas = Game_Canvas[x]>>16&0xFF;
                    r = (-stage_effect_canvas*color>>8)+stage_effect_canvas;
                    stage_effect_canvas = Game_Canvas[x]>>8&0xFF;
                    g = (-stage_effect_canvas*color>>8)+stage_effect_canvas;
                    stage_effect_canvas = Game_Canvas[x]&0xFF;
                    b = (-stage_effect_canvas*color>>8)+stage_effect_canvas;
                    Game_Canvas[x] = r<<16|g<<8|b;
                }
            }
            Display_Mode = Display_Mode2 = 0;
            break;
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 40:
        case 41:
        case 43: // desert heat haze effect
            b = 1*Time_Desert_Haze&511;
            for (var h=0; h<Inv_Top; h++){
                c = h*Win_Width;
                stage_effect_canvas = ~~(4*Xe_arr[b][1]+0.5);
                for (var w=0; w<Win_Width; w++)
                    Stage_Eff_Canvas.IG_pxl_color_index[c+w] = Game_Canvas[c+clamp(w+stage_effect_canvas,0,Win_Width-1)];
                b = b+6&511;
            }
            for (var i=0; i<Inv_Top*Win_Width; i++)
                Game_Canvas[i] = Stage_Eff_Canvas.IG_pxl_color_index[i];
            Time_Desert_Haze++; // added this line to fix haze effect
            break;
        case 51:
        case 52:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
        case 61: // snowfield snow effect
            snow_intensity = 1; // number of snowflakes created per frame
            if (Terrain.TR_stage_num==57)      snow_intensity = 2;
            else if (Terrain.TR_stage_num==58) snow_intensity = 2;
            else if (Terrain.TR_stage_num==59) snow_intensity = 2;
            else if (Terrain.TR_stage_num==60) snow_intensity = 3;
            else if (Terrain.TR_stage_num==61) snow_intensity = 3;

            for (var i=0; i<snow_intensity; i++)
                Stage_Eff_Canvas.IG_pxl_color_index[random(24576)] = 1;

            for (var y=Inv_Top-32-1; y>=0; y--){
                for (var x=Win_Width-1; x>=0; x--){
                    current_pos = y*Win_Width+x;
                    tile_type = Terrain.TR_tile_data[y>>3][x>>3];
                    if (Stage_Eff_Canvas.IG_pxl_color_index[current_pos]==1){
                        if (tile_type==-1 || tile_type==0 && (x&7)<3 && (y&7)<3 || tile_type==2 && (x&7)>4 && (y&7)<3){ // if air or top left or top right tile
                            if (random(100)>=50){
                                if (Terrain.TR_stage_num==57 || Terrain.TR_stage_num==58 || Terrain.TR_stage_num==61) // add wind for Snowfield 4, 5, 8
                                     next_xpos = x+floor(random(4))-2; // horizontal change: -2, -1, 0, or 1
                                else next_xpos = x+floor(random(3))-1; // horizontal change: -1, 0, or 1
                                next_xpos = cycle(next_xpos,0,Win_Width-1);
                                next_ypos = y+1;
                                next_pos = next_ypos*Win_Width+next_xpos;
                                if (Stage_Eff_Canvas.IG_pxl_color_index[next_pos]!=1){
                                    next_tile_type = Terrain.TR_tile_data[next_ypos>>3][next_xpos>>3];
                                    if (next_tile_type==-1 || next_tile_type==0 && (next_xpos&7)<3 && (next_ypos&7)<3 || next_tile_type==2 && (next_xpos&7)>4 && (next_ypos&7)<3){
                                        Stage_Eff_Canvas.IG_pxl_color_index[next_pos] = Stage_Eff_Canvas.IG_pxl_color_index[current_pos];
                                        Stage_Eff_Canvas.IG_pxl_color_index[current_pos] = 0;
                                    }
                                }
                            }
                        } else { // if tile cannot be occupied by snow
                            Stage_Eff_Canvas.IG_pxl_color_index[current_pos] = 0;
                        }
                    }
                }
            }
            Game_Canvas = Stage_Eff_Canvas.IG_pxl_color_index;
            for (var s=0; s<Stickmen_Slots; s++){
                if (LP_Current[s]!=0){
                    filledRectCentered(Players.PL_joint[s][0].x,Players.PL_joint[s][0].y,3,3,0x000000);
                    filledRectCentered(Players.PL_joint[s][9].x,Players.PL_joint[s][9].y,1,1,0x000000);
                    filledRectCentered(Players.PL_joint[s][10].x,Players.PL_joint[s][10].y,1,1,0x000000);
                }
            }
            for (var p=0; p<Projectiles.PJ_index; p++){
                if (Projectiles.PJ_res_type[p]==1)
                    filledRectCentered(Projectiles.PJ_position[p].x,Projectiles.PJ_position[p].y,3,3,0x000000);
            }
            Game_Canvas = stage_effect_canvas;
            for (var i=(Inv_Top-32)*Win_Width-1; i>=0; i--){
                if (Stage_Eff_Canvas.IG_pxl_color_index[i]==1){
                    /*switch(i%12){ // rainbow snow
                        case 0: b = 0xFF0000; break;
                        case 1: b = 0xFF7700; break;
                        case 2: b = 0xFFFF00; break;
                        case 3: b = 0x77FF00; break;
                        case 4: b = 0x00FF00; break;
                        case 5: b = 0x00FF77; break;
                        case 6: b = 0x00FFFF; break;
                        case 7: b = 0x0077FF; break;
                        case 8: b = 0x0000FF; break;
                        case 9: b = 0x7700FF; break;
                        case 10: b = 0xFF00FF; break;
                        case 11: b = 0xFF0077; break;
                    }
                    Game_Canvas[i] = b;*/
                    Game_Canvas[i] = 0xE8F0F8;
                }
            }
    }

    Indicators.INoutput();
    Display_Mode = 1;
    filledRect(4,4,8*(Stage_Names[Current_Stage].length+6)+8,20,0x80404040);
    Display_Mode = 0;
    // top left stage info UI
    if (Current_Stage==0 || Current_Stage==20 || Current_Stage==47 || Current_Stage==70 || Current_Stage==77)
        Large_Text.TXoutputB(8,8,Stage_Names[Current_Stage],0xFFFFFF,0x000000);
    else if (Current_Screen+1==Stage_Spawns[Current_Stage].length) // if this is the final screen
        Large_Text.TXoutputB(8,8,Stage_Names[Current_Stage]+": Boss",0xFFFFFF,0x000000);
    else
        Large_Text.TXoutputB(8,8,Stage_Names[Current_Stage]+": "+(Current_Screen+1),0xFFFFFF,0x000000);

    Display_Mode = 1;
    filledRect(Win_Width-56-4-8-80-4,4,56,20,0x80404040);
    Display_Mode = 0;
    Large_Text.TXoutputB(Win_Width-52-4-8-80-4,8,"Option",0xFFFFFF,0x000000); // options button (white default text)

    Display_Mode = 1;
    filledRect(Win_Width-80-4,4,80,20,0x80404040);
    Display_Mode = 0;
    Large_Text.TXoutputB(Win_Width-4-70-6,8,"World Map",0xFFFFFF,0x000000); // Word Map button (white default text)

    if (En_Count_From_Max>0){
        if (is_paused==0)
            En_Count_From_Max--;
        filledRect(196,10,120,12,0x303030); // HP bar max
        filledRect(196,10,floor(120*Target_HP_Current/Target_HP_Max),12,0x600000); // HP bar current
        if ((Stage_Status[Current_Stage]&Booked) > 0){
            centeredText(Small_Text,Win_Hcenter,16,""+Target_HP_Current+"/"+Target_HP_Max,0xFFFFFF,0x000000);
            Enemies.ENdrawIcon(Target_Array_ID,206,33,1);
            Small_Text.TXoutputB(216,25,"DROP",0xFFFFFF,0x000000);
            drop = 0;
            drop_slot = 0;
            for (var d=0; d<6; d+=2){
                drop = EN_Info[Target_Array_ID][En_Drop1+d];
                if (drop!=0){
                    Display_Mode2 = 2;
                    dispItem(Drop_Img,236+12*drop_slot,23,12,12,12*getVal(drop,Item_Ico_Sm),0,12,12,getVal(drop,Item_Color));
                    Display_Mode2 = 0;
                    drop_slot++;
                }
            }
            Small_Text.TXoutputB(276,25,"EXP "+enemyDeath(Enemies,Target_Array_ID,1),0xFFFFFF,0x000000);
        }
    }
    //centeredText(Small_Text,Mouse_Xpos,Mouse_Ypos-20,(Mouse_Xpos>>3)+", "+(Mouse_Ypos>>3),0xFFFFFF,0x000000); // display pixel coordinate
    //centeredText(Small_Text,Mouse_Xpos,Mouse_Ypos+20,""+((Mouse_Ypos>>3)*Terrain.TR_width+(Mouse_Xpos>>3)),0xFFFFFF,0x000000); // display pixel count
}
