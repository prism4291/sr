// set this.PL_held_player
window.fff = SR_Player.prototype.PLsetHeldChar;
SR_Player.prototype.PLsetHeldChar = function(){ // Pg.prototype.jb
    var dist_vector = new Vector2D;
    var grab_reach = 20;
    var dist_from_cursor;
    var prev_dist_from_cursor = grab_reach;

    if (Left_Click_Is_Up){ // if mouse button is released, let go of stickman
        this.PL_held_player = -1;
        this.PL_held_joint = 0;
    } else if (Game_Mode!=1 && Clicked){
        for (var s=0; s<Stickmen_Slots; s++){
            for (var j=0; j<10; j++){
                dist_vector.x = Mouse_Xpos-this.PL_joint_destination[s][j].x;
                dist_vector.y = Mouse_Ypos-this.PL_joint_destination[s][j].y;
                dist_from_cursor = magnitudeOf(dist_vector);
                if (dist_from_cursor<grab_reach && dist_from_cursor<prev_dist_from_cursor && (LP_Current[s]!=0 || Sett_Drag_Dead_Body!=0)){
                    prev_dist_from_cursor = dist_from_cursor;
                    this.PL_held_player = s;
                    this.PL_held_joint = j;
                    Selected_Player = s;
                }
            }
        }
    }
};
