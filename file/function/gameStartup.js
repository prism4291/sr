function gameStartup(a,b,c,d,e,g,k,r,m,n,F,H,M){ // original name: Te()
    if (Startup_Step==0){
        if (a!=null)
             Game_ID = a;
        else Game_ID = "";
        if (b=="0")
             Game_Language = true;
        else Game_Language = false;
        if (c!=null)
             Save_Cookie = c;
        else Save_Cookie = "";
        if (d!=null)
             Game_Mode = ~~d;
        else Game_Mode = 0;
        if (e!=null)
             VS_Player_Team_Text = e;
        else VS_Player_Team_Text = "";
        if (g!=null)
             VS_Opponent_Team_ID = g;
        else VS_Opponent_Team_ID = "";
        if (k!=null)
             VS_Opponent_Data = k;
        else VS_Opponent_Data = "";
        if (r!=null)
             VS_Upload_Errors = ~~r;
        else VS_Upload_Errors = 0;
        if (m!=null)
             VS_Player_Team_ID = ~~m;
        else VS_Player_Team_ID = 0;
        if (n!=null)
             Player_Name = n;
        else Player_Name = "";
        if (F!=null)
             VS_Player_Team_Name = F;
        else VS_Player_Team_Name = "";
        if (H!=null)
             VS_Opponent_Name = H;
        else VS_Opponent_Name = "";
        if (M!=null)
             VS_Opponent_Team_Name = M;
        else VS_Opponent_Team_Name = "";

        for (var i=0; i<Stickmen_Slots<<1 && i<Game_ID.length; i++){
            b = Game_ID.charAt(i);
            for (var j=0; j<Char_List.length; j++){
                if (Char_List[j]==b){
                    VS_Game_ID_Plain[i] = j;
                    break;
                }
            }
        }
        logCopyright("Copyright (C) 2008 ha55ii DAN-BALL.jp");

        cv.width = Win_Width;
        cv.height = Win_Height;

        for (var w=0; w<513; w++)
            Xe_arr[w] = new Float32Array(2);

        for (var w=0; w<512; w++){
            b = 360*w/512*Pi/180;
            Xe_arr[w][0] = Math.cos(b);
            Xe_arr[w][1] = Math.sin(b);
        }

        Xe_arr[i][0] = Xe_arr[0][0];
        Xe_arr[i][1] = Xe_arr[0][1];

        for (var h=0; h<256; h++){
            Is_Key_Pressed1[h] = false;
            Arr256_2[h] = false;
            Is_Key_Held[h] = false;
            Arr256_4[h] = 0;
            Arr256_5[h] = 0;
        }

        for (var i=0; i<10; i++)
            Arr256_4[i+48] = i+48;
        for (var i=0; i<9; i++)
            Arr256_5[i+49] = i+33;
        for (var i=0; i<4; i++)
            Arr256_4[i+37] = i+37;
        for (var i=0; i<4; i++)
            Arr256_5[i+37] = i+37;

        Arr256_4[13] = Arr256_5[13] = 13;
        Arr256_4[16] = Arr256_5[16] = 16;
        Arr256_4[17] = Arr256_5[17] = 17;
        Arr256_4[18] = Arr256_5[18] = 18;
        Arr256_4[32] = Arr256_5[32] = 32;
        Arr256_4[186] = 58;
        Arr256_5[186] = 42;
        Arr256_4[187] = 59;
        Arr256_5[187] = 43;
        Arr256_4[188] = 44;
        Arr256_5[188] = 60;
        Arr256_4[189] = 45;
        Arr256_5[189] = 61;
        Arr256_4[190] = 46;
        Arr256_5[190] = 62;
        Arr256_4[191] = 47;
        Arr256_5[191] = 63;
        Arr256_4[192] = 64;
        Arr256_5[192] = 96;
        Arr256_4[219] = 91;
        Arr256_5[219] = 123;
        Arr256_4[220] = 92;
        Arr256_5[220] = 124;
        Arr256_4[221] = 93;
        Arr256_5[221] = 125;
        Arr256_4[222] = 94;
        Arr256_5[222] = 126;
        Arr256_4[226] = 92;
        Arr256_5[226] = 95;
        Arr256_4[58] = 58;
        Arr256_5[58] = 42;
        Arr256_4[59] = 59;
        Arr256_5[59] = 43;
        Arr256_4[173] = 45;
        Arr256_5[173] = 61;
        Arr256_4[64] = 64;
        Arr256_5[64] = 96;
        Arr256_4[160] = 94;
        Arr256_5[160] = 126;

        for (var i=0; i<1024; i++)
            Rand_Arr_Df[i] = i/1024;
        for (var i=0; i<1024; i++){
            b = floor(1024*Math.random());
            c = Rand_Arr_Df[i];
            Rand_Arr_Df[i] = Rand_Arr_Df[b];
            Rand_Arr_Df[b] = c;
        }

        Rand_EF = floor(1024*Math.random())&1023;
        Rand_FF = floor(512*Math.random())|1;

        for (var p=0; p<Win_Width*Win_Height; p++)
            Game_Canvas[p] = 0;
        for (var p=0; p<Win_Width*Win_Height*4; p++)
            Bit_8_Color[p] = 0xFF;

        Large_Text.TXset("font.gif",8,12);  // size of letters
        Small_Text.TXset("font_s.gif",5,7);

        for (var i=0; i<13; i++){
            Terrain_Textures[i] = new SR_Image;
            Terrain_Textures[i].IGset("gt"+i+".gif");
        }

        Player_Img.IGset("pl.gif");
        Drop_Img.IGset("icon.gif");
        Item_Img.IGset("item.gif");
        Enemy_Head_Img.IGset("en.gif");
        Sign_Img.IGset("next.gif");
        Projectiles_Img.IGset("mag.gif");
        Title_Img.IGset("title.gif");
        Effect_Img.IGset("ef.gif");
        Hut_Img.IGset("town.gif");
        Water_Img.IGset("water.gif");
        Water_Red_Img.IGset("water2.gif");
        Forget_Tree_Img.IGset("tree.gif");
        Map_Elev_Index.IGset("map.gif");
        Map_Tiles_Img.IGset("mt.gif");
        Map_Feature_Index.IGset("map2.gif");
        Map_Features_Img.IGset("mt2.gif");

        if (checkFalseHost())
             Startup_Step--;
        else Startup_Step++;
    }
    if (Startup_Step==1){
        imgToArray(Large_Text.TX_image);
        imgToArray(Small_Text.TX_image);
        for (var i=0; i<13; i++)
            imgToArray(Terrain_Textures[i]);
        imgToArray(Player_Img);
        imgToArray(Drop_Img);
        imgToArray(Item_Img);
        imgToArray(Enemy_Head_Img);
        imgToArray(Sign_Img);
        imgToArray(Projectiles_Img);
        imgToArray(Title_Img);
        imgToArray(Effect_Img);
        imgToArray(Hut_Img);
        imgToArray(Water_Img);
        imgToArray(Water_Red_Img);
        imgToArray(Forget_Tree_Img);
        imgToArray(Map_Elev_Index);
        imgToArray(Map_Tiles_Img);
        imgToArray(Map_Feature_Index);
        imgToArray(Map_Features_Img);
        if (Tile_Counter1!=0)
             setTimeout(gameStartup,timePF());
        else Startup_Step++;
    }
    if (Startup_Step==2){
        Players.PLreset();
        Indicators.INreset();
        Projectiles.PJreset();
        Drops.DPreset();
        WorldMap.MAPset();
        if (Game_Mode==1)
            loadGame(VS_Opponent_Data,1);
        loadGame(Save_Cookie,0);
        Save_Code3 = genSaveCode(0);
        dataGather();
        antiCheatSet();
        setArea(Stage_Eff_Canvas,Win_Width,Win_Height);
        mainSequence();
    }
}
