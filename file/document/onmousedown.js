document.onmousedown = function(event){ // original name: vh.onmousedown
    getMousePos(event);
    Mouse_In_Window = false;
    if (!(Mouse_Xpos2<0 || Win_Width<=Mouse_Xpos2 || Mouse_Ypos2<0 || Win_Height<=Mouse_Ypos2)){
        Mouse_In_Window = true;
        if (event.button==0)
            Left_Click_Is_Down = true;
        if (event.button==2)
            Right_Click_Is_Down = true;
        //if (Mouse_In_Window)
        return false;
    }
};
