SR_map.prototype.MAPmain = function(){ // uh.prototype.b
    var path_len,dot_color,dot_size,last_stage_xpos,last_stage_ypos;
    var dotpath_pos = new Vector2D;
    var dotpath_dist = new Vector2D;
    var fill1 = 0xFF;

    /**************************************************************************/
    if (Mouse_Xpos<20 && Mouse_Ypos<Inv_Top)                                               // hover near or past the left edge to scoll map
        this.MAP_tile_horizontal_spacer = clamp(this.MAP_tile_horizontal_spacer+4,-720,0); // scroll map left
    else if (Mouse_Xpos>Win_Width-20 && Mouse_Ypos<Inv_Top)                                         // hover near or past the right edge to scoll map
        this.MAP_tile_horizontal_spacer = clamp(this.MAP_tile_horizontal_spacer-4,-720,0); // scroll map right
    /**************************************************************************/

    /** edit: delete "#" to use right click (instead of hover) to scroll map **#/
    if (Mouse_Xpos<20 && Mouse_Ypos<Inv_Top && Right_Click_Was_Down)                       // right click near or past the left edge to scoll map
        this.MAP_tile_horizontal_spacer = clamp(this.MAP_tile_horizontal_spacer+4,-720,0); // scroll map left
    else if (Mouse_Xpos>Win_Width-20 && Mouse_Ypos<Inv_Top && Right_Click_Was_Down)                 // right click near or past the right edge to scoll map
        this.MAP_tile_horizontal_spacer = clamp(this.MAP_tile_horizontal_spacer-4,-720,0); // scroll map right
    /**************************************************************************/

    for (var y=0; y<this.MAP_height; y++){
        for (var x=(this.MAP_tile_horizontal_spacer-1)<<4; x<this.MAP_width; x++){
            if (this.MAP_land_array[y][x]!=-1){
                drawItem(Map_Tiles_Img,this.MAP_tile_horizontal_spacer+16*x,16*y,16,16,this.MAP_land_array[y][x]%5*16,16*floor(this.MAP_land_array[y][x]/5),16,16);
                //if (Debug_Mode==1 && this.MAP_tile_horizontal_spacer+16*x+8>0)
                    //largeMessage(Small_Text,this.MAP_tile_horizontal_spacer+16*x+8,16*y+9,""+this.MAP_land_array[y][x],0xAA,0x00,0x00,fill1,0,0,0,0,5,7); // map tile debug
            }
        }
    }
    for (var s=0; s<Stage_Count; s++){
        if ((Stage_Status[s]&Beaten) != 0){
            for (var j=3; j<=4; j++){
                if (!(Dot_Locations[s][j]<=0) && s!=32 && s!=70 && s!=88){
                    dotpath_pos.x = 8*Dot_Locations[s][0];
                    dotpath_pos.y = 8*Dot_Locations[s][1];
                    dotpath_dist.x = 8*(Dot_Locations[Dot_Locations[s][j]][0]-Dot_Locations[s][0]);
                    dotpath_dist.y = 8*(Dot_Locations[Dot_Locations[s][j]][1]-Dot_Locations[s][1]);
                    path_len = normalize(dotpath_dist)/8-1;
                    scaleVector2D(dotpath_dist,8);
                    dotpath_pos.Vadd(dotpath_dist);
                    for (var k=0; k<path_len; k++){
                        filledRectCentered(this.MAP_tile_horizontal_spacer+dotpath_pos.x,dotpath_pos.y,2,2,0xCCCCCC); // dotted path from stage to stage on world map
                        dotpath_pos.Vadd(dotpath_dist);
                    }
                }
            }
        }
    }
    for (var y=0; y<this.MAP_height; y++){
        for (var x=0; x<this.MAP_width; x++){
            if (this.MAP_feature_array[y][x]!=-1)
                drawItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+16*x+8,16*y+8,16,16,16*this.MAP_feature_array[y][x],0,16,16);
            //if (Debug_Mode==1 && this.MAP_tile_horizontal_spacer+16*x+16>-16)
                //largeMessage(Small_Text,this.MAP_tile_horizontal_spacer+16*x+16,16*y+15,""+this.MAP_feature_array[y][x],0x55,0x55,0x55,fill1,0,0,0,0,5,7); // map tile debug
        }
    }
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+384-8 ,124,16,16,16 ,0,16,16,0xFF8080FF); // Submarine Shrine
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+504-8 ,116,16,16,48 ,0,16,16,0xFFFFFFFF); // Oasis
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+552-8 ,116,16,16,64 ,0,16,16,0xFFFFFFFF); // Pyramid
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+592-8 ,100,16,16,32 ,0,16,16,0xFFFFFFFF); // Cavern 4
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+672-8 ,68 ,16,16,32 ,0,16,16,0xFFFFFFFF); // Cavern 6
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+808-8 ,132,16,16,16 ,0,16,16,0xFFCCFFFF); // Ice Castle
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+904-8 ,164,16,16,112,0,16,16,0xFFCCFFFF); // Forget Tree
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+1040-8,172,16,16,128,0,16,16,0xFFCCFFFF); // Volcano
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+1088-8,100,16,16,32 ,0,16,16,0xFFFFFFFF); // Cavern 7
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+1160-8,84 ,16,16,32 ,0,16,16,0xFFFFFFFF); // Cavern 8
    dispItem(Map_Features_Img,this.MAP_tile_horizontal_spacer+1112-8,44 ,32,16,144,0,32,16,0xFFFFFFFF); // Hell Castle

    for (var s=0; s<Stage_Count; s++){ // stages dot colors
        if (Stage_Status[s]!=0){
            b = 8*Dot_Locations[s][0];
            path_len = 8*Dot_Locations[s][1];

            if (s==0||s==20||s==47||s==77)        // if town stages, dot is white
                dot_color = 0xFFFFFF;
            else if (s==33||s==71)                // if ??? or !!!, dot is black
                dot_color = 0x000000;
            else if ((Stage_Status[s]&Beaten)!=0) // if stage is complete
                dot_color = 0x990000;
            else                                  // if stage is not beaten
                dot_color = 0xCCCC00;

            if (Dot_Locations[s][2]==0)
                filledRectCentered(this.MAP_tile_horizontal_spacer+b,path_len,6,6,dot_color);

            if (s==71) // if stage is !!!
                 dot_size = 3;
            else dot_size = 24;

            if (isMouseHoveredCenter(this.MAP_tile_horizontal_spacer+b,path_len,dot_size,dot_size))
                outlineRectCentered(this.MAP_tile_horizontal_spacer+b,path_len,dot_size,dot_size,0xCC0000);
        }
    }
    last_stage_xpos = 8*Dot_Locations[Current_Stage][0];
    last_stage_ypos = 8*Dot_Locations[Current_Stage][1];
    drawItem(Player_Img,this.MAP_tile_horizontal_spacer+last_stage_xpos+1-12,last_stage_ypos-14-11,24,22,0,0,24,22);

    for (var s=0; s<Stage_Count; s++){
        if (Stage_Status[s]!=0){
            last_stage_xpos = 8*Dot_Locations[s][0];
            last_stage_ypos = 8*Dot_Locations[s][1];
            if (s==71) // if !!! stage
                 dot_size = 3;
            else dot_size = 24;

            if (0<Mouse_Xpos && Mouse_Xpos<Win_Width && isMouseHoveredCenter(this.MAP_tile_horizontal_spacer+last_stage_xpos,last_stage_ypos,dot_size,dot_size)){
                if (!Clicked || s!=0 && s!=20 && s!=47 && s!=70 && s!=77){
                    if (Clicked && s!=0){
                        Current_Stage = s;
                        Current_Screen = 0;
                        Sequence_Step = 10;
                    }
                } else {
                   Current_Stage = s;
                   Current_Screen = 1;
                   Sequence_Step = 50;
                }
                last_stage_xpos = clamp(Mouse_Xpos,1+4*Stage_Names[s].length,510-4*Stage_Names[s].length);
                last_stage_ypos = clamp(Mouse_Ypos-24,8,Inv_Top);
                centeredText(Large_Text,last_stage_xpos,last_stage_ypos,Stage_Names[s],0xFFFFFF,0x505050);
            }
        }
    }
    Large_Text.TX_spacing = 4;
    centeredText(Large_Text,Inv_Top,16,"World Map",-1,0xC8C8C8); // Top of map screen
    Large_Text.TX_spacing = 0;
    if (this.MAP_tile_horizontal_spacer<0)
        centeredText(Large_Text,12,16,"<<",0xC8C8C8,0x505050);
    if (this.MAP_tile_horizontal_spacer>-720)
        centeredText(Large_Text,Win_Width-12,16,">>",0xC8C8C8,0x505050);
};
