// swimming
function Swim(Stickman,char_ID){ // original name: Zg()
    var ranger_Xpos,ranger_Ypos,ranger_target;
    if (Sett_Auto_Move[char_ID]==1 && (floor(100*LP_Current[char_ID]/LP_Max[char_ID]>20) || Sett_Move_If_Dying==1)){
        ranger_Xpos = (Stickman.PL_joint[char_ID][9].x+Stickman.PL_joint[char_ID][10].x)>>1;
        ranger_Ypos = (Stickman.PL_joint[char_ID][9].y+Stickman.PL_joint[char_ID][10].y)>>1;

        if (Game_Mode!=1)
             ranger_target = Enemies.ENfindEnemy(ranger_Xpos-200-Range[char_ID],ranger_Ypos-100-Range[char_ID],ranger_Xpos+200+Range[char_ID],ranger_Ypos+100+Range[char_ID]);
        else ranger_target = Players.PLfindPlayer(ranger_Xpos-600,ranger_Ypos-300,ranger_Xpos+600,ranger_Ypos+300,getLeader(char_ID,1));

        if (ranger_target!=-1 && Terrain.TR_tile_data[clamp(ranger_Ypos,8,Win_Height-1)>>3][clamp(ranger_Xpos,0,Win_Width-1)>>3]==9){ // if target is found and stickman is in water
            if (ranger_Xpos < (Game_Mode!=1? Enemies.EN_joint[ranger_target][Enemies.EN_center].x :Stickman.PL_joint[ranger_target][2].x)){ // if target is to the right
                Stickman.PL_joint[char_ID][0].x += 0.25; // swim right
                Stickman.PL_joint[char_ID][1].x += 0.25;
            } else { // if target is to the left
                Stickman.PL_joint[char_ID][0].x -= 0.25; // swim left
                Stickman.PL_joint[char_ID][1].x -= 0.25;
            }
            if (ranger_Ypos < (Game_Mode!=1? Enemies.EN_joint[ranger_target][Enemies.EN_center].y :Stickman.PL_joint[ranger_target][2].y)){ // if target is below
                /** edit: stickmen no longer swim into corners if enemy is on the other side of a wall **#/
                if (Selected_Player==0 && -1<=Terrain.TR_tile_data[(clamp(ranger_Ypos-6,8,Win_Height-1)>>3)-1][(clamp(ranger_Xpos+14,0,Win_Width-1)>>3)] && Terrain.TR_tile_data[(clamp(ranger_Ypos-6,8,Win_Height-1)>>3)-1][(clamp(ranger_Xpos+14,0,Win_Width-1)>>3)]<=8){
                    Stickman.PL_joint[char_ID][0].y -= 0.25;
                    Stickman.PL_joint[char_ID][1].y -= 0.25;
                } else {
                /****************************************************************************************/
                    Stickman.PL_joint[char_ID][0].y += 0.25; // swim down
                    Stickman.PL_joint[char_ID][1].y += 0.25;
                /****************************************************************************************#/
                }
                /****************************************************************************************/
            } else { // if target is above
                Stickman.PL_joint[char_ID][0].y -= 0.25; // swim up
                Stickman.PL_joint[char_ID][1].y -= 0.25;
            }

            Stickman.PL_joint[char_ID][0].x += randomRange(-0.25,0.25);
            Stickman.PL_joint[char_ID][0].y += randomRange(-0.25,0.25);
            Stickman.PL_joint[char_ID][1].x += randomRange(-0.25,0.25);
            Stickman.PL_joint[char_ID][1].y += randomRange(-0.25,0.25);
        }
    }
}
