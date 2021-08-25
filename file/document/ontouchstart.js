document.ontouchstart = function(event){ // original name: vh.ontouchstart
    ci(event);
    Mouse_In_Window = Right_Click_Is_Down = Left_Click_Is_Down = false;
    if (!(Mouse_Xpos2<0 || Win_Width<=Mouse_Xpos2 || Mouse_Ypos2<0 || Win_Height<=Mouse_Ypos2)){
        Left_Click_Is_Down = Mouse_In_Window = true;
        if (event.touches.length>1)
            Right_Click_Is_Down = true;
        return false;
    }
};
