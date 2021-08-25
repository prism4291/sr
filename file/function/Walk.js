// walking function
function Walk(Stickman,char_ID,is_controlled){ // original name: Yg()
    var ranger_Xpos,ranger_Ypos,ranger_sight,ranger_target;
    var ranger_Xtile,ranger_Ytile;
    var hop_strength = 0.6;

    if (Sett_Auto_Move[char_ID]!=0 || Game_Mode==1){ // if automove is on or if in VS mode
        if (Stickman.PL_move_wait_ticks[char_ID]>0){
            Stickman.PL_move_wait_ticks[char_ID]--;
        } else if (!(floor(100*LP_Current[char_ID]/LP_Max[char_ID]<20) && Game_Mode!=1 && Sett_Move_If_Dying==0 && is_controlled==0)){ // if NOT LP is less than 20% and Move If Dying setting is off and in PvE mode
            ranger_Xpos = (Stickman.PL_joint[char_ID][9].x+Stickman.PL_joint[char_ID][10].x)>>1;
            ranger_Ypos = (Stickman.PL_joint[char_ID][9].y+Stickman.PL_joint[char_ID][10].y)>>1;
            ranger_sight = Range[char_ID];

            if (Game_Mode!=1){
                ranger_target = Enemies.ENfindEnemy(ranger_Xpos-200-ranger_sight,ranger_Ypos-20-ranger_sight,ranger_Xpos+200+ranger_sight,ranger_Ypos+100+ranger_sight);
                /** edit: delete "#" to stop priests from walking toward enemies outside their vertical range **#/
                if (Ranger_Class[char_ID]==5)
                    ranger_target = Enemies.ENfindEnemy(ranger_Xpos-200-ranger_sight,ranger_Ypos-20-(ranger_sight>>1),ranger_Xpos+200+ranger_sight,ranger_Ypos+100+ranger_sight);
                /***********************************************************************************************/
            }
            else
                ranger_target = Players.PLfindPlayer(ranger_Xpos-600,ranger_Ypos-300,ranger_Xpos+600,ranger_Ypos+300,getLeader(char_ID,1));

            /** edit: delete "#" to allow stickmen to be controlled with WASD **#/
            if (is_controlled){
                Stickman.PL_move_wait_ticks[char_ID] = 15;

                if (Is_Key_Held[100]){ // if holding D
                    ranger_Xtile = clamp(ranger_Xpos+14,0,Win_Width-1)>>3; // get right x tile pos
                    ranger_Ytile = clamp(ranger_Ypos-6,8,Win_Height-1)>>3; // get center y tile pos

                    if (0<=Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile] && Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile]<=8)
                        hop_strength = 2;
                    if (0<=Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile] && Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile]<=8) // if ranger is at a wall
                        hop_strength = 4;

                    if (Stickman.PL_joint[char_ID][9].x < Stickman.PL_joint[char_ID][10].x){
                        Stickman.PL_joint[char_ID][7].x += 4;
                        Stickman.PL_joint[char_ID][7].y -= 3*hop_strength;
                    } else {
                        Stickman.PL_joint[char_ID][8].x += 4;
                        Stickman.PL_joint[char_ID][8].y -= 3*hop_strength;
                    }
                } else {               // if holding A
                    ranger_Xtile = clamp(ranger_Xpos-14,0,Win_Width-1)>>3; // get left x tile pos
                    ranger_Ytile = clamp(ranger_Ypos-6,8,Win_Height-1)>>3; // get center y tile pos

                    if (Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile]>=0 && Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile]<=8)
                        hop_strength = 2;
                    if (Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile]>=0 && Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile]<=8)
                        hop_strength = 4;

                    if (Stickman.PL_joint[char_ID][9].x > Stickman.PL_joint[char_ID][10].x){
                        Stickman.PL_joint[char_ID][7].x -= 4; // stickman walking speed
                        Stickman.PL_joint[char_ID][7].y -= 3*hop_strength;
                    } else {
                        Stickman.PL_joint[char_ID][8].x -= 4; // stickman walking speed
                        Stickman.PL_joint[char_ID][8].y -= 3*hop_strength;
                    }
                }
            } else /**/ if (ranger_target!=-1){  // if target is found
                Stickman.PL_move_wait_ticks[char_ID] = 15;

                if (ranger_Xpos < (Game_Mode!=1? Enemies.EN_joint[ranger_target][Enemies.EN_center].x :Stickman.PL_joint[ranger_target][2].x)){ // if to the left of target
                    ranger_Xtile = clamp(ranger_Xpos+14,0,Win_Width-1)>>3; // get right x tile pos
                    ranger_Ytile = clamp(ranger_Ypos-6,8,Win_Height-1)>>3; // get center y tile pos

                    if (0<=Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile] && Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile]<=8)
                        hop_strength = 2;
                    if (0<=Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile] && Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile]<=8) // if ranger is at a wall
                        hop_strength = 4;

                    if (Stickman.PL_joint[char_ID][9].x < Stickman.PL_joint[char_ID][10].x){
                        Stickman.PL_joint[char_ID][7].x += 4;
                        Stickman.PL_joint[char_ID][7].y -= 3*hop_strength;
                    } else {
                        Stickman.PL_joint[char_ID][8].x += 4;
                        Stickman.PL_joint[char_ID][8].y -= 3*hop_strength;
                    }
                } else {                                                                                                                        // if to the right of target
                    ranger_Xtile = clamp(ranger_Xpos-14,0,Win_Width-1)>>3; // get left x tile pos
                    ranger_Ytile = clamp(ranger_Ypos-6,8,Win_Height-1)>>3; // get center y tile pos

                    if (Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile]>=0 && Terrain.TR_tile_data[ranger_Ytile][ranger_Xtile]<=8)
                        hop_strength = 2;
                    if (Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile]>=0 && Terrain.TR_tile_data[ranger_Ytile-1][ranger_Xtile]<=8)
                        hop_strength = 4;

                    if (Stickman.PL_joint[char_ID][9].x > Stickman.PL_joint[char_ID][10].x){
                        Stickman.PL_joint[char_ID][7].x -= 4; // stickman walking speed
                        Stickman.PL_joint[char_ID][7].y -= 3*hop_strength;
                    } else {
                        Stickman.PL_joint[char_ID][8].x -= 4; // stickman walking speed
                        Stickman.PL_joint[char_ID][8].y -= 3*hop_strength;
                    }
                }
            }
        }
    }
}
