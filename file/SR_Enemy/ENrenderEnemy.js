window.fff = SR_Enemy.prototype.ENrenderEnemy;
SR_Enemy.prototype.ENrenderEnemy = function(){ // hh.prototype.b()
    var head_img,head_color,body_color,en_size,limb_size,hang_var;
    for (var i=0; i<this.EN_index_current; i++){
        head_img = EN_Info[this.EN_array_ID[i]][2];
        head_color = EN_Info[this.EN_array_ID[i]][4];
        body_color = EN_Info[this.EN_array_ID[i]][5];
        en_size = EN_Info[this.EN_array_ID[i]][EN_Size];

        if (this.EN_frozen_ticks[i]>0){
            head_color = 0x5A8EE1; // pale blue
            body_color = 0x1E5CD0; // blue
        } else if (this.EN_ice_ticks[i]>0){
            head_color = 0x1E5CD0; // blue
            body_color = 0x002670;    // navy blue
        } else if (this.EN_poison_ticks[i]>0){
            head_color = 0x33FF00; // light green
            body_color = 0x339900; // dark green
        }
        limb_size = (150-this.EN_piece_size[i])/150*en_size;

        switch (this.EN_species_ID[i]){
            case 0: // walker
                outlineRectCentered(floor(this.EN_joint[i][1].x-0.5),floor(this.EN_joint[i][1].y)-2*en_size,floor(4*limb_size)+1,floor(4*limb_size)+1,body_color);
                outlineRectCentered(floor(this.EN_joint[i][2].x-0.5),floor(this.EN_joint[i][2].y)-2*en_size,floor(4*limb_size)+1,floor(4*limb_size)+1,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 1: // snake
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][2].x),floor(this.EN_joint[i][2].y-2*limb_size),floor(8*limb_size),floor(8*limb_size),16*head_img,0,16,16,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][1].x),floor(this.EN_joint[i][1].y-3*limb_size),floor(12*limb_size),floor(12*limb_size),16*head_img,0,16,16,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y-4*limb_size),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 2: // bat
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][3].x,this.EN_joint[i][3].y,body_color);
                drawLine(this.EN_joint[i][3].x,this.EN_joint[i][3].y,this.EN_joint[i][1].x,this.EN_joint[i][1].y,body_color);
                drawLine(this.EN_joint[i][4].x,this.EN_joint[i][4].y,this.EN_joint[i][5].x,this.EN_joint[i][5].y,body_color);
                drawLine(this.EN_joint[i][5].x,this.EN_joint[i][5].y,this.EN_joint[i][6].x,this.EN_joint[i][6].y,body_color);
                drawLine(this.EN_joint[i][6].x,this.EN_joint[i][6].y,this.EN_joint[i][4].x,this.EN_joint[i][4].y,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 3: // dragon
                if (this.EN_state[i]<3){
                    drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][1].x,this.EN_joint[i][1].y,body_color);
                    drawLine(this.EN_joint[i][4].x,this.EN_joint[i][4].y,this.EN_joint[i][5].x,this.EN_joint[i][5].y,body_color);
                }
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][3].x,this.EN_joint[i][3].y,body_color);
                drawLine(this.EN_joint[i][3].x,this.EN_joint[i][3].y,this.EN_joint[i][4].x,this.EN_joint[i][4].y,body_color);
                filledRectCentered(floor(this.EN_joint[i][5].x),floor(this.EN_joint[i][5].y),floor(2*limb_size),floor(2*limb_size),head_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 4:  // stickman
            case 12: // zombie
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                if (this.EN_state[i]<3){
                    drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][3].x,this.EN_joint[i][3].y,body_color);
                    drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][4].x,this.EN_joint[i][4].y,body_color);
                }
                drawLine(this.EN_joint[i][3].x,this.EN_joint[i][3].y,this.EN_joint[i][5].x,this.EN_joint[i][5].y,body_color);
                drawLine(this.EN_joint[i][4].x,this.EN_joint[i][4].y,this.EN_joint[i][6].x,this.EN_joint[i][6].y,body_color);
                if (this.EN_state[i]<3){
                    drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][7].x,this.EN_joint[i][7].y,body_color);
                    drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][8].x,this.EN_joint[i][8].y,body_color);
                }
                drawLine(this.EN_joint[i][7].x,this.EN_joint[i][7].y,this.EN_joint[i][9].x,this.EN_joint[i][9].y,body_color);
                drawLine(this.EN_joint[i][8].x,this.EN_joint[i][8].y,this.EN_joint[i][10].x,this.EN_joint[i][10].y,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                if (this.EN_array_ID[i]==332)
                    dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y-3*limb_size),floor(16*limb_size),floor(16*limb_size),352,0,16,16,0xFFFFFF);
                break;
            case 5:  // tree
            case 18: // hanging tree
                if (this.EN_species_ID[i]==5)
                     hang_var = -2;
                else hang_var = 2;
                for (var j=this.EN_state[i]<10? this.EN_state[i]-1 :this.EN_state[i]-11; j>0; j--)
                    outlineRectCentered(floor(this.EN_joint[i][j].x),floor(this.EN_joint[i][j].y+hang_var*limb_size),floor(4*limb_size)+1,floor(4*limb_size)+1,body_color);
                if (this.EN_species_ID[i]==5)
                     dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color)
                else dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,15,16,-16,head_color);
                break;
            case 6: // wheel
                for (var j=1; j<6; j++)
                    drawLine(this.EN_joint[i][j].x,this.EN_joint[i][j].y,this.EN_joint[i][j+1].x,this.EN_joint[i][j+1].y,body_color);
                if (this.EN_state[i]<3)
                    drawLine(this.EN_joint[i][j].x,this.EN_joint[i][j].y,this.EN_joint[i][1].x,this.EN_joint[i][1].y,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 7: // fish
                drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][3].x,this.EN_joint[i][3].y,body_color);
                drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][4].x,this.EN_joint[i][4].y,body_color);
                drawLine(this.EN_joint[i][3].x,this.EN_joint[i][3].y,this.EN_joint[i][4].x,this.EN_joint[i][4].y,body_color);
                outlineRectCentered(floor(this.EN_joint[i][1].x),floor(this.EN_joint[i][1].y),floor(6*limb_size)+1,floor(6*limb_size)+1,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 8: // mushroom
                outlineRectCentered(floor(this.EN_joint[i][2].x)+floor(1*limb_size),floor(this.EN_joint[i][2].y-2*limb_size),floor(8*limb_size)+1,floor(4*limb_size)+1,body_color);
                outlineRectCentered(floor(this.EN_joint[i][1].x),floor(this.EN_joint[i][1].y-2*limb_size),floor(4*limb_size)+1,floor(4*limb_size)+1,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 9:  // eel (swimming)
            case 13: // eel (flying)
                filledRectCentered(floor(this.EN_joint[i][5].x),floor(this.EN_joint[i][5].y),floor(2*limb_size),floor(2*limb_size),head_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][4].x),floor(this.EN_joint[i][4].y),floor(8*limb_size),floor(8*limb_size),16*head_img,0,16,16,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][3].x),floor(this.EN_joint[i][3].y),floor(10*limb_size),floor(10*limb_size),16*head_img,0,16,16,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][2].x),floor(this.EN_joint[i][2].y),floor(12*limb_size),floor(12*limb_size),16*head_img,0,16,16,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][1].x),floor(this.EN_joint[i][1].y),floor(14*limb_size),floor(14*limb_size),16*head_img,0,16,16,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 10: // spider
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                if (this.EN_state[i]<3){
                    drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][1].x,this.EN_joint[i][1].y,body_color);
                    drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][3].x,this.EN_joint[i][3].y,body_color);
                }
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                drawLine(this.EN_joint[i][3].x,this.EN_joint[i][3].y,this.EN_joint[i][4].x,this.EN_joint[i][4].y,body_color);
                if (this.EN_state[i]<3){
                    drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][5].x,this.EN_joint[i][5].y,body_color);
                    drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][7].x,this.EN_joint[i][7].y,body_color);
                }
                drawLine(this.EN_joint[i][5].x,this.EN_joint[i][5].y,this.EN_joint[i][6].x,this.EN_joint[i][6].y,body_color);
                drawLine(this.EN_joint[i][7].x,this.EN_joint[i][7].y,this.EN_joint[i][8].x,this.EN_joint[i][8].y,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 11: // cactus
                outlineRectCentered(floor(this.EN_joint[i][3].x),floor(this.EN_joint[i][3].y-7*limb_size),floor(4*limb_size)+1,floor(14*limb_size)+1,body_color);
                outlineRectCentered(floor(this.EN_joint[i][2].x)+0,floor(this.EN_joint[i][2].y),floor(4*limb_size)+1,floor(9*limb_size)+1,body_color);
                outlineRectCentered(floor(this.EN_joint[i][1].x)+1,floor(this.EN_joint[i][1].y),floor(4*limb_size)+1,floor(8*limb_size)+1,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x)+1,floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 14: // copter
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                drawLine(this.EN_joint[i][2].x,this.EN_joint[i][2].y,this.EN_joint[i][3].x,this.EN_joint[i][3].y,body_color);
                drawLine(this.EN_joint[i][3].x,this.EN_joint[i][3].y,this.EN_joint[i][1].x,this.EN_joint[i][1].y,body_color);
                dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 15: // bouncer
                drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][1].x,this.EN_joint[i][1].y,body_color);
                drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                drawLine(this.EN_joint[i][1].x,this.EN_joint[i][1].y,this.EN_joint[i][2].x,this.EN_joint[i][2].y,body_color);
                if (this.EN_state[i]<2)
                     dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                else dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][3].x),floor(this.EN_joint[i][3].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;
            case 16: // germ
                if (this.EN_state[i]<2){
                    for (var j=1; j<4; j++)
                        drawLine(this.EN_joint[i][0].x,this.EN_joint[i][0].y,this.EN_joint[i][j].x,this.EN_joint[i][j].y,body_color);
                }
                for (var j=4; j<10; j++)
                    drawLine(this.EN_joint[i][j-3].x,this.EN_joint[i][j-3].y,this.EN_joint[i][j].x,this.EN_joint[i][j].y,body_color);
                if (this.EN_state[i]<2){
                    for (var j=7; j<10; j++)
                        filledRectCentered(floor(this.EN_joint[i][j].x),floor(this.EN_joint[i][j].y),floor(2*en_size),floor(2*en_size),head_color);
                } else {
                    for (var j=7; j<10; j++)
                        filledRectCentered(floor(this.EN_joint[i][j].x)+1,floor(this.EN_joint[i][j].y)+1,floor(2*limb_size),floor(2*limb_size),head_color);
                }
                if (this.EN_state[i]<2)
                     dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*en_size),floor(16*en_size),16*head_img,0,16,16,head_color);
                else dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                break;

            case 17: // digger
                if (this.EN_state[i]<10){
                    for (var j=this.EN_state[i]-1; j>0; j--)
                        filledRectCentered(floor(this.EN_joint[i][j].x),floor(this.EN_joint[i][j].y-2*en_size),floor(4*en_size),floor(4*en_size),body_color);
                    dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*en_size),floor(16*en_size),16*head_img,0,16,16,head_color);
                } else {
                    for (var j=this.EN_state[i]-11; j>0; j--)
                        outlineRectCentered(floor(this.EN_joint[i][j].x),floor(this.EN_joint[i][j].y-2*limb_size),floor(4*limb_size)+1,floor(4*limb_size)+1,body_color);
                    dispItemCentered(Enemy_Head_Img,floor(this.EN_joint[i][0].x),floor(this.EN_joint[i][0].y),floor(16*limb_size),floor(16*limb_size),16*head_img,0,16,16,head_color);
                }
        }
        if ((Sett_LP_Bar_Disp&2)>0 && this.EN_health[i]>0){
            filledRect(floor(this.EN_joint[i][0].x)-6*en_size,floor(this.EN_joint[i][0].y)-10*en_size,12*en_size,1,0x990000); // red
            filledRect(floor(this.EN_joint[i][0].x)-6*en_size,floor(this.EN_joint[i][0].y)-10*en_size,floor(12*en_size*this.EN_health[i]/EN_Info[this.EN_array_ID[i]][EN_LP]),1,0x00CC00); // green
        }
    }
};
