// output enemy icon for book and in-stage info
SR_Enemy.prototype.ENdrawIcon = function(array_ID,x_pos,y_pos,if_not_book){ // hh.prototype.M
    var en_head = EN_Info[array_ID][2];
    var head_color = EN_Info[array_ID][4];
    var body_color = EN_Info[array_ID][5];
    var en_size = clamp(EN_Info[array_ID][EN_Size],1,4);
    if (if_not_book==1)
        en_size = 1;
    scale = en_size;
    var joint_Xpos = [0,0,0,0,0,0,0,0,0,0,0];
    var joint_Ypos = [0,0,0,0,0,0,0,0,0,0,0];
    switch (EN_Info[array_ID][EN_Species]){
        case 0: // walker
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-7*scale;
            joint_Xpos[1] = x_pos-5.5*scale; // left foot
            joint_Ypos[1] = y_pos-0*scale;
            joint_Xpos[2] = x_pos+6*scale; // right foot
            joint_Ypos[2] = y_pos-0*scale;
            break;
        case 1: // snake
            joint_Xpos[0] = x_pos-3*scale; // head segment
            joint_Ypos[0] = y_pos-8*scale;
            joint_Xpos[1] = x_pos+1*scale; // middle segment
            joint_Ypos[1] = y_pos-7*scale;
            joint_Xpos[2] = x_pos+4*scale; // tail segment
            joint_Ypos[2] = y_pos-1*scale;
            break;
        case 2: // bat
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-8*scale;
            joint_Xpos[1] = x_pos-4*scale; // left wing inside tip
            joint_Ypos[1] = y_pos-8*scale;
            joint_Xpos[2] = x_pos-9*scale; // left wing top tip
            joint_Ypos[2] = y_pos-9*scale;
            joint_Xpos[3] = x_pos-7*scale; // left wing bottom tip
            joint_Ypos[3] = y_pos-4*scale;
            joint_Xpos[4] = x_pos+3*scale; // right wing inside tip
            joint_Ypos[4] = y_pos-8*scale;
            joint_Xpos[5] = x_pos+9*scale; // right wing top tip
            joint_Ypos[5] = y_pos-10*scale;
            joint_Xpos[6] = x_pos+7*scale; // right wing bottom tip
            joint_Ypos[6] = y_pos-4*scale;
            break;
        case 3: // dragon
            joint_Xpos[0] = x_pos-3*scale; // head
            joint_Ypos[0] = y_pos-10*scale;
            joint_Xpos[1] = x_pos+1*scale; // tail
            joint_Ypos[1] = y_pos-10*scale;         // (body in order from tail (4) to head (1))
            joint_Xpos[2] = x_pos+4*scale; // body 4
            joint_Ypos[2] = y_pos-8*scale;
            joint_Xpos[3] = x_pos+5*scale; // body 3
            joint_Ypos[3] = y_pos-6*scale;
            joint_Xpos[4] = x_pos+5*scale; // body 2
            joint_Ypos[4] = y_pos-4*scale;
            joint_Xpos[5] = x_pos+3*scale; // body 1
            joint_Ypos[5] = y_pos-1*scale;
            break;
        case 4: // stickman
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-15*scale;
            joint_Xpos[1] = x_pos+0*scale; // neck
            joint_Ypos[1] = y_pos-10*scale;
            joint_Xpos[2] = x_pos+0*scale; // crotch
            joint_Ypos[2] = y_pos-7*scale;
            joint_Xpos[3] = x_pos-2*scale; // left elbow
            joint_Ypos[3] = y_pos-8*scale;
            joint_Xpos[4] = x_pos+3*scale; // right elbow
            joint_Ypos[4] = y_pos-11*scale;
            joint_Xpos[5] = x_pos-5*scale; // left hand
            joint_Ypos[5] = y_pos-7*scale;
            joint_Xpos[6] = x_pos+5*scale; // right hand
            joint_Ypos[6] = y_pos-8*scale;
            joint_Xpos[7] = x_pos-3*scale; // left knee
            joint_Ypos[7] = y_pos-3*scale;
            joint_Xpos[8] = x_pos+3*scale; // right knee
            joint_Ypos[8] = y_pos-5*scale;
            joint_Xpos[9] = x_pos-1*scale; // left foot
            joint_Ypos[9] = y_pos-1*scale;
            joint_Xpos[10] = x_pos+2*scale; // right foot
            joint_Ypos[10] = y_pos-0*scale;
            break;
        case 5: // tree
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-20*scale;
            joint_Xpos[1] = x_pos+0*scale; // neck segment
            joint_Ypos[1] = y_pos-12*scale;
            joint_Xpos[2] = x_pos-1*scale; // middle segment
            joint_Ypos[2] = y_pos-6*scale;
            joint_Xpos[3] = x_pos+0*scale; // base segment
            joint_Ypos[3] = y_pos-0*scale;
            break;
        case 18: // tree (hanging)
            scale = clamp(scale,1,2);
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos+20*scale-40;
            joint_Xpos[1] = x_pos+0*scale; // neck segment
            joint_Ypos[1] = y_pos+12*scale-40;
            joint_Xpos[2] = x_pos-1*scale; // middle segment
            joint_Ypos[2] = y_pos+6*scale-40;
            joint_Xpos[3] = x_pos+0*scale; // base segment
            joint_Ypos[3] = y_pos+0*scale-40;
            break;
        case 6: // wheel
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-10*scale;
            joint_Xpos[1] = x_pos-7*scale; // top left corner
            joint_Ypos[1] = y_pos-19*scale;
            joint_Xpos[2] = x_pos+5*scale; // top right corner
            joint_Ypos[2] = y_pos-21*scale;
            joint_Xpos[3] = x_pos+12*scale; // right corner
            joint_Ypos[3] = y_pos-12*scale;
            joint_Xpos[4] = x_pos+7*scale; // bottom right corner
            joint_Ypos[4] = y_pos-2*scale;
            joint_Xpos[5] = x_pos-5*scale; // bottom left corner
            joint_Ypos[5] = y_pos-0*scale;
            joint_Xpos[6] = x_pos-12*scale; // left corner
            joint_Ypos[6] = y_pos-10*scale;
            break;
        case 7: // fish
            joint_Xpos[0] = x_pos-5*scale; // head
            joint_Ypos[0] = y_pos-13*scale;
            joint_Xpos[1] = x_pos+0*scale; // body
            joint_Ypos[1] = y_pos-9*scale;
            joint_Xpos[2] = x_pos+5*scale; // tail base
            joint_Ypos[2] = y_pos-6*scale;
            joint_Xpos[3] = x_pos+8*scale; // clockwise (from base) tail top
            joint_Ypos[3] = y_pos-11*scale;
            joint_Xpos[4] = x_pos+10*scale; // counter-clockwise (from base) tail top
            joint_Ypos[4] = y_pos-3*scale;
            break;
        case 8: // mushroom
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-12*scale;
            joint_Xpos[1] = x_pos+0*scale; // stem
            joint_Ypos[1] = y_pos-5*scale;
            joint_Xpos[2] = x_pos+0*scale; // base
            joint_Ypos[2] = y_pos-0*scale;
            break;
        case 9:  // eel (swimming)
        case 13: // eel (flying)
            joint_Xpos[0] = x_pos-4*scale; // head
            joint_Ypos[0] = y_pos-20*scale;
            joint_Xpos[1] = x_pos+2*scale; // body 1
            joint_Ypos[1] = y_pos-16*scale;
            joint_Xpos[2] = x_pos+4*scale; // body 2
            joint_Ypos[2] = y_pos-11*scale;
            joint_Xpos[3] = x_pos+2*scale; // body 3
            joint_Ypos[3] = y_pos-6*scale;
            joint_Xpos[4] = x_pos-1*scale; // body 4
            joint_Ypos[4] = y_pos-3*scale;
            joint_Xpos[5] = x_pos-5*scale; // tail
            joint_Ypos[5] = y_pos-2*scale;
            break;
        case 10: // spider
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-6*scale;
            joint_Xpos[1] = x_pos-9*scale; // outer left knee
            joint_Ypos[1] = y_pos-9*scale;
            joint_Xpos[2] = x_pos-7*scale; // outer left foot
            joint_Ypos[2] = y_pos-0*scale;
            joint_Xpos[3] = x_pos+9*scale; // outer right knee
            joint_Ypos[3] = y_pos-9*scale;
            joint_Xpos[4] = x_pos+7*scale; // outer right foot
            joint_Ypos[4] = y_pos-0*scale;
            joint_Xpos[5] = x_pos-7*scale; // inner left knee
            joint_Ypos[5] = y_pos-5*scale;
            joint_Xpos[6] = x_pos-5*scale; // inner left foot
            joint_Ypos[6] = y_pos-0*scale;
            joint_Xpos[7] = x_pos+7*scale; // inner right knee
            joint_Ypos[7] = y_pos-5*scale;
            joint_Xpos[8] = x_pos+5*scale; // inner right foot
            joint_Ypos[8] = y_pos-0*scale;
            break;
        case 11: // cactus
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-19*scale;
            joint_Xpos[1] = x_pos-8*scale; // left branch
            joint_Ypos[1] = y_pos-13*scale;
            joint_Xpos[2] = x_pos+8*scale; // right branch
            joint_Ypos[2] = y_pos-18*scale;
            joint_Xpos[3] = x_pos+0*scale; // trunk
            joint_Ypos[3] = y_pos-0*scale;
            break;
        case 12: // zombie
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-16*scale;
            joint_Xpos[1] = x_pos+0*scale; // neck
            joint_Ypos[1] = y_pos-10*scale;
            joint_Xpos[2] = x_pos+2*scale; // crotch
            joint_Ypos[2] = y_pos-7*scale;
            joint_Xpos[3] = x_pos-2*scale; // left elbow
            joint_Ypos[3] = y_pos-8*scale;
            joint_Xpos[4] = x_pos-3*scale; // right elbow
            joint_Ypos[4] = y_pos-11*scale;
            joint_Xpos[5] = x_pos-5*scale; // left hand
            joint_Ypos[5] = y_pos-7*scale;
            joint_Xpos[6] = x_pos-8*scale; // right hand
            joint_Ypos[6] = y_pos-10*scale;
            joint_Xpos[7] = x_pos-1*scale; // left knee
            joint_Ypos[7] = y_pos-4*scale;
            joint_Xpos[8] = x_pos+2*scale; // right knee
            joint_Ypos[8] = y_pos-5*scale;
            joint_Xpos[9] = x_pos-0*scale; // left foot
            joint_Ypos[9] = y_pos-1*scale;
            joint_Xpos[10] = x_pos+4*scale; // right foot
            joint_Ypos[10] = y_pos-0*scale;
            break;
        case 14: // copter
            joint_Xpos[0] = x_pos+0*scale; // head
            joint_Ypos[0] = y_pos-8*scale;
            joint_Xpos[1] = x_pos-0*scale; // body base
            joint_Ypos[1] = y_pos-14*scale;
            joint_Xpos[2] = x_pos-8*scale; // left tip
            joint_Ypos[2] = y_pos-16*scale;
            joint_Xpos[3] = x_pos+8*scale; // right tip
            joint_Ypos[3] = y_pos-16*scale;
            break;
        case 15: // bouncer
            joint_Xpos[0] = x_pos-1*scale; // head
            joint_Ypos[0] = y_pos-12*scale;
            joint_Xpos[1] = x_pos-3*scale; // left base tip
            joint_Ypos[1] = y_pos-0*scale;
            joint_Xpos[2] = x_pos+3*scale; // right base tip
            joint_Ypos[2] = y_pos-0*scale;
            break;
        case 16: // germ
            joint_Xpos[0] = x_pos-0*scale; // head
            joint_Ypos[0] = y_pos-10*scale;
            joint_Xpos[1] = x_pos-3*scale; // left leg knee 1
            joint_Ypos[1] = y_pos-11*scale;
            joint_Xpos[4] = x_pos-6*scale; // left leg knee 2
            joint_Ypos[4] = y_pos-12*scale;
            joint_Xpos[7] = x_pos-9*scale; // left tip
            joint_Ypos[7] = y_pos-13*scale;
            joint_Xpos[2] = x_pos+3*scale; // right leg knee 1
            joint_Ypos[2] = y_pos-11*scale;
            joint_Xpos[5] = x_pos+6*scale; // right leg knee 2
            joint_Ypos[5] = y_pos-12*scale;
            joint_Xpos[8] = x_pos+8*scale; // right tip
            joint_Ypos[8] = y_pos-14*scale;
            joint_Xpos[3] = x_pos+1*scale; // bottom leg knee 1
            joint_Ypos[3] = y_pos-7*scale;
            joint_Xpos[6] = x_pos+2*scale; // bottom leg knee 2
            joint_Ypos[6] = y_pos-4*scale;
            joint_Xpos[9] = x_pos+1*scale; // bottom tip
            joint_Ypos[9] = y_pos-1*scale;
            break;
        case 17: // digger
            joint_Xpos[0] = x_pos+2*scale; // head
            joint_Ypos[0] = y_pos-16*scale;
            joint_Xpos[1] = x_pos+2*scale; // neck segment
            joint_Ypos[1] = y_pos-6*scale;
            joint_Xpos[2] = x_pos-3*scale; // body segment
            joint_Ypos[2] = y_pos-5*scale;
            joint_Xpos[3] = x_pos-2*scale; // base segment
            joint_Ypos[3] = y_pos-0*scale;
            break;
    }
    switch (EN_Info[array_ID][EN_Species]){
        case 0: // walker
            outlineRectCentered(floor(joint_Xpos[1]-0.5),floor(joint_Ypos[1])-2*en_size,floor(4*scale)+1,floor(4*scale)+1,body_color);
            outlineRectCentered(floor(joint_Xpos[2]-0.5),floor(joint_Ypos[2])-2*en_size,floor(4*scale)+1,floor(4*scale)+1,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 1: // snake
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[2]),floor(joint_Ypos[2]-2*scale),floor(8*scale),floor(8*scale),16*en_head,0,16,16,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[1]),floor(joint_Ypos[1]-3*scale),floor(12*scale),floor(12*scale),16*en_head,0,16,16,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]-4*scale),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 2: // bat
            drawLine(joint_Xpos[1],joint_Ypos[1],joint_Xpos[2],joint_Ypos[2],body_color);
            drawLine(joint_Xpos[2],joint_Ypos[2],joint_Xpos[3],joint_Ypos[3],body_color);
            drawLine(joint_Xpos[3],joint_Ypos[3],joint_Xpos[1],joint_Ypos[1],body_color);
            drawLine(joint_Xpos[4],joint_Ypos[4],joint_Xpos[5],joint_Ypos[5],body_color);
            drawLine(joint_Xpos[5],joint_Ypos[5],joint_Xpos[6],joint_Ypos[6],body_color);
            drawLine(joint_Xpos[6],joint_Ypos[6],joint_Xpos[4],joint_Ypos[4],body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 3: // dragon
            drawLine(joint_Xpos[0],joint_Ypos[0],joint_Xpos[1],joint_Ypos[1],body_color);
            drawLine(joint_Xpos[4],joint_Ypos[4],joint_Xpos[5],joint_Ypos[5],body_color);
            drawLine(joint_Xpos[1],joint_Ypos[1],joint_Xpos[2],joint_Ypos[2],body_color);
            drawLine(joint_Xpos[2],joint_Ypos[2],joint_Xpos[3],joint_Ypos[3],body_color);
            drawLine(joint_Xpos[3],joint_Ypos[3],joint_Xpos[4],joint_Ypos[4],body_color);
            filledRectCentered(floor(joint_Xpos[5]),floor(joint_Ypos[5]),floor(2*scale),floor(2*scale),head_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 4:  // stickman
        case 12: // zombie
            drawLine(joint_Xpos[1],joint_Ypos[1],joint_Xpos[2],joint_Ypos[2],body_color);
            drawLine(joint_Xpos[1],joint_Ypos[1],joint_Xpos[3],joint_Ypos[3],body_color);
            drawLine(joint_Xpos[1],joint_Ypos[1],joint_Xpos[4],joint_Ypos[4],body_color);
            drawLine(joint_Xpos[3],joint_Ypos[3],joint_Xpos[5],joint_Ypos[5],body_color);
            drawLine(joint_Xpos[4],joint_Ypos[4],joint_Xpos[6],joint_Ypos[6],body_color);
            drawLine(joint_Xpos[2],joint_Ypos[2],joint_Xpos[7],joint_Ypos[7],body_color);
            drawLine(joint_Xpos[2],joint_Ypos[2],joint_Xpos[8],joint_Ypos[8],body_color);
            drawLine(joint_Xpos[7],joint_Ypos[7],joint_Xpos[9],joint_Ypos[9],body_color);
            drawLine(joint_Xpos[8],joint_Ypos[8],joint_Xpos[10],joint_Ypos[10],body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            if (array_ID==332)
                dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]-3*scale),floor(16*scale),floor(16*scale),352,0,16,16,0xFFD700);
            break;
        case 5: // tree
            for (var i=3; i>0; i--)
                outlineRectCentered(floor(joint_Xpos[i]),floor(joint_Ypos[i]-2*scale),floor(4*scale)+1,floor(4*scale)+1,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 18: // tree (hanging)
            scale = clamp(scale,1,2);
            for (var i=3; i>0; i--)
                outlineRectCentered(floor(joint_Xpos[i]),floor(joint_Ypos[i]+2*scale),floor(4*scale)+1,floor(4*scale)+1,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,15,16,-16,head_color);
            break;
        case 6: // wheel
            for (var i=1; i<6; i++) drawLine(joint_Xpos[i],joint_Ypos[i],joint_Xpos[i+1],joint_Ypos[i+1],body_color);
            drawLine(joint_Xpos[i],joint_Ypos[i],joint_Xpos[1],joint_Ypos[1],body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 7: // fish
            drawLine(joint_Xpos[2],joint_Ypos[2],joint_Xpos[3],joint_Ypos[3],body_color);
            drawLine(joint_Xpos[2],joint_Ypos[2],joint_Xpos[4],joint_Ypos[4],body_color);
            drawLine(joint_Xpos[3],joint_Ypos[3],joint_Xpos[4],joint_Ypos[4],body_color);
            outlineRectCentered(floor(joint_Xpos[1]),floor(joint_Ypos[1]),floor(6*scale)+1,floor(6*scale)+1,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 8: // mushroom
            outlineRectCentered(floor(joint_Xpos[2])+floor(1*scale),floor(joint_Ypos[2]-2*scale),floor(8*scale)+1,floor(4*scale)+1,body_color);
            outlineRectCentered(floor(joint_Xpos[1]),floor(joint_Ypos[1]-2*scale),floor(4*scale)+1,floor(4*scale)+1,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 9:  // eel (swimming)
        case 13: // eel (flying)
            filledRectCentered(floor(joint_Xpos[5]),floor(joint_Ypos[5]),floor(2*scale),floor(2*scale),head_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[4]),floor(joint_Ypos[4]),floor(8*scale),floor(8*scale),16*en_head,0,16,16,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[3]),floor(joint_Ypos[3]),floor(10*scale),floor(10*scale),16*en_head,0,16,16,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[2]),floor(joint_Ypos[2]),floor(12*scale),floor(12*scale),16*en_head,0,16,16,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[1]),floor(joint_Ypos[1]),floor(14*scale),floor(14*scale),16*en_head,0,16,16,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 10: // spider
            drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[1]),floor(joint_Ypos[1]),body_color);
            drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[3]),floor(joint_Ypos[3]),body_color);
            drawLine(floor(joint_Xpos[1]),floor(joint_Ypos[1]),floor(joint_Xpos[2]),floor(joint_Ypos[2]),body_color);
            drawLine(floor(joint_Xpos[3]),floor(joint_Ypos[3]),floor(joint_Xpos[4]),floor(joint_Ypos[4]),body_color);
            drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[5]),floor(joint_Ypos[5]),body_color);
            drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[7]),floor(joint_Ypos[7]),body_color);
            drawLine(floor(joint_Xpos[5]),floor(joint_Ypos[5]),floor(joint_Xpos[6]),floor(joint_Ypos[6]),body_color);
            drawLine(floor(joint_Xpos[7]),floor(joint_Ypos[7]),floor(joint_Xpos[8]),floor(joint_Ypos[8]),body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 11: // cactus
            outlineRectCentered(floor(joint_Xpos[3]),floor(joint_Ypos[3]-7*scale),floor(4*scale)+1,floor(14*scale)+1,body_color);
            outlineRectCentered(floor(joint_Xpos[2])+0,floor(joint_Ypos[2]),floor(4*scale)+1,floor(9*scale)+1,body_color);
            outlineRectCentered(floor(joint_Xpos[1])+1,floor(joint_Ypos[1]),floor(4*scale)+1,floor(8*scale)+1,body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0])+1,floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 14: // copter
            drawLine(floor(joint_Xpos[1]),floor(joint_Ypos[1]),floor(joint_Xpos[2]),floor(joint_Ypos[2]),body_color);
            drawLine(floor(joint_Xpos[1]),floor(joint_Ypos[1]),floor(joint_Xpos[3]),floor(joint_Ypos[3]),body_color);
            drawLine(floor(joint_Xpos[2]),floor(joint_Ypos[2]),floor(joint_Xpos[3]),floor(joint_Ypos[3]),body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 15: // bouncer
            drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[1]),floor(joint_Ypos[1]),body_color);
            drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[2]),floor(joint_Ypos[2]),body_color);
            drawLine(floor(joint_Xpos[1]),floor(joint_Ypos[1]),floor(joint_Xpos[2]),floor(joint_Ypos[2]),body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 16: // germ
            for (var i=1; i<4; i++)
                drawLine(floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(joint_Xpos[i]),floor(joint_Ypos[i]),body_color);
            for (var i=4; i<10; i++)
                drawLine(floor(joint_Xpos[i-3]),floor(joint_Ypos[i-3]),floor(joint_Xpos[i]),floor(joint_Ypos[i]),body_color);
            for (var i=7; i<10; i++)
                filledRectCentered(floor(joint_Xpos[i]),floor(joint_Ypos[i]),floor(2*scale),floor(2*scale),head_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
            break;
        case 17: // digger
            for (var i=3; i>0; i--)
                filledRectCentered(floor(joint_Xpos[i]),floor(joint_Ypos[i]-2*scale),floor(4*scale),floor(4*scale),body_color);
            dispItemCentered(Enemy_Head_Img,floor(joint_Xpos[0]),floor(joint_Ypos[0]),floor(16*scale),floor(16*scale),16*en_head,0,16,16,head_color);
    }
};
