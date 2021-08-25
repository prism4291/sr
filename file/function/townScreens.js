// book
window.fff = townScreens;
function townScreens(){ // original name: wf()
    var screen_intro_text2,opacity1,start_pos;
    var inn_cost;
    var town_stage,shop_tabs,shop_left,shop_top,x,y,item_cell,shop_item,latest_unlock,type,type_para,MP_price,BAT_min,BAT_max,type_desc,type_color,physical,fire,ice,thunder,poison,freeze,r,b,buy_price,second_slot,arrow_color,sell_price;
    var rows_per_page,book_enemy,book_drop,entry_cost,page_title,book_stage,nxt_stge_en,book_column;
    var forget_cost,forget_left,forget_top;

    if (Sequence_Step==50 && Terrain.TRset(Current_Stage)){                               // Sequence: load town screen
        Players.PLadd(0,16,Terrain.TR_low_surface[16]);
        Players.PLadd(1,19,Terrain.TR_low_surface[19]);
        Players.PLadd(2,22,Terrain.TR_low_surface[22]);
        Players.PLadd(3,25,Terrain.TR_low_surface[25]);
        Enemies.ENreset(1);
        Projectiles.PJ_index = 0;
        Indicators.IN_index = 0;
        Drops.DP_index = 0;
        Text_Fade = Sign_Touched_Mode = Target_Array_ID = En_Count_From_Max = Target_HP_Max = Target_HP_Current = Drops.DP_log = 0;
        Sequence_Step++;
    } else if (Sequence_Step==51){                                                    // Sequence: fade in town screen
        drawStage(0);
        drawUI(0);
        screen_intro_text2 = "";
        switch (Current_Stage){ // text when entering stages
            case 0: screen_intro_text2 = "Town"; break;
            case 20: screen_intro_text2 = "Village"; break;
            case 47: screen_intro_text2 = "Resort"; break;
            case 70: screen_intro_text2 = "Forget Tree"; break;
            case 77: screen_intro_text2 = "Island"; break;
        }

        screenTransition(0xFF-floor(0xFF*(30>Text_Fade? Text_Fade :30)/30));
        opacity1 = 0xFF;
        if (Text_Fade<30)
            opacity1 = floor(0xFF*Text_Fade/30);
        else if (Text_Fade>80)
            opacity1 = 0xFF-floor(0xFF*(Text_Fade-80)/30);

        largeMessage(Large_Text,Win_Hcenter,128,screen_intro_text2,0xFF,0xFF,0xFF,opacity1,64,64,64,opacity1,16,24);
        start_pos = -1024+floor(512*Text_Fade/30);
        drawLine(start_pos,112,start_pos+1024,112,0x808080);
        start_pos = 512-floor(512*Text_Fade/30);
        drawLine(start_pos,141,start_pos+1024,141,0x808080);
        Text_Fade++;
        //Text_Fade = 110; // skip fade-in for testing
        if (Text_Fade==110){
            Text_Fade = 0;
            Sequence_Step++;
        }
    } else if (Sequence_Step==52){                                                    // Sequence: play town screen
        drawStage(0);
        drawUI(0);
        if (Sign_Touched_Mode!=0){
            Sequence_Step = 59;
        } else if (isMouseHovered(Win_Width-56-4-8-80-4,4,56,20)){
            if (Clicked)
                Sequence_Step = 20;
            else if (Is_Key_Pressed1[32]) // spacebar
                Sequence_Step = 20;
            Large_Text.TXoutputB(Win_Width-52-4-8-80-4,8,"Option",0xFF0000,0x000000); // options button (red highlight while in town type stages)
        } else if (Is_Key_Pressed1[32]){ // spacebar
            Sequence_Step = 20;
        } else if (isMouseHovered(Win_Width-80-4,4,80,20)){
            if (Clicked)
                Sequence_Step = 6;
            Large_Text.TXoutputB(Win_Width-4-70-6,8,"World Map",0xFF0000,0x000000); // World Map button (red highlight while in town type stages)
        } else if (Current_Stage==70){
            if (isMouseHoveredCenter(Win_Hcenter,128,40,24)){
                centeredText(Large_Text,Win_Hcenter,128,"Forget",0xFF0000,0x101814);
                if (Clicked){
                    Sequence_Step = 55;
                    Menu_Column = Menu_Row = Menu_Entry = 0;
                }
            } else if (isMouseHoveredCenter(Win_Hcenter,160,40,24)){
                inn_cost = 0;
                for (var s=0; s<Stickmen_Slots; s++)
                    inn_cost += LP_Max[s]-LP_Current[s];

                centeredText(Large_Text,Win_Hcenter,160,"Inn",0xFF0000,0x101814); // red text at forget tree
                Large_Text.TXoutputB(280,154,"heal team $"+inn_cost,0xFF0000,0x101814); // text at forget tree

                if (inn_cost<=Team_Gold && Clicked){ // restore health
                    antiCheatCheck();
                    for (var s=0; s<Stickmen_Slots; s++){
                        if (LP_Current[s]!=LP_Max[s]){
                            Indicators.INadd(Players.PL_joint[s][0].x,Players.PL_joint[s][0].y,0,LP_Max[s]-LP_Current[s],0x00FF00);
                            LP_Current[s] = LP_Max[s];
                        }
                    }
                    Team_Gold -= inn_cost;
                    antiCheatSet();
                }
            } else if (isMouseHoveredCenter(Win_Hcenter,184,48,24)){
                centeredText(Large_Text,Win_Hcenter,184,"Book",0xFF0000,0x101814);
                if (Clicked){
                    Sequence_Step = 54;
                    Menu_Column = Menu_Row = Menu_Entry = 0;
                }
            }
        } else if (isMouseHoveredCenter(400,168,40,24)){
            inn_cost = 0;
            for (var s=0; s<Stickmen_Slots; s++)
                inn_cost += LP_Max[s]-LP_Current[s]; // add up inn cost

            centeredText(Large_Text,400,168,"Inn",0xFF0000,0xD2953A); // red text at town type stages
            centeredText(Large_Text,400,208,"heal team $"+inn_cost,0xFFFFFF,0x311F1D); // text at town type stages

            if (inn_cost<=Team_Gold && Clicked){ // inn function
                antiCheatCheck();
                for (var s=0; s<Stickmen_Slots; s++){
                    if (LP_Current[s] != LP_Max[s]){
                        Indicators.INadd(Players.PL_joint[s][0].x,Players.PL_joint[s][0].y,0,LP_Max[s]-LP_Current[s],0x00FF00); // output LP restoration
                        LP_Current[s] = LP_Max[s]; // restore LP
                    }
                }
                Team_Gold -= inn_cost;
                antiCheatSet();
            }
        } else if (isMouseHoveredCenter(40,152,72,24)){
            if (Current_Stage==0)
                centeredText(Large_Text,40,152,"Shop",0xFF0000,0xD2953A);
            else if (Current_Stage==20)
                centeredText(Large_Text,40,152," Compo Shop",0xFF0000,0xD2953A);
            else if (Current_Stage==47)
                centeredText(Large_Text,40,152," Junk Shop",0xFF0000,0xD2953A);
            else if (Current_Stage==77)
                centeredText(Large_Text,40,152," Compo Shop",0xFF0000,0xD2953A);

            if (Clicked){
                Sequence_Step = 53;
                Menu_Column = Menu_Row = Menu_Entry = 0;
            }
        } else if (isMouseHoveredCenter(40,184,48,24)){
            centeredText(Large_Text,40,184,"Book",0xFF0000,0xD2953A);
            if (Clicked){
                Sequence_Step = 54;
                Menu_Column = Menu_Row = Menu_Entry = 0;
            }
        }
    } else if (Sequence_Step==53){                                                    // Sequence: open shop
        drawStage(0);
        Sign_Touched_Mode = 0;

        switch (Current_Stage){
            case 0: town_stage = 0; break;
            case 20: town_stage = 1; break;
            case 47: town_stage = 2; break;
            case 77: town_stage = 3; break;
        }
        shop_tabs = [
            [3,4,5,6 ,12,14,15,18], // icons for shop tabs
            [7,8,9,10,11,16,17],    // icons for compo shop tabs
            [3,4,5,6 ,12,14,15,18], // icons for resort tabs
            [7,8,9,10,11,16,17]     // icons for combo shop tabs
        ];
        shop_left = 80; // top left corner of shop window
        shop_top = 28;
        Display_Mode = 1;
        filledRect(shop_left-4,shop_top-4,243,168,0x80000000);
        Display_Mode = 0;
        outlineRect(shop_left+0,shop_top+0,236,161,0xFFFFFF);

        if (isMouseHovered(shop_left+8,shop_top+4,16*shop_tabs[town_stage].length,12)){
            x = (Mouse_Xpos-(shop_left+8))>>4;
            if (Clicked){
                Menu_Column = x;
                Menu_Row = clamp(Menu_Row,0,floor(Shop_Items[town_stage][Menu_Column].length/3)-1);
            }
            filledRect(shop_left+8+16*x,shop_top+4,12,12,0x990000);
        }

        Display_Mode2 = 2;
        for (var i=0; i<shop_tabs[town_stage].length; i++)
            dispItem(Drop_Img,shop_left+8+16*i,shop_top+4,12,12,12*shop_tabs[town_stage][i],0,12,12,0xFFFFFFFF); // tab icons in shop
        Display_Mode2 = 0;
        outlineRect(shop_left+8+16*Menu_Column-1,shop_top+4-1,14,14,0x990000);
        drawLine(shop_left+0,shop_top+20-1,shop_left+235,shop_top+20-1,0xFFFFFF);

        if (isMouseHovered(shop_left+120,shop_top+24,84,84)){
            x = floor((Mouse_Xpos-(shop_left+120))/28);
            y = floor((Mouse_Ypos-(shop_top+24))/28);
            if (Clicked){
                Menu_Entry = 3*y+x;
            }
            filledRect(shop_left+120+28*x,shop_top+24+28*y,24,24,0x990000);
        }

        item_cell = (3*Menu_Row+Menu_Entry) % Shop_Items[town_stage][Menu_Column].length;
        shop_item = Shop_Items[town_stage][Menu_Column][item_cell];
        latest_unlock = 1;
        for (var s=0; s<Stage_Count; s++){
            if ((Stage_Status[s]&Beaten)>0 && Shop_Reqs[s]>latest_unlock)
                latest_unlock = Shop_Reqs[s];
        }
        if (Current_Stage==0 && item_cell>=latest_unlock)
            shop_item = 0;
        itemText(shop_left+8,shop_top+24,Item_Catalogue[shop_item][Item_Name]+" "+(Item_Catalogue[shop_item][Item_LV]? Item_Catalogue[shop_item][Item_LV] :""),-1,0x282828,-2);
        itemText(shop_left+8,shop_top+24,Item_Catalogue[shop_item][Item_Name]+" "+(Item_Catalogue[shop_item][Item_LV]? Item_Catalogue[shop_item][Item_LV] :""),0xFFFFFF,-1,-2);
        UI_weapClass = getVal(shop_item,Item_Class_ID);
        if (UI_weapClass==Class_Compo){
            Large_Text.TXoutputB(shop_left+8,shop_top+40,"Compo Item",-1,0x505050);
            itemText(shop_left+8,shop_top+56,Item_Catalogue[shop_item][Compo_Desc_1],-1,0x282828,-2);
            itemText(shop_left+8,shop_top+56,Item_Catalogue[shop_item][Compo_Desc_1],0xFFFFFF,-1,-2);
            itemText(shop_left+8,shop_top+68,Item_Catalogue[shop_item][Compo_Desc_2],-1,0x282828,-2);
            itemText(shop_left+8,shop_top+68,Item_Catalogue[shop_item][Compo_Desc_2],0xFFFFFF,-1,-2);
        } else {
            Large_Text.TXoutputB(shop_left+8,shop_top+40,"AT "+Item_Catalogue[shop_item][Item_AT_Min]+"-"+Item_Catalogue[shop_item][Item_AT_Max],0xFFFFFF,0x000000);
            Large_Text.TXoutputB(shop_left+8,shop_top+52,"AGI "+Item_Catalogue[shop_item][Weap_AGI_Min]+"-"+Item_Catalogue[shop_item][Weap_AGI_Max],0xFFFFFF,0x000000);
            Large_Text.TXoutputB(shop_left+8,shop_top+64,"Range "+Item_Catalogue[shop_item][Weap_Range],0xFFFFFF,0x000000);

            type = getVal(shop_item,Item_Type);
            type_para = getVal(shop_item,Item_Type_Para);
            MP_price = maxOf(getVal(shop_item,Weap_MP_Price),0);
            BAT_min = getVal(shop_item,Item_BAT_Min);
            BAT_max = getVal(shop_item,Item_BAT_Max);

            // color type (shop UI)
            type_desc = "";
            type_color = 0xFFFFFF; // white
            physical = 0x959595;   // gray
            fire = 0xFF3333;       // red
            ice = 0x6C6CCB;        // blue
            thunder = 0xEDED00;    // yellow
            poison = 0x00FE00;     // green
            freeze = 0xCBCBFE;     // light blue

            switch (type){
                case 0: type_desc = "Physical", type_color = physical; break;
                case 1: type_desc = "Fire", type_color = fire; break;
                case 2: type_desc = "Ice", type_color = ice; break;
                case 3: type_desc = "Thunder", type_color = thunder; break;
                case 4: type_desc = "Poison", type_color = poison; break;
                case 5: type_desc = "Freeze", type_color = freeze; break;
            }
            Large_Text.TXoutputB(shop_left+8,shop_top+80,"Type: "+type_desc,type_color,0x000000);
            Large_Text.TXoutputB(shop_left+8,shop_top+92,"AT "+BAT_min+"-"+BAT_max,type_color,0x000000);

            if (UI_weapClass==6)
                Large_Text.TXoutputB(shop_left+8,shop_top+104,"$$ "+MP_price,0xFFFFFF,0x000000); // if weapon is a gun, display "$$" instead of "MP"
            else if (MP_price>0)
                Large_Text.TXoutputB(shop_left+8,shop_top+104,"MP "+MP_price,0xFFFFFF,0x000000); // only display MP if there is a MP cost

            if (type==1 || type==4 || type==5){
                if (type==1){
                    if (getVal(shop_item,Item_Res_Mode)!=0) // if there IS a residue mode, fire time = residue lifespan
                         type_para = getVal(shop_item,Res_Lifespan);
                    else type_para = getVal(shop_item,Proj_Lifespan); // if there is NOT a residue mode, fire time = projectile lifespan
                }
                Large_Text.TXoutputB(shop_left+8,shop_top+116,"Time "+type_para/50+"s",type_color,0x000000); // display fire, poison, and freeze durations
            } else if (type==2){
                Large_Text.TXoutputB(shop_left+8,shop_top+116,"Slow "+type_para+"%",type_color,0x000000); // display slow %
            }
        }
        for (var i=0; i<9; i++){
            r = (3*Menu_Row+i) % Shop_Items[town_stage][Menu_Column].length;
            if (Current_Stage!=0 || latest_unlock>r){
                Display_Mode2 = 2;
                dispItem(Item_Img,shop_left+120+i%3*28,shop_top+24+28*floor(i/3),24,24,24*getVal(Shop_Items[town_stage][Menu_Column][r],Item_Ico_Big),0,24,24,getVal(Shop_Items[town_stage][Menu_Column][r],Item_Color)); // icon of item in shop
                Display_Mode2 = 0;

                if (Item_Catalogue[Shop_Items[town_stage][Menu_Column][r]][Item_LV])
                    Small_Text.TXoutputB(shop_left+120+i%3*28+19,shop_top+24+28*floor(i/3)+17,""+Item_Catalogue[Shop_Items[town_stage][Menu_Column][r]][Item_LV],0xFFFFFF,-1); // tier number next to item in shop
            }
        }
        outlineRect(shop_left+120+Menu_Entry%3*28,shop_top+24+28*floor(Menu_Entry/3),24,24,0x990000);
        buy_price = getVal(shop_item,Item_Buy_Price);
        if (town_stage==2 && item_cell==1)
            buy_price *= 10;
        if (isMouseHovered(shop_left+176-56,shop_top+120-10,108,20)){
            if (shop_item!=0 && Team_Gold>=buy_price && Clicked){
                antiCheatCheck();
                second_slot = 0;
                if (town_stage==0 || town_stage==2 && item_cell==0)
                    second_slot = Null_Slot;
                Drops.DPadd(40,200,shop_item,0,second_slot);
                Team_Gold -= buy_price;
                antiCheatSet();
            }
            filledRect(shop_left+176-56,shop_top+120-10,108,20,0x990000);
        }
        centeredText(Large_Text,shop_left+176,shop_top+120,"$"+buy_price+" Buy",0xFFFFFF,0x000000);
        outlineRect(shop_left+176-56,shop_top+120-10,108,20,0x990000);
        arrow_color = 0xFFFFFF;

        if (isMouseHovered(shop_left+216-12,shop_top+36-12,24,24)){
            if (Clicked)
                Menu_Row = cycle(Menu_Row-1,0,floor(Shop_Items[town_stage][Menu_Column].length/3)-1);
            arrow_color = 0x990000; // up arrow when hoving over
        }

        outlineRect(shop_left+216-12,shop_top+36-12,24,24,0xFFFFFF);
        filledRect(shop_left+216-1,shop_top+36-8,2,2,arrow_color);
        filledRect(shop_left+216-2,shop_top+36-6,4,2,arrow_color);
        filledRect(shop_left+216-3,shop_top+36-4,6,2,arrow_color);
        filledRect(shop_left+216-4,shop_top+36-2,8,2,arrow_color);
        filledRect(shop_left+216-5,shop_top+36+0,10,2,arrow_color);
        filledRect(shop_left+216-6,shop_top+36+2,12,2,arrow_color);
        filledRect(shop_left+216-7,shop_top+36+4,14,2,arrow_color);
        filledRect(shop_left+216-8,shop_top+36+6,16,2,arrow_color);
        arrow_color = 0xFFFFFF; // down arrow in shop

        if (isMouseHovered(shop_left+216-12,shop_top+92-12,24,24)){
            if (Clicked)
                Menu_Row = cycle(Menu_Row+1,0,floor(Shop_Items[town_stage][Menu_Column].length/3)-1);
            arrow_color = 0x990000; // down arrow when hoving over
        }

        outlineRect(shop_left+216-12,shop_top+92-12,24,24,0xFFFFFF);
        filledRect(shop_left+216-8,shop_top+92-8,16,2,arrow_color);
        filledRect(shop_left+216-7,shop_top+92-6,14,2,arrow_color);
        filledRect(shop_left+216-6,shop_top+92-4,12,2,arrow_color);
        filledRect(shop_left+216-5,shop_top+92-2,10,2,arrow_color);
        filledRect(shop_left+216-4,shop_top+92+0,8,2,arrow_color);
        filledRect(shop_left+216-3,shop_top+92+2,6,2,arrow_color);
        filledRect(shop_left+216-2,shop_top+92+4,4,2,arrow_color);
        filledRect(shop_left+216-1,shop_top+92+6,2,2,arrow_color);
        drawLine(shop_left+0,shop_top+136-1,shop_left+235,shop_top+136-1,0xFFFFFF);
        drawLine(shop_left+120,shop_top+136-1,shop_left+120,shop_top+160,0xFFFFFF);

        if (isMouseHovered(shop_left+0+1,shop_top+136,120,24) && Item_Inv[Inv_Last]!=0){ // hovering over click/drag to sell with something held
            sell_price = getVal(Item_Inv[Inv_Last],Item_Buy_Price)>>3;
            if (Clicked){                                                // sell held item
                antiCheatCheck();
                Drops.DPadd(40,200,1,sell_price,0);
                Item_Inv[Inv_Last] = 0;
                Comp1_Inv[Inv_Last] = 0;
                Comp2_Inv[Inv_Last] = 0;
                antiCheatSet();
            }
            filledRect(shop_left+0+1,shop_top+136,119,24,0x990000);
            centeredText(Large_Text,shop_left+60,shop_top+148,"$"+sell_price+" Sell",0xFFFFFF,0x000000);
        } else if (isMouseHovered(shop_left+0+1,shop_top+136,120,24) && Item_Inv[Inv_Last]==0 && Click_To_Sell_Mode==0){ // hovering over click/drag to sell with nothing held
            if (Clicked)
                Click_To_Sell_Mode = 1;
            filledRect(shop_left+0+1,shop_top+136,119,24,0x990000);
            centeredText(Large_Text,shop_left+60,shop_top+148,"Click to sell",0xFFFFFF,0x000000);
        } else if (isMouseHovered(shop_left+0+1,shop_top+136,120,24) && Item_Inv[Inv_Last]==0 && Click_To_Sell_Mode==1){ // hovering over cancel
            if (Clicked)
                Click_To_Sell_Mode = 0;
            filledRect(shop_left+0+1,shop_top+136,119,24,0x990000);
            centeredText(Large_Text,shop_left+60,shop_top+148,"Cancel",0xFFFFFF,0x000000);
        } else if (Click_To_Sell_Mode==1){                                                // in click to sell mode
            centeredText(Large_Text,shop_left+60,shop_top+148,"Cancel",0xFFFFFF,0x000000);
        } else {
            centeredText(Large_Text,shop_left+60,shop_top+148,"Drag to sell",0xFFFFFF,0x000000);
        }
        if (isMouseHovered(shop_left+120+1,shop_top+136,114,24)){
            if (Clicked){
                Click_To_Sell_Mode = 0;
                Sequence_Step = 52;
            }
            filledRect(shop_left+120+1,shop_top+136,114,24,0x990000);
        }
        centeredText(Large_Text,shop_left+176,shop_top+148,"Exit",0xFFFFFF,0x000000);
        drawUI(1);
    } else if (Sequence_Step==54){                                                    // Sequence: open book
        drawStage(0);
        Sign_Touched_Mode = 0; // prevent rangers from exiting if placed at a sign while book is open
        rows_per_page = 10;
        book_left = 80;
        book_top = 28;
        Display_Mode = 1;
        book_enemy = 0;
        book_drop = 0;
        entry_cost = 0;
        if (Current_Stage==70)
             filledRect(book_left-4,book_top-4,328,168,0xCC000000);
        else filledRect(book_left-4,book_top-4,328,168,0x80000000);
        Display_Mode = 0;
        outlineRect(book_left+0,book_top+0,321,161,0xFFFFFF);
        drawLine(book_left+160,book_top+0,book_left+160,book_top+160,0xFFFFFF);
        page_title = "World Map "+(Book_Page+1<10? " " :"");
        page_title += ""+(Book_Page+1)+"/"+floor((Stage_In_Book.length-1)/rows_per_page+1);
        Large_Text.TXoutputB(book_left+20,book_top+4,page_title,-1,0x008000);

        if (isMouseHovered(book_left+8,book_top+16,144,12*rows_per_page)){
            y = floor((Mouse_Ypos-(book_top+16))/12);
            if (Clicked){
                Book_Row = y;
            }
            filledRect(book_left+8,book_top+16+12*y,144,12,0x990000);
        }

        if (Is_Key_Pressed1[38]){ // up key scrolls up in book
            if (Book_Row==0){                                                                   // if currently on the first row
                Book_Page = cycle(Book_Page-1,0,floor((Stage_In_Book.length-1)/rows_per_page)); // shift up to the previous page
                Book_Row = rows_per_page-1;                                                     // start at the bottom row
                while (Stage_In_Book[Book_Page*rows_per_page+Book_Row]==0)                      // shift up past any blank rows
                    Book_Row--;
            } else {
                Book_Row--;  // shift up 1 row
            }
        }
        if (Is_Key_Pressed1[40]){ // down key scrolls down in book
            if (Book_Row==rows_per_page-1 || Stage_In_Book[Book_Page*rows_per_page+Book_Row+1]==0){ // if at the bottom (or if next row is empty)
                Book_Page = cycle(Book_Page+1,0,floor((Stage_In_Book.length-1)/rows_per_page));     // shift down to the next page
                Book_Row = 0;                                                                       // start at the top row
            } else {
                Book_Row++; // shift down 1 row
            }
        }

        for (var i=0; i<rows_per_page; i++){
            book_stage = Stage_In_Book[Book_Page*rows_per_page+i];
            if (book_stage!=0){
                if ((Stage_Status[book_stage]&Booked) > 0)
                    Large_Text.TXoutputB(book_left+8,book_top+16+12*i,Stage_Names[book_stage],0xFFFFFF,0x000000);
                else if ((Stage_Status[book_stage]&Beaten2) > 0)
                    Large_Text.TXoutputB(book_left+8,book_top+16+12*i,Stage_Names[book_stage],0x808080,0x000000);
                else
                    Large_Text.TXoutputB(book_left+8,book_top+16+12*i,"???",0x808080,0x000000);
            }
        }
        book_stage = Stage_In_Book[Book_Page*rows_per_page+Book_Row];
        if (book_stage!=0){
            if ((Stage_Status[book_stage]&Beaten2) > 0)
                 Large_Text.TXoutputB(book_left+8,book_top+16+12*Book_Row,Stage_Names[book_stage],0xFF0000,0x000000);
            else Large_Text.TXoutputB(book_left+8,book_top+16+12*Book_Row,"???",0xFF0000,0x000000);
        }
        drawLine(book_left+0,book_top+140,book_left+160,book_top+140,0xFFFFFF);
        if (isMouseHovered(book_left+8,book_top+144-2,48,17)){
            if (Clicked){
                Book_Page = cycle(Book_Page-1,0,floor((Stage_In_Book.length-1)/rows_per_page));
                Book_Row = rows_per_page-1;
            }
            filledRect(book_left+8,book_top+144-2,48,17,0x990000);
        }
        Large_Text.TXoutputB(book_left+16,book_top+144+1,"Prev",0xFFFFFF,0x000000);

        if (isMouseHovered(book_left+56,book_top+144-2,48,17)){
            if (Clicked){
                Book_Page = cycle(Book_Page+1,0,floor((Stage_In_Book.length-1)/rows_per_page));
                Book_Row = 0;
            }
            filledRect(book_left+56,book_top+144-2,48,17,0x990000);
        }
        Large_Text.TXoutputB(book_left+64,book_top+144+1,"Next",0xFFFFFF,0x000000);

        if (isMouseHovered(book_left+104,book_top+144-2,48,17)){
            if (Clicked)
                Sequence_Step = 52;
            filledRect(book_left+104,book_top+144-2,48,17,0x990000);
        }
        Large_Text.TXoutputB(book_left+112,book_top+144+1,"Exit",0xFFFFFF,0x000000);
        if (book_stage!=0){
            if ((Stage_Status[book_stage]&Booked) > 0){
                nxt_stge_en = Book_Indexer[book_stage+1]-Book_Indexer[book_stage];
                for (var e=nxt_stge_en-1; e>=0; e--)
                    nxt_stge_en -= EN_Info[Book_Indexer[book_stage]+e][En_2nd_Att];

                g = book_left+80-16*nxt_stge_en;
                if (isMouseHovered(g+160,book_top+0,32*nxt_stge_en,52)){
                    x = (Mouse_Xpos-(g+160))>>5;
                    if (Clicked)
                        Book_Column = x;
                    filledRect(g+160+32*x+2,book_top+0+2,28,52,0x990000);
                }
                if (Is_Key_Pressed1[37]) // left key scrolls left in book
                    Book_Column = cycle(Book_Column-1,0,nxt_stge_en-1);
                if (Is_Key_Pressed1[39]) // right key scrolls right in book
                    Book_Column = cycle(Book_Column+1,0,nxt_stge_en-1);

                book_column = clamp(Book_Column,0,nxt_stge_en-1);
                filledRect(g+160+32*book_column+2,book_top+48+2,28,4,0x990000);
                for (var i=0; i<nxt_stge_en; i++)
                    drawItem(Terrain_Textures[Stage_Spawns[book_stage][Stage_Spawns[book_stage].length-1][0]],g+164+32*i,book_top+44,24,8,0,0,24,8);
                nxt_stge_en = Book_Indexer[book_stage+1]-Book_Indexer[book_stage];
                b = 0;
                for (var e=0; e<nxt_stge_en; e++,b++){
                    Enemies.ENdrawIcon(Book_Indexer[book_stage]+e,g+164+12+32*b,book_top+44-1,0);
                    e += EN_Info[Book_Indexer[book_stage]+e][En_2nd_Att]; // skip over drawaing enemy arrays that are just secondary attacks
                }
                book_enemy = Book_Indexer[book_stage]+book_column;
                b = 0;
                for (var e=0; e<book_column; e++)
                    book_enemy += EN_Info[Book_Indexer[book_stage]+e][En_2nd_Att];  // skip over displaying stats for enemy arrays that are just secondary attacks

                Large_Text.TXoutputB(book_left+164,book_top+56,"Lv   "+EN_Info[book_enemy][EN_Lvl],0xFFFFFF,0x000000);
                Large_Text.TXoutputB(book_left+164,book_top+68,"LP   "+EN_Info[book_enemy][EN_LP],0xFFFFFF,0x000000);
                Large_Text.TXoutputB(book_left+164,book_top+80,"Gold "+EN_Info[book_enemy][En_Gold],0xFFFFFF,0x000000);
                Large_Text.TXoutputB(book_left+164,book_top+92,"EXP  "+EN_Info[book_enemy][EN_EXP],0xFFFFFF,0x000000);
                Large_Text.TXoutputB(book_left+164,book_top+108,"Drop Item",0xFFFFFF,0x000000);

                b = 0;
                for (var d=0; d<6; d+=2){
                    book_drop = EN_Info[book_enemy][En_Drop1+d];
                    if (book_drop!=0){
                        Display_Mode2 = 2;
                        dispItem(Drop_Img,book_left+164,book_top+4*(30+3*b),12,12,12*getVal(book_drop,Item_Ico_Sm),0,12,12,getVal(book_drop,Item_Color));
                        Display_Mode2 = 0;
                        itemText(book_left+164,book_top+4*(30+3*b),"  "+Item_Catalogue[book_drop][Item_Name]+" "+(Item_Catalogue[book_drop][Item_LV]? Item_Catalogue[book_drop][Item_LV] :""),0xFFFFFF,0,-1);
                        b++;
                    }
                }
                Large_Text.TXoutputB(book_left+256,book_top+56,"Resist",0xFFFFFF,0x000000);
                if (EN_Info[book_enemy][Ph_Resist]>0)
                    Small_Text.TXoutputB(book_left+256,book_top+68+2,"Ph          ",0x808080,0x000000);
                if (EN_Info[book_enemy][Fi_Resist]>0)
                    Small_Text.TXoutputB(book_left+256,book_top+68+2,"  Fi        ",0xFF0000,0x000000);
                if (EN_Info[book_enemy][Ic_Resist]>0)
                    Small_Text.TXoutputB(book_left+256,book_top+68+2,"    Ic      ",0x2020FF,0x000000);
                if (EN_Info[book_enemy][Th_Resist]>0)
                    Small_Text.TXoutputB(book_left+256,book_top+68+2,"      Th    ",0xFFFF40,0x000000);
                if (EN_Info[book_enemy][Po_Resist]>0)
                    Small_Text.TXoutputB(book_left+256,book_top+68+2,"        Po  ",0x00FF00,0x000000);
                if (EN_Info[book_enemy][Fr_Resist]>0)
                    Small_Text.TXoutputB(book_left+256,book_top+68+2,"          Fr",0xC0C0FF,0x000000);
                Large_Text.TXoutputB(book_left+256,book_top+80,"Weak",0xFFFFFF,0x000000);
                if (EN_Info[book_enemy][Ph_Resist]<0)
                    Small_Text.TXoutputB(book_left+256,book_top+92+2,"Ph          ",0x808080,0x000000);
                if (EN_Info[book_enemy][Fi_Resist]<0)
                    Small_Text.TXoutputB(book_left+256,book_top+92+2,"  Fi        ",0xFF0000,0x000000);
                if (EN_Info[book_enemy][Ic_Resist]<0)
                    Small_Text.TXoutputB(book_left+256,book_top+92+2,"    Ic      ",0x2020FF,0x000000);
                if (EN_Info[book_enemy][Th_Resist]<0)
                    Small_Text.TXoutputB(book_left+256,book_top+92+2,"      Th    ",0xFFFF40,0x000000);
                if (EN_Info[book_enemy][Po_Resist]<0)
                    Small_Text.TXoutputB(book_left+256,book_top+92+2,"        Po  ",0x00FF00,0x000000);
                if (EN_Info[book_enemy][Fr_Resist]<0)
                    Small_Text.TXoutputB(book_left+256,book_top+92+2,"          Fr",0xC0C0FF,0x000000);

            } else if ((Stage_Status[book_stage]&Beaten2) > 0){
                centeredText(Large_Text,book_left+240,book_top+40,"Information Fee",0xFFFFFF,0x000000);
                if (Randomizer_Mode==1)
                     entry_cost = 500*(Book_Page*rows_per_page+Book_Row+1);  // book cost in randomizer
                else entry_cost = 1000*(Book_Page*rows_per_page+Book_Row+1); // book cost
                if (isMouseHoveredCenter(book_left+240,book_top+80,160,160)){
                    if (Team_Gold>=entry_cost && Clicked){
                        antiCheatCheck();
                        Stage_Status[book_stage] |= Booked;
                        Team_Gold -= entry_cost;
                        antiCheatSet();
                    }
                    filledRectCentered(book_left+240,book_top+80,120,32,0x990000); // highlights button when mouse hovers over information fee
                }
                centeredText(Large_Text,book_left+240,book_top+80,"$"+entry_cost+" Buy",0xFFFFFF,0x000000);
            } else {
                centeredText(Large_Text,book_left+240,book_top+40,"?????",0xFFFFFF,0x000000);
                centeredText(Large_Text,book_left+240,book_top+80,"???",0xFFFFFF,0x000000);
            }
        }
        drawUI(1);
    } else if (Sequence_Step==55){                                                    // Sequence: open forget menu (at forget tree)
        drawStage(0);
        Sign_Touched_Mode = 0;
        forget_left = 80;
        forget_top = 28;
        Display_Mode = 1;
        filledRect(forget_left-4,forget_top-4,328,168,0xCC000000);
        Display_Mode = 0;
        outlineRect(forget_left+0,forget_top+0,321,161,0xFFFFFF);
        drawLine(forget_left+160,forget_top+0,forget_left+160,forget_top+160,0xFFFFFF);
        forget_left = 100;
        forget_top = 60;
        for (var s=0; s<Stickmen_Slots; s++){
            if (isMouseHovered(forget_left+32*s-4,forget_top+0-4,32,32)){
                filledRect(forget_left+32*s,forget_top+0,24,24,10027008);
                if (Clicked)
                    Menu_Column = s;
            } else {
                filledRect(forget_left+32*s,forget_top+0,24,24,0x000000);
            }
            dispItem(Player_Img,forget_left+32*s,forget_top,24,24,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),0,24,24,0xFFFFFFFF);
            colorPortraitWeap(forget_left+32*s,forget_top,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),getVal(Item_Inv[Stickmen_Slots+s],Item_Color));
        }
        outlineRect(forget_left+32*Menu_Column-1,forget_top-1,26,26,0xFF0000);
        Large_Text.TXoutputB(forget_left,forget_top-16,Class_Name_List[getVal(Item_Inv[Stickmen_Slots+Menu_Column],Item_Class_ID)],0xFFFFFF,0x000000);
        forget_left = 100;
        forget_top = 74;
        Large_Text.TXoutputB(forget_left,forget_top+16,"LP  "+LP_SP[Menu_Column],0xFFFFFF,0x000000); // SP
        Large_Text.TXoutputB(forget_left,forget_top+28,"STR "+STR_SP[Menu_Column],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(forget_left,forget_top+40,"DEX "+DEX_SP[Menu_Column],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(forget_left,forget_top+52,"MAG "+MAG_SP[Menu_Column],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(forget_left,forget_top+68,"LV  "+LV[0],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(forget_left,forget_top+68,"        SP "+SP[Menu_Column],0xFFFFFF,0x000000);
        forget_left = 80;
        forget_top = 28;
        drawLine(forget_left+0,forget_top+140,forget_left+160,forget_top+140,0xFFFFFF);
        if (isMouseHovered(forget_left+56,forget_top+144-2,48,17)){
            if (Clicked)
                Sequence_Step = 52;
            filledRect(forget_left+56,forget_top+144-2,48,17,0x990000);
        }
        Large_Text.TXoutputB(forget_left+64,forget_top+144+1,"Exit",0xFFFFFF,0x000000);
        forget_cost = 1000*(LP_SP[Menu_Column]+STR_SP[Menu_Column]+DEX_SP[Menu_Column]+MAG_SP[Menu_Column]);
        if (isMouseHoveredCenter(forget_left+240,forget_top+80,120,32) && forget_cost>0){
            if (Team_Gold>=forget_cost && Clicked){
                antiCheatCheck();
                SP[Menu_Column] += LP_SP[Menu_Column]+STR_SP[Menu_Column]+DEX_SP[Menu_Column]+MAG_SP[Menu_Column];
                LP_SP[Menu_Column] = 0;
                STR_SP[Menu_Column] = 0;
                DEX_SP[Menu_Column] = 0;
                MAG_SP[Menu_Column] = 0;
                Team_Gold -= forget_cost;
                antiCheatSet();
            }
            filledRectCentered(forget_left+240,forget_top+80,120,32,0x990000);
        }
        centeredText(Large_Text,forget_left+240,forget_top+72,"Forget",0xFFFFFF,0x000000);
        centeredText(Large_Text,forget_left+240,forget_top+88,"$"+forget_cost+" Buy",0xFFFFFF,0x000000);
        drawUI(1);
    } else if (Sequence_Step==59){                                                    // Sequence: fade out town screen
        drawStage(0);
        drawUI(0);
        screenTransition(floor(0xFF*Text_Fade/30));
        Text_Fade++;
        //Text_Fade = 30; // skip fade-out for testing
        if (Text_Fade==30){
            Text_Fade = Current_Screen = Sign_Touched_Mode = 0;
            Sequence_Step = 6;
            antiCheatCheck();
            Stage_Status[Current_Stage] |= Beaten;
            if (Dot_Locations[Current_Stage][3]>0)
                Stage_Status[Dot_Locations[Current_Stage][3]] |= Unlocked;
            if (Dot_Locations[Current_Stage][4]>0)
                Stage_Status[Dot_Locations[Current_Stage][4]] |= Unlocked;
            antiCheatSet();
            Save_Code3 = genSaveCode(0);
            Save_Code1 = 1;
        }
    }
}
