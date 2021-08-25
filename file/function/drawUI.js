// draw weapon stats, shop, and gui stuff
window.fff = drawUI;
function drawUI(UI_mode){ // original name: Jf()
    Inv_Height = 128; // used to adjust tile drawing to fit above the inventory
    var column,row,L,T,xp_for_prev_LV,xp_for_next_LV,ring_count,revive_data,revival_cost,lp_data,str_data,dex_data,mag_data,displayed_equipment,item_class,type,type_param,MP_price,bat_MIN,bat_MAX,mini_ui_compo1,mini_ui_compo2,r,b,color,mouse_slot_pos,proxy,sold_item,sell_price;
    var inventory_colors = [0xCC9449,0x90A8B0,0x6E8038,0x747016,0xAC7754,0xCF8138,0xA7BFC9,0x607890,0x1D50AB,0x996600,0x667373,0x605550,0x605550];

    if (Left_Click_Is_Up && Mouse_Ypos>=Inv_Top)
        Mouse_Up = true;
    else if (Left_Click_Is_Up && Mouse_Ypos<Inv_Top)
        Mouse_Up = false;
    filledRect(0,Inv_Top+1,Win_Width,Inv_Height-2,inventory_colors[Stage_Spawns[Current_Stage][Current_Screen][0]]); // UI background
    Small_Text.TXoutputM(10,Win_Height-10,"(C) 2008 ha55ii DAN-BALL.jp",0,0,0,0,0,0,0,128,5,7);
    L = 10; // left margin
    T = Inv_Top+4;

    xp_for_prev_LV = 4753000;
    xp_for_next_LV = 9999999;
    if (LV[0] < 98){
        xp_for_prev_LV = 0;
        for (var l=1; l<LV[0]; l++)
            xp_for_prev_LV += 1000*l;
        xp_for_next_LV = xp_for_prev_LV+1000*l;
    }
    setRangersUI();
    if (UI_mode==2){
        antiCheatCheck();
        for (var s=0; s<Stickmen_Slots; s++){
            STR_Aura[s] = 0;
            DEX_Aura[s] = 0;
            MAG_Aura[s] = 0;
        }
        antiCheatSet();
    }
    if (Displayed_Object<Stickmen_Slots){ // if the displayed object is a ranger
        Large_Text.TXoutputB(L,T+0,Class_Name_List[getVal(Item_Inv[Stickmen_Slots+Displayed_Object],Item_Class_ID)],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(L,T+16,"LP  "+LP_Current[Displayed_Object]+"/"+LP_Max[Displayed_Object],0xFFFFFF,0x000000);

        if (Players.PL_class_ID[Displayed_Object] != Class_Dead){
            Large_Text.TXoutputB(L,T+28  ,"STR "+STR[Displayed_Object],0xFFFFFF,0x000000);
            Large_Text.TXoutputB(L,T+40  ,"DEX "+DEX[Displayed_Object],0xFFFFFF,0x000000);
            Large_Text.TXoutputB(L,T+52  ,"MAG "+MAG[Displayed_Object],0xFFFFFF,0x000000);
            Small_Text.TXoutputB(L,T+28+2,"              AT ",-1,0x000000);
            Small_Text.TXoutputB(L,T+40+2,"              AGI ",-1,0x000000);
            Small_Text.TXoutputB(L,T+52+2,"              RANGE ",-1,0x000000);
            Small_Text.TXoutputB(L,T+28+2,"                 "+AT_Min[Displayed_Object]+"-"+AT_Max[Displayed_Object],0x000000,-1);
            Small_Text.TXoutputB(L,T+40+2,"                  "+Agi_Min[Displayed_Object]+"-"+Agi_Max[Displayed_Object],0x000000,-1);
            Small_Text.TXoutputB(L,T+52+2,"                    "+Range[Displayed_Object],0,-1);

            if (Ranger_Class[Displayed_Object]==5){        // extra info for priests
                Small_Text.TXoutputB(L,T+64+2,"AURA          AURA",-1,0x000000);
                Small_Text.TXoutputB(L,T+64+2,"     (AT)"+STR[Displayed_Object]+"%",0x000000,-1);
                Small_Text.TXoutputB(L,T+64+2,"                   (DF)"+DEX[Displayed_Object]/5,0x000000,-1);
            } else if (Ranger_Class[Displayed_Object]==7){ // extra info for whippers
                Small_Text.TXoutputB(L,T+64+2,"              BULLET",-1,0x000000);
                Small_Text.TXoutputB(L,T+64+2,"                     +"+DEX[Displayed_Object]/5,0x000000,-1);
            } else if (Ranger_Class[Displayed_Object]==8){ // extra info for angels
                ring_count = 0;
                if (DEX[Displayed_Object]<10)
                    ring_count = 0+(DEX[Displayed_Object]-0)/10;
                else if (DEX[Displayed_Object]<30)
                    ring_count = 1+(DEX[Displayed_Object]-10)/20;
                else if (DEX[Displayed_Object]<60)
                    ring_count = 2+(DEX[Displayed_Object]-30)/30;
                else if (DEX[Displayed_Object]<100)
                    ring_count = 3+(DEX[Displayed_Object]-60)/40;
                else
                    ring_count = 4;
                Small_Text.TXoutputB(L,T+64+2,"              RING",-1,0x000000);
                Small_Text.TXoutputB(L,T+64+2,"                   +"+(""+ring_count).substring(0,5>(""+ring_count).length?(""+ring_count).length:5),0,-1);
            }
        }
        Large_Text.TXoutputB(L,T+76,"LV  "+LV[0],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(L,T+76,"        SP "+SP[Displayed_Object],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(L,T+88,"EXP "+Team_EXP+"("+floor(100*(Team_EXP-xp_for_prev_LV)/(xp_for_next_LV-xp_for_prev_LV))+"%)",0xFFFFFF,0x000000);
        Large_Text.TXoutputB(L,T+100,"$$$ "+Team_Gold,0xFFFFFF,0x000000);
        Small_Text.TXoutputB(L+105,T+100+2,"FP "+FP[0],-1,0x000000);

        if (Players.PL_class_ID[Displayed_Object]==Class_Dead){
            revive_data = "Revival $"+revival_cost;
            revival_cost = maxOf(floor(Team_Gold/10),10*LV[0]);
            Large_Text.TXoutputB(L,T+40,"Revival $"+revival_cost,0x808080,0x000000);
            if (isMouseHovered(L,T+40,8*revive_data.length,12)){
                Large_Text.TXoutputB(L,T+40,"Revival $"+revival_cost,0xFFFF00,0x000000);
                if (Mouse_Up && revival_cost<=Team_Gold && Clicked && LP_Current[0]+LP_Current[1]+LP_Current[2]+LP_Current[3]!=0){
                    antiCheatCheck();
                    LP_Current[Displayed_Object] += LP_Max[Displayed_Object]>>2;
                    Team_Gold -= revival_cost;
                    Players.PLadd(Displayed_Object,Players.PL_joint[Displayed_Object][0].x>>3,Players.PL_joint[Displayed_Object][0].y>>3);
                    antiCheatSet();
                }
            }
        } else if (SP[Displayed_Object] > 0){
            lp_data = "LP  "+LP_Current[Displayed_Object]+"/"+LP_Max[Displayed_Object];
            str_data = "STR "+STR[Displayed_Object];
            dex_data = "DEX "+DEX[Displayed_Object];
            mag_data = "MAG "+MAG[Displayed_Object];
            antiCheatCheck();
            if (isMouseHovered(L,T+16,8*lp_data.length+16,12)){
                if (Mouse_Up){
                    if (Clicked){
                        LP_SP[Displayed_Object]++;
                        SP[Displayed_Object]--;
                        rangerSPupIndicators(Displayed_Object,1);
                    }
                    Large_Text.TXoutputB(L,T+16,"LP  "+LP_Current[Displayed_Object]+"/"+LP_Max[Displayed_Object],0xFF0000,0x000000);
                }
            } else if (isMouseHovered(L,T+28,8*str_data.length+16,12)){
                if (Mouse_Up){
                    if (Clicked){
                        STR_SP[Displayed_Object]++;
                        SP[Displayed_Object]--;
                        rangerSPupIndicators(Displayed_Object,2);
                    }
                    Large_Text.TXoutputB(L,T+28,"STR "+STR[Displayed_Object],0xFF0000,0x000000);
                }
            } else if (isMouseHovered(L,T+40,8*dex_data.length+16,12)){
                if (Mouse_Up){
                    if (Clicked){
                        DEX_SP[Displayed_Object]++;
                        SP[Displayed_Object]--;
                        rangerSPupIndicators(Displayed_Object,3);
                    }
                    Large_Text.TXoutputB(L,T+40,"DEX "+DEX[Displayed_Object],0xFF0000,0x000000);
                }
            } else if (isMouseHovered(L,T+52,8*mag_data.length+16,12)){
                if (Mouse_Up){
                    if (Clicked){
                        MAG_SP[Displayed_Object]++;
                        SP[Displayed_Object]--;
                        rangerSPupIndicators(Displayed_Object,4);
                    }
                    Large_Text.TXoutputB(L,T+52,"MAG "+MAG[Displayed_Object],0xFF0000,0x000000);
                }
            }
            antiCheatSet();
            Large_Text.TXoutputB(L+8*lp_data.length,T+16," +",0xFF0000,0x000000);
            Large_Text.TXoutputB(L+8*str_data.length,T+28," +",0xFF0000,0x000000);
            Large_Text.TXoutputB(L+8*dex_data.length,T+40," +",0xFF0000,0x000000);
            Large_Text.TXoutputB(L+8*mag_data.length,T+52," +",0xFF0000,0x000000);
        }
    } else {
        displayed_equipment = Item_Inv[Displayed_Object];
        if ((Stickmen_Slots<<1)<=Displayed_Object && Displayed_Object<Stickmen_Slots*3)
            displayed_equipment = Comp1_Inv[Stickmen_Slots+Displayed_Object-8];
        if (Stickmen_Slots*3<=Displayed_Object && Displayed_Object<Stickmen_Slots*4)
            displayed_equipment = Comp2_Inv[Stickmen_Slots+Displayed_Object-12];
        itemText(L,T+0,Item_Catalogue[displayed_equipment][Item_Name]+" "+(Item_Catalogue[displayed_equipment][Item_LV]? Item_Catalogue[displayed_equipment][Item_LV] :""),0xFFFFFF,0x000000,-1);

        if (displayed_equipment!=0 && displayed_equipment!=Null_Slot){
            item_class = getVal(displayed_equipment,Item_Class_ID);
            if (item_class==Class_Compo){
                Large_Text.TXoutputB(L,T+16,"Compo Item",-1,0x000000);
                itemText(L,T+32,Item_Catalogue[displayed_equipment][Compo_Desc_1],0xFFFFFF,0,-1);
                itemText(L,T+44,Item_Catalogue[displayed_equipment][Compo_Desc_2],0xFFFFFF,0,-1);
            } else {
                Large_Text.TXoutputB(L,T+16,"AT "+Item_Catalogue[displayed_equipment][Item_AT_Min]+"-"+Item_Catalogue[displayed_equipment][Item_AT_Max],0xFFFFFF,0x000000);
                Large_Text.TXoutputB(L,T+28,"AGI "+Item_Catalogue[displayed_equipment][Weap_AGI_Min]+"-"+Item_Catalogue[displayed_equipment][Weap_AGI_Max],0xFFFFFF,0x000000);
                Large_Text.TXoutputB(L,T+40,"Range "+Item_Catalogue[displayed_equipment][Weap_Range],0xFFFFFF,0x000000);

                type = getVal(displayed_equipment,Item_Type);
                type_param = getVal(displayed_equipment,Item_Type_Para);
                MP_price = maxOf(getVal(displayed_equipment,Weap_MP_Price),0);
                bat_MIN = getVal(displayed_equipment,Item_BAT_Min);
                bat_MAX = getVal(displayed_equipment,Item_BAT_Max);

                if (type==1 || type==2 || type==3 || type==4 || type==5){
                    if (checkEff(Displayed_Object,Jewel_Ruby)){
                        bat_MIN += getEff(Displayed_Object,Eff1);
                        bat_MAX += getEff(Displayed_Object,Eff2);
                    }
                    if (checkEff(Displayed_Object,Jewel_Sapphire)){
                        bat_MIN += getEff(Displayed_Object,Eff1);
                        bat_MAX += getEff(Displayed_Object,Eff2);
                    }
                    if (checkEff(Displayed_Object,Jewel_Topaz)){
                        bat_MIN += getEff(Displayed_Object,Eff1);
                        bat_MAX += getEff(Displayed_Object,Eff2);
                    }
                    if (checkEff(Displayed_Object,Jewel_Emerald)){
                        bat_MIN += getEff(Displayed_Object,Eff1);
                        bat_MAX += getEff(Displayed_Object,Eff2);
                    }
                    if (checkEff(Displayed_Object,Jewel_Aquamarine))
                        type_param += getEff(Displayed_Object,Eff1);
                    if (checkEff(Displayed_Object,Jewel_Peridot))
                        type_param += getEff(Displayed_Object,Eff1);
                    if (checkEff(Displayed_Object,Jewel_Diamond))
                        type_param += getEff(Displayed_Object,Eff1);
                }

                // color type (inventory UI)
                type_desc = "";
                indent_space = "        "; // indent between MP and type parameters
                type_color = 0xFFFFFF;     // white
                physical = 0x959595;       // gray
                fire = 0xFF3333;           // red
                ice = 0x6C6CCB;            // blue
                thunder = 0xEDED00;        // yellow
                poison = 0x00FE00;         // green
                freeze = 0xCBCBFE;         // light blue

                switch (type){
                    case 0: type_desc = "Physical", type_color = physical; break;
                    case 1: type_desc = "Fire", type_color = fire; break;
                    case 2: type_desc = "Ice", type_color = ice; break;
                    case 3: type_desc = "Thunder", type_color = thunder; break;
                    case 4: type_desc = "Poison", type_color = poison; break;
                    case 5: type_desc = "Freeze", type_color = freeze; break;
                }
                Large_Text.TXoutputB(L,T+56,"Type: "+type_desc,type_color,0x000000);
                Large_Text.TXoutputB(L,T+68,"AT "+bat_MIN+"-"+bat_MAX,type_color,0x000000);

                if (item_class==6)
                    Large_Text.TXoutputB(L,T+80,"$$ "+MP_price,0xFFFF00,0x000000);
                else if (MP_price>0)
                    Large_Text.TXoutputB(L,T+80,"MP "+MP_price,0x6666FF,0x000000);

                if (item_class==4 || item_class==5)
                    indent_space = ""; // if weapon is an orb or a staff, do not add space for MP (because there is no MP cost)

                if (type==1){
                    if (getVal(displayed_equipment,Item_Res_Mode)!=0) // if there IS a residue mode, fire time = residue lifespan
                         fire_duration = getVal(displayed_equipment,Res_Lifespan);
                    else fire_duration = getVal(displayed_equipment,Proj_Lifespan); // if there is NOT a residue mode, fire time = projectile lifespan

                    Large_Text.TXoutputB(L,T+80,indent_space+"Time "+fire_duration/50+"s",type_color,0x000000); // display fire duration
                } else if (type==2){
                    Large_Text.TXoutputB(L,T+80,indent_space+"Slow "+type_param+"%",type_color,0x000000);    // display slow %
                } else if (type==4 || type==5){
                    Large_Text.TXoutputB(L,T+80,indent_space+"Time "+type_param/50+"s",type_color,0x000000); // display poison and freeze durations
                }

                filledRect(L+0,T+96,12,12,0x000000);
                filledRect(L+75,T+96,12,12,0x000000);
                Display_Mode2 = 2;
                dispItem(Drop_Img,L+0,T+96,12,12,12*getVal(Comp1_Inv[Displayed_Object],Item_Ico_Sm),0,12,12,getVal(Comp1_Inv[Displayed_Object],Item_Color));
                dispItem(Drop_Img,L+75,T+96,12,12,12*getVal(Comp2_Inv[Displayed_Object],Item_Ico_Sm),0,12,12,getVal(Comp2_Inv[Displayed_Object],Item_Color));
                Display_Mode2 = 0;
                mini_ui_compo1 = Item_Catalogue[Comp1_Inv[Displayed_Object]][Item_Name].substring(0,Item_Catalogue[Comp1_Inv[Displayed_Object]][Item_Name].length>8? 8 :Item_Catalogue[Comp1_Inv[Displayed_Object]][Item_Name].length)+" "+(Item_Catalogue[Comp1_Inv[Displayed_Object]][Item_LV]?Item_Catalogue[Comp1_Inv[Displayed_Object]][Item_LV]:"");
                Small_Text.TXoutputB(L+16,T+96+3,mini_ui_compo1,-1,0x000000);
                mini_ui_compo2 = Item_Catalogue[Comp2_Inv[Displayed_Object]][Item_Name].substring(0,Item_Catalogue[Comp2_Inv[Displayed_Object]][Item_Name].length>8? 8 :Item_Catalogue[Comp2_Inv[Displayed_Object]][Item_Name].length)+" "+(Item_Catalogue[Comp2_Inv[Displayed_Object]][Item_LV]?Item_Catalogue[Comp2_Inv[Displayed_Object]][Item_LV]:"");
                Small_Text.TXoutputB(L+75+16,T+96+3,mini_ui_compo2,-1,0x000000);
            }
        }
    }
    L = 192;
    T = Inv_Top+2+4+2+2+4+1; // margin + hp bar + margin + mp bar + margin + 1
    largeMessage(Small_Text,L-17,T+3+8,"PLAYER",0,0,0,0,0,0,0,128,5,7);
    largeMessage(Small_Text,L-17,T+31+8,"WEAPON",0,0,0,0,0,0,0,128,5,7);
    largeMessage(Small_Text,L-18,T+56+12,"COMPO",0,0,0,0,0,0,0,128,5,7);
    largeMessage(Small_Text,L-18,T+84+12,"COMPO",0,0,0,0,0,0,0,128,5,7);

    for (var s=0; s<Stickmen_Slots; s++){
        filledRect(L+32*s,T-12,24,4,0x000000);                                // HP bar background
        if (LP_Current[s]==0)
            filledRect(L+32*s,T-12,24,4,0x303030);                            // greyed-out HP bar for dead stickmen
        filledRect(L+32*s,T-12,floor(24*LP_Current[s]/LP_Max[s]),4,0x990000); // HP bar

        MP_price = maxOf(getVal(Item_Inv[Stickmen_Slots+s],Weap_MP_Price),1);
        item_class = getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID);
        if (item_class!=4 && item_class!=5 && item_class!=6) // don't draw MP bar for non MP users
            filledRect(L+32*s,T-6,floor(23*MP_Bar[s]/MP_price)+1,2,0x000080); // MP bar
        if (item_class==2 && getVal(Item_Inv[Stickmen_Slots+s],41)>50){ // output energy bar for activated swords
            r = 255-floor(Players.PL_gladr_resid_count[s]/getVal(Item_Inv[Stickmen_Slots+s],41)*255);
            b = floor(Players.PL_gladr_resid_count[s]/getVal(Item_Inv[Stickmen_Slots+s],41)*255);
            color = r<<16|b;
            filledRect(L+32*s,T-7,floor(23*Players.PL_gladr_resid_count[s]/getVal(Item_Inv[Stickmen_Slots+s],41))+1,1,color); // powered sword bar current
            filledRect(L+32*s,T-4,floor(23*Players.PL_gladr_resid_count[s]/getVal(Item_Inv[Stickmen_Slots+s],41))+1,1,color); // powered sword bar current
        }

        filledRect(L+32*s,T+0,24,24,0x000000);      // stickman slots
        filledRect(L+32*s,T+28,24,24,0x000000);     // weapon slots
        if (restrictSlots(s,0))
            filledRect(L+32*s,T+56,24,24,0x000000); // compo slot 1
        if (restrictSlots(s,1))
            filledRect(L+32*s,T+84,24,24,0x000000); // compo slot 2

        dispItem(Player_Img,L+32*s,T,24,24,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),0,24,24,0xFFFFFFFF);
        colorPortraitWeap(L+32*s,T,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),getVal(Item_Inv[Stickmen_Slots+s],Item_Color));
        Display_Mode2 = 2;
        dispItem(Item_Img,L+32*s,T+28,24,24,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Ico_Big),0,24,24,getVal(Item_Inv[Stickmen_Slots+s],Item_Color));
        if (restrictSlots(s,0))
            dispItem(Item_Img,L+32*s,T+56,24,24,24*getVal(Comp1_Inv[Stickmen_Slots+s],Item_Ico_Big),0,24,24,getVal(Comp1_Inv[Stickmen_Slots+s],Item_Color));
        if (restrictSlots(s,1))
            dispItem(Item_Img,L+32*s,T+84,24,24,24*getVal(Comp2_Inv[Stickmen_Slots+s],Item_Ico_Big),0,24,24,getVal(Comp2_Inv[Stickmen_Slots+s],Item_Color));
        Display_Mode2 = 0;
        if (Item_Catalogue[Item_Inv[Stickmen_Slots+s]][Item_LV])
            Small_Text.TXoutputB(L+32*s+19,T+28+17,""+Item_Catalogue[Item_Inv[Stickmen_Slots+s]][Item_LV],0xFFFFFF,-1);
        if (Item_Catalogue[Comp1_Inv[Stickmen_Slots+s]][Item_LV] && restrictSlots(s,0))
            Small_Text.TXoutputB(L+32*s+19,T+56+17,""+Item_Catalogue[Comp1_Inv[Stickmen_Slots+s]][Item_LV],0xFFFFFF,-1);
        if (Item_Catalogue[Comp2_Inv[Stickmen_Slots+s]][Item_LV] && restrictSlots(s,1))
            Small_Text.TXoutputB(L+32*s+19,T+84+17,""+Item_Catalogue[Comp2_Inv[Stickmen_Slots+s]][Item_LV],0xFFFFFF,-1);
    }

    outlineRect(L+32*Selected_Player-1,T-1,26,26,0xFF0000);
    L = 344;
    T = Inv_Top+2+4+2+2+4+1; // margin + hp bar + margin + mp bar + margin + 1
    //Large_Text.TXoutputB(L,T-12,"Inventory",0xFFFFFF,0x000000); testing
    for (var i=0; i<Inv_Last-Inv_First; i++){
        filledRect(L+i%6*28,T+28*floor(i/6),24,24,0x000000);
        Display_Mode2 = 2;
        dispItem(Item_Img,L+i%6*28,T+28*floor(i/6),24,24,24*getVal(Item_Inv[Inv_First+i],Item_Ico_Big),0,24,24,getVal(Item_Inv[Inv_First+i],Item_Color));
        Display_Mode2 = 0;
        if (Item_Catalogue[Item_Inv[Inv_First+i]][Item_LV])
            Small_Text.TXoutputB(L+i%6*28+19,T+28*floor(i/6)+17,""+Item_Catalogue[Item_Inv[Inv_First+i]][Item_LV],0xFFFFFF,-1);
    }
    mouse_slot_pos = -1;
    L = 192;
    T = Inv_Top+2+4+2+2+4+1; // margin + hp bar + margin + mp bar + margin + 1
    if (isMouseHovered(L-4,T-4,128,112) && Mouse_Up){ // red background when hoving over stickmen, equipped weapon slots, and eqiupped compo slots
        column = (Mouse_Xpos-L+4)>>5;
        row = floor((Mouse_Ypos-T+4)/28);
        mouse_slot_pos = 4*row+column;
        backgroundFill(L+32*column,T+28*row,24,24,0x800000);
    }
    L = 344;
    T = Inv_Top+2+4+2+2+4+1; // margin + hp bar + margin + mp bar + margin + 1
    if (isMouseHovered(L-4,T-4,168,112) && Mouse_Up){ // red background when hoving over inventory slots
        column = floor((Mouse_Xpos-L+4)/28);
        row = floor((Mouse_Ypos-T+4)/28);
        mouse_slot_pos = Inv_First+6*row+column;
        backgroundFill(L+28*column,T+28*row,24,24,0x800000);
    }
    antiCheatCheck();
    if (0<=mouse_slot_pos && mouse_slot_pos<Stickmen_Slots && Item_Inv[Inv_Last]==0 && Clicked){
        Selected_Player = mouse_slot_pos;
    } else if (Stickmen_Slots<=mouse_slot_pos && mouse_slot_pos<Stickmen_Slots<<1 && Clicked){
        if ((Item_Inv[Inv_Last]==0 || Ranger_Class[mouse_slot_pos-4]==getVal(Item_Inv[Inv_Last],Item_Class_ID)) && restrictSlots(mouse_slot_pos-4,0)){
            proxy = Item_Inv[mouse_slot_pos];
            Item_Inv[mouse_slot_pos] = Item_Inv[Inv_Last];
            Item_Inv[Inv_Last] = proxy;
            proxy = Comp1_Inv[mouse_slot_pos];
            Comp1_Inv[mouse_slot_pos] = Comp1_Inv[Inv_Last];
            Comp1_Inv[Inv_Last] = proxy;
            proxy = Comp2_Inv[mouse_slot_pos];
            Comp2_Inv[mouse_slot_pos] = Comp2_Inv[Inv_Last];
            Comp2_Inv[Inv_Last] = proxy;
            MP_Bar[mouse_slot_pos-4] = 0;
            Players.PL_gladr_resid_count[mouse_slot_pos-4] = 0;
        }
    } else if ((Stickmen_Slots<<1)<=mouse_slot_pos && mouse_slot_pos<Stickmen_Slots*3 && Clicked){ // compo row 1
        if (getVal(Item_Inv[Inv_Last],Item_Class_ID)==Class_Compo && restrictSlots(mouse_slot_pos-8,0)){
            Comp1_Inv[Stickmen_Slots+mouse_slot_pos-(Stickmen_Slots<<1)] = Item_Inv[Inv_Last];
            Item_Inv[Inv_Last] = 0;
            Comp1_Inv[Inv_Last] = 0;
            Comp2_Inv[Inv_Last] = 0;
            MP_Bar[mouse_slot_pos-(Stickmen_Slots<<1)] = 0;
        }
    } else if (Stickmen_Slots*3<=mouse_slot_pos && mouse_slot_pos<Stickmen_Slots*4 && Clicked){ // compo row 2
        if (getVal(Item_Inv[Inv_Last],Item_Class_ID)==Class_Compo && restrictSlots(mouse_slot_pos-12,1)){
            Comp2_Inv[Stickmen_Slots+mouse_slot_pos-Stickmen_Slots*3] = Item_Inv[Inv_Last];
            Item_Inv[Inv_Last] = 0;
            Comp1_Inv[Inv_Last] = 0;
            Comp2_Inv[Inv_Last] = 0;
            MP_Bar[mouse_slot_pos-Stickmen_Slots*3] = 0;
        }
    } else if (Inv_First<=mouse_slot_pos && mouse_slot_pos<Inv_Last && Clicked){ // inventory
        if (Click_To_Sell_Mode==1 && Item_Inv[mouse_slot_pos]!=0){
            sold_item = getVal(Item_Inv[mouse_slot_pos],Item_Buy_Price)>>3;
            if (Clicked){
                Drops.DPadd(40,200,1,sold_item,0);
                Item_Inv[mouse_slot_pos] = 0;
                Comp1_Inv[mouse_slot_pos] = 0;
                Comp2_Inv[mouse_slot_pos] = 0;
            }
        } else {
            UI_mode = Item_Inv[mouse_slot_pos];
            Item_Inv[mouse_slot_pos] = Item_Inv[Inv_Last];
            Item_Inv[Inv_Last] = UI_mode;
            UI_mode = Comp1_Inv[mouse_slot_pos];
            Comp1_Inv[mouse_slot_pos] = Comp1_Inv[Inv_Last];
            Comp1_Inv[Inv_Last] = UI_mode;
            UI_mode = Comp2_Inv[mouse_slot_pos];
            Comp2_Inv[mouse_slot_pos] = Comp2_Inv[Inv_Last];
            Comp2_Inv[Inv_Last] = UI_mode;
        }
    } else if (mouse_slot_pos==-1 && Item_Inv[Inv_Last]!=0 && Clicked && Mouse_Ypos<Inv_Top && UI_mode==0){ // drop item out of inventory
        Drops.DPadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,Item_Inv[Inv_Last],Comp1_Inv[Inv_Last],Comp2_Inv[Inv_Last]);
        Item_Inv[Inv_Last] = 0;
        Comp1_Inv[Inv_Last] = 0;
        Comp2_Inv[Inv_Last] = 0;
    }
    antiCheatSet();
    if (mouse_slot_pos==-1)
         Displayed_Object = Selected_Player;
    else Displayed_Object = mouse_slot_pos;
    if (Item_Inv[Inv_Last]!=0){
        Display_Mode2 = 2;
        dispItemCentered(Item_Img,Mouse_Xpos,Mouse_Ypos,24,24,24*getVal(Item_Inv[Inv_Last],Item_Ico_Big),0,24,24,getVal(Item_Inv[Inv_Last],Item_Color));
        Display_Mode2 = 0;
    }
    if (Click_To_Sell_Mode==1){
        column = clamp(Mouse_Xpos,56,Win_Width-56);
        row = clamp(Mouse_Ypos-8,10,Win_Height-10);
        if (Inv_First<=mouse_slot_pos && mouse_slot_pos<Inv_Last){
            sell_price = getVal(Item_Inv[mouse_slot_pos],Item_Buy_Price)>>3;
            centeredText(Large_Text,column,row,"$"+sell_price+" Sell",0xFFFFFF,0x000000);
        } else {
            centeredText(Large_Text,column,row,"Click to sell",0xFFFFFF,0x000000);
        }
    }
}
