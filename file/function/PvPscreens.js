window.fff = PvPscreens;
function PvPscreens(){ // original name: xf()
    var a,b,c;
    if (Sequence_Step==70){
        Current_Stage = 0;
        Current_Screen = 1;
        if (Terrain.TRset(Current_Stage)){
            Players.PLadd(0,26,Terrain.TR_low_surface[0]);
            Players.PLadd(1,30,Terrain.TR_low_surface[1]);
            Players.PLadd(2,34,Terrain.TR_low_surface[2]);
            Players.PLadd(3,38,Terrain.TR_low_surface[3]);
            Enemies.ENreset(1);
            Projectiles.PJ_index = 0;
            Indicators.IN_index = 0;
            Drops.DP_index = 0;
            Text_Fade = Sign_Touched_Mode = Target_Array_ID = En_Count_From_Max = Target_HP_Max = Target_HP_Current = Drops.DP_log = 0;
            Sequence_Step++;
        }
    } else if (Sequence_Step==71 || Sequence_Step==72 || Sequence_Step==73 || Sequence_Step==74){
        Terrain.TRdrawTerrain();
        Players.PLmain();
        Drops.DPmain();
        Indicators.INmain();
        Projectiles.PJmain();
        Drops.DPrenderDrops();
        Players.PLrenderPlayer();
        Projectiles.PJrenderProjectiles();
        Indicators.INoutput();
        drawUI(0);
        if (Sequence_Step==71){
            if (VS_Upload_Errors==0){
                if (Game_Language)
                     doVSModeText(VS_Player_Team_ID,"\u30b3\u30e1\u30f3\u30c8\u3092\u8a18\u5165\u3057\u3066\uff2f\uff2b\u3092\u62bc\u3057\u3066\u4e0b\u3055\u3044");
                else doVSModeText(VS_Player_Team_ID,"Enter comments and click OK.");
            } else if (Game_Language){
                if (VS_Upload_Errors==100)
                    doVSModeText(VS_Player_Team_ID,"\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f");
                else if (VS_Upload_Errors==1)
                    doVSModeText(VS_Player_Team_ID,"\u30e6\u30fc\u30b6\u30fc\u767b\u9332\u304c\u5fc5\u8981\u3067\u3059");
                else if (VS_Upload_Errors==2)
                    doVSModeText(VS_Player_Team_ID,"1\u65e5\u306b1\u56de\u306e\u307f\u3067\u3059");
                else if (VS_Upload_Errors==3)
                    doVSModeText(VS_Player_Team_ID,"10\u4ef6\u4ee5\u4e0a\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u51fa\u6765\u307e\u305b\u3093");
                else
                    doVSModeText(VS_Player_Team_ID,"\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u51fa\u6765\u307e\u305b\u3093");
            } else if (VS_Upload_Errors==100){
                doVSModeText(VS_Player_Team_ID,"The upload has been completed.");
            } else if (VS_Upload_Errors==1){
                doVSModeText(VS_Player_Team_ID,"User registration is required.");
            } else if (VS_Upload_Errors==2){
                doVSModeText(VS_Player_Team_ID,"1 time in 1 day only.");
            } else if (VS_Upload_Errors==3){
                doVSModeText(VS_Player_Team_ID,"Cannot upload more than 10 posts.");
            } else {
                doVSModeText(VS_Player_Team_ID,"Cannot upload.");
            }
            Sequence_Step++;
        }
    } else if (Sequence_Step==72){
        var g;
        filledRectCentered(Win_Hcenter,100,300,100,0x808080);
        centeredText(Large_Text,Win_Hcenter,70,"Upload",0xFFA0A0,0x000000);
        dispItemCentered(VS_Player_Team_ID,Win_Hcenter,90,VS_Player_Team_ID.IG_cropped_width,16,0,0,VS_Player_Team_ID.IG_cropped_width,16,0xFF000000);
        if (VS_Upload_Errors==0){
            b = wg;
            filledRect(136,108,240,16,0xFFFFFF);
            outlineRect(135,107,242,18,0x000000);
            if (isMouseHovered(136,108,240,16) && (outlineRect(135,107,242,18,0xFF0000),Released)){
                c = null;
                try {
                    c = prompt("Upload",b);
                } catch (d){}
                if (c!=null)
                    b = c;
            }
            doVSModeText(yg,b);
            dispItem(yg,137,108,238,16,0,0,238,16,0xFF000000);
            wg = b;
            b = isMouseHoveredCenter(Win_Hcenter,140,16,12);
            centeredText(Large_Text,Win_Hcenter,140,"OK",b?0xFF0000:0xFFFFFF,0x000000);
            if (b && Released){
                if (wg.length<2){
                    if (Game_Language)
                         doVSModeText(VS_Player_Team_ID,"\u30b3\u30e1\u30f3\u30c8\u3092\uff12\u6587\u5b57\u4ee5\u4e0a\u8a18\u5165\u3057\u3066\u4e0b\u3055\u3044");
                    else doVSModeText(VS_Player_Team_ID,"The comment must be longer than 2 characters.");
                } else {
                    b = wg;
                    c = 0;
                    a = b.length;
                    for (var e = 0; e < a; e++){
                        g = b.charCodeAt(e);
                        c = 0 <= g && 128 >= g || 65377 <= g && 65439 >= g ? c+1 : c+2
                    }
                    if (c>20){
                        if (Game_Language)
                             doVSModeText(VS_Player_Team_ID,"\u30b3\u30e1\u30f3\u30c8\u3092\uff11\uff10\u6587\u5b57\u4ee5\u4e0b\u3067\u8a18\u5165\u3057\u3066\u4e0b\u3055\u3044");
                        else doVSModeText(VS_Player_Team_ID,"The comment must be shorter than 10 characters.");
                        Sequence_Step++;
                    }
                }
            }
        }
    } else if (Sequence_Step==73){
        b = encodeURIComponent(wg);
        if (b.length==0){
            if (Game_Language)
                 doVSModeText(VS_Player_Team_ID,"\u30a8\u30e9\u30fc");
            else doVSModeText(VS_Player_Team_ID,"Error");
            Sequence_Step = 72;
        } else if (Item_Inv[Stickmen_Slots+0]==0 || Item_Inv[Stickmen_Slots+1]==0 || Item_Inv[Stickmen_Slots+2] || Item_Inv[Stickmen_Slots+3]==0){ // if any rangers are unequipped
            if (Game_Language)
                 doVSModeText(VS_Player_Team_ID,"\u6b66\u5668\u3092\u88c5\u5099\u3057\u3066\u4e0b\u3055\u3044");
            else doVSModeText(VS_Player_Team_ID,"Equip a weapon.");
            Sequence_Step = 72;
        } else {
            antiCheatCheck();
            Save_Code3 = genSaveCode(1);
            c = "/score/ranger_entry.php?a=";
            c += Game_ID;
            c += Ag+(Game_Language ? "0" : "1");
            c += Bg+b;
            c += Cg+Save_Code3;
            logCopyright(c);
            funct_Dg(c);
            Sequence_Step++;
        }
    } else if (Sequence_Step==74 && Global_Eg!=0){
        if (Fg[0]=="ok")
            VS_Upload_Errors = 100;
        else if (Fg[0]=="err1")
            VS_Upload_Errors = 1;
        else if (Fg[0]=="err2")
            VS_Upload_Errors = 2;
        else if (Fg[0]=="err3")
            VS_Upload_Errors = 3;
        else if (Fg[0]=="err4")
            VS_Upload_Errors = 4;
        else if (Fg[0]=="err5")
            VS_Upload_Errors = 5;
        else
            VS_Upload_Errors = 6;
        Sequence_Step = 71;
    } else if (Sequence_Step==60){
        if (Current_Stage = 0,Current_Screen = 1,Terrain.TRset(Current_Stage)){
            Players.PLadd(0,10,Terrain.TR_low_surface[0]);
            Players.PLadd(1,11,Terrain.TR_low_surface[1]);
            Players.PLadd(2,12,Terrain.TR_low_surface[2]);
            Players.PLadd(3,13,Terrain.TR_low_surface[3]);
            Players.PLadd(4,(Win_Width>>3)-11,Terrain.TR_low_surface[0]);
            Players.PLadd(5,(Win_Width>>3)-12,Terrain.TR_low_surface[1]);
            Players.PLadd(6,(Win_Width>>3)-13,Terrain.TR_low_surface[2]);
            Players.PLadd(7,(Win_Width>>3)-14,Terrain.TR_low_surface[3]);
            setRangersUI();
            antiCheatCheck();
            for (var s=0; s<Stickmen_Slots<<1; s++)
                LP_Current[s] = LP_Max[s];
            for (var s=0; s<Stickmen_Slots<<1; s++)
                MP_Bar[s] = 0;
            Team_Gold = 9999999;
            antiCheatSet();
            Enemies.ENreset(1);
            Projectiles.PJ_index = 0;
            Indicators.IN_index = 0;
            Drops.DP_index = 0;
            Text_Fade = Sign_Touched_Mode = Target_Array_ID = En_Count_From_Max = Target_HP_Max = Target_HP_Current = Drops.DP_log = 0;
            Sequence_Step++;
        }
    } else if (Sequence_Step==61 || Sequence_Step==62 || Sequence_Step==63 || Sequence_Step==64){
        Terrain.TRdrawTerrain();
        Sequence_Step==61 && (Players.PL_team_is_dead = 1);
        Players.PLmain();
        Indicators.INmain();
        Projectiles.PJmain();
        Players.PL_team_is_dead = 0;
        Players.PLrenderPlayer();
        Projectiles.PJrenderProjectiles();
        Indicators.INoutput();
        setRangersUI();
        if (Sequence_Step==61){
            Text_Fade = clamp(Text_Fade+1,0,30);
            a = floor(0xFF*Text_Fade/30);
            drawLine(0,110,floor(512*Text_Fade/30),110,0x808080);
            drawLine(512-floor(512*Text_Fade/30),143,512,143,0x808080);
            if (isMouseHoveredCenter(Win_Hcenter,127,Win_Width,32) && 30 == Text_Fade){
                if (Clicked){
                    Sequence_Step++;
                    Text_Fade = 0;
                }
                filledRectCentered(Win_Hcenter,127,Win_Width,32,0x800000);
                largeMessage(Large_Text,Win_Hcenter,128,"FIGHT",0xFF,0xFF,0xFF,0xFF,0,0,0,0xFF,16,24);
            } else {
                largeMessage(Large_Text,Win_Hcenter,128,"READY",0xFF,0xFF,0xFF,a,0,0,0,a,16,24);
                Display_Mode = 1;
                b = 110;
                c = 120;
                doVSModeText(VS_Player_Team_ID,Player_Name);
                dispItemCentered(VS_Player_Team_ID,b,c+0-2,VS_Player_Team_ID.IG_cropped_width,16,0,0,VS_Player_Team_ID.IG_cropped_width,16,a << 24 | 0xFFFFFFFF);
                doVSModeText(VSMODECODE12,VS_Player_Team_Name);
                dispItemCentered(VSMODECODE12,b,c+16-2,VSMODECODE12.IG_cropped_width,16,0,0,VSMODECODE12.IG_cropped_width,16,a << 24 | 0xFFFFFFFF);
                b = 402;
                doVSModeText(VSMODECODE13,VS_Opponent_Name);
                dispItemCentered(VSMODECODE13,b,c+0-2,VSMODECODE13.IG_cropped_width,16,0,0,VSMODECODE13.IG_cropped_width,16,a << 24 | 0xFFFFFFFF);
                doVSModeText(VSMODECODE14,VS_Opponent_Team_Name);
                dispItemCentered(VSMODECODE14,b,c+16-2,VSMODECODE14.IG_cropped_width,16,0,0,VSMODECODE14.IG_cropped_width,16,a << 24 | 0xFFFFFFFF);
                Display_Mode = 0;
            }
        } else if (Sequence_Step==62){
            if (LP_Current[0]+LP_Current[1]+LP_Current[2]+LP_Current[3]==0){
                VSMODECODE8 = 2;
                Sequence_Step++;
            } else if (LP_Current[4]+LP_Current[5]+LP_Current[6]+LP_Current[7]==0){
                VSMODECODE8 = 1;
                Sequence_Step++;
            }
        }
        else if (Sequence_Step==63){
            if (VS_Upload_Errors==0){
                VS_Upload_Errors = 1;
                c = "/score/ranger_vs.php?a=";
                c += Game_ID;
                c += Ag+(Game_Language ? "0" : "1");
                c += Bg+VS_Player_Team_Text;
                c += Cg+VS_Opponent_Team_ID;
                if (Item_Inv[Stickmen_Slots+0]!=0 && Item_Inv[Stickmen_Slots+1]!=0 && Item_Inv[Stickmen_Slots+2]!=0 && Item_Inv[Stickmen_Slots+3]!=0)
                    c += Gg+vsUploadCode(VSMODECODE8);
                logCopyright(c);
                funct_Dg(c);
            }
            Sequence_Step++;
        } else if (Sequence_Step==64){
            var mp_price,item_class;
            Text_Fade = clamp(Text_Fade+1,0,50);
            a = floor(0xFF*Text_Fade/50);
            if (isMouseHoveredCenter(Win_Hcenter,128,96,32) && Text_Fade==50){
                Clicked && (Sequence_Step = 60);
                filledRectCentered(Win_Hcenter,128,96,32,0x800000);
            }
            outlineRectCentered(Win_Hcenter,128,96,32,0|(a>>1)<<16);
            largeMessage(Large_Text,Win_Hcenter,129,"RETRY",0xFF,0xFF,0xFF,a,0,0,0,a,16,24);
            b = 60;
            c = 72;
            Display_Mode = 1;
            dispItem(VS_Player_Team_ID,b,c+0-2,VS_Player_Team_ID.IG_cropped_width,16,0,0,VS_Player_Team_ID.IG_cropped_width,16,a<<24|0xFFFFFFFF);
            Display_Mode = 0;
            largeMessage(Large_Text,b+60,c+40,VSMODECODE8==1? "WIN" :"LOSE",0xFF,0xFF,0xFF,a,VSMODECODE8=1? 0xFF :0,0,VSMODECODE8==1? 0 :0xFF,a,32,48);
            if (Global_Eg!=0){
                if (Fg[0]=="ok"){
                    Large_Text.TXoutputM(b,c+64,""+Fg[1]+" win "+Fg[2]+" lose",0xFF,0xFF,0xFF,a,0,0,0,a,8,12);
                    Large_Text.TXoutputM(b,c+80,"Winning per "+Fg[3]+"%",0xFF,0xFF,0xFF,a,0,0,0,a,8,12);
                } else {
                    Large_Text.TXoutputM(b,c+64," RANKING ERROR",0xFF,0xFF,0xFF,a,0,0,0,a,8,12);
                }
            }
            b = 332;
            Display_Mode = 1;
            dispItem(VSMODECODE13,b,c+0-2,VSMODECODE13.IG_cropped_width,16,0,0,VSMODECODE13.IG_cropped_width,16,a << 24 | 0xFFFFFFFF);
            Display_Mode = 0;
            largeMessage(Large_Text,b+60,c+40,VSMODECODE8==2? "WIN" :"LOSE",0xFF,0xFF,0xFF,a,VSMODECODE8==2? 0xFF :0,0,VSMODECODE8==2? 0 :0xFF,a,32,48);
            if (Global_Eg!=0){
                if (Fg[0]=="ok"){
                    Large_Text.TXoutputM(b,c+64,""+Fg[4]+" win "+Fg[5]+" lose",0xFF,0xFF,0xFF,a,0,0,0,a,8,12);
                    Large_Text.TXoutputM(b,c+80,"Winning per "+Fg[6]+"%",0xFF,0xFF,0xFF,a,0,0,0,a,8,12);
                } else {
                    Large_Text.TXoutputM(b,c+64," RANKING ERROR",0xFF,0xFF,0xFF,a,0,0,0,a,8,12);
                }
            }
        }
        filledRect(0,257,512,126,[0xCC9449,0x90A8B0,0x6E8038,0xA7BFC9,0xAC7754,0x00600A,0x6F582D,0x6F582D,0x996600][Stage_Spawns[Current_Stage][Current_Screen][0]]);
        Small_Text.TXoutputM(10,374,"(C) 2008 ha55ii DAN-BALL.jp",0,0,0,0,0,0,0,128,5,7);
        largeMessage(Large_Text,Win_Hcenter,328,"VS",0xFF,0xFF,0xFF,0xFF,0,0,0,0xFF,16,24);
        b = 40;
        c = 268;
        dispItem(VS_Player_Team_ID,b,c+0-2,VS_Player_Team_ID.IG_cropped_width,16,0,0,VS_Player_Team_ID.IG_cropped_width,16,0xFF000000);
        Large_Text.TXoutputB(b,c+16,"LV "+LV[0],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(b,c+16,"        FP "+FP[0],0xFFFFFF,0x000000);
        doVSModeText(VSMODECODE15,"\u300c "+VS_Player_Team_Name+" \u300d");
        dispItemCentered(VSMODECODE15,b+60,c+88,VSMODECODE15.IG_cropped_width,16,0,0,VSMODECODE15.IG_cropped_width,16,0xFF000000);
        b = 206;
        largeMessage(Large_Text,b,c+20+2,"Rank",0,0,0,0,0,0,0,128,8,12);
        largeMessage(Large_Text,b,c+60,""+Rank_List[Rank[0]],0,0,0,0,0,0,0,80,32,48);
        b = 352;
        dispItem(VSMODECODE13,b,c+0-2,VSMODECODE13.IG_cropped_width,16,0,0,VSMODECODE13.IG_cropped_width,16,0xFF000000);
        Large_Text.TXoutputB(b,c+16,"LV "+LV[1],0xFFFFFF,0x000000);
        Large_Text.TXoutputB(b,c+16,"        FP "+FP[1],0xFFFFFF,0x000000);
        doVSModeText(VSMODECODE16,"\u300c"+VS_Opponent_Team_Name+"\u300d");
        dispItemCentered(VSMODECODE16,b+60,c+88,VSMODECODE16.IG_cropped_width,16,0,0,VSMODECODE16.IG_cropped_width,16,0xFF000000);
        b = 306;
        largeMessage(Large_Text,b,c+20+2,"Rank",0,0,0,0,0,0,0,128,8,12);
        largeMessage(Large_Text,b,c+60,""+Rank_List[Rank[1]],0,0,0,0,0,0,0,80,32,48);
        b = 40;
        c = 316;
        for (var s=0; s<Stickmen_Slots<<1; s++){
            if (s>=4)
                b = 224;
            filledRect(b+32*s,c-12,floor(24*LP_Current[s]/LP_Max[s]),4,0x800000); // player LP Bar display in vs mode
            mp_price = maxOf(getVal(Item_Inv[Stickmen_Slots+s],Weap_MP_Price),1);
            item_class = getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID);
            if (item_class!=4 && item_class!=5 && item_class!=6) // don't draw MP bar for non MP users
                filledRect(b+32*s,c-6,floor(23*MP_Bar[s]/mp_price)+1,2,0x000080); // player MP bar display in vs mode
            filledRect(b+32*s,c+0,24,24,0x000000);
            dispItem(Player_Img,b+32*s,c,24,24,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),0,24,24,0xFFFFFFFF);
            colorPortraitWeap(b+32*s,c,24*getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID),getVal(Item_Inv[Stickmen_Slots+s],Item_Color));
        }
    }
}
