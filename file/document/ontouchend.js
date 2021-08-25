document.ontouchend = function(event){ // original name: vh.ontouchend
    if (event.touches.length<1)
        Left_Click_Is_Down = false;
    Right_Click_Is_Down = false;
    if (Mouse_In_Window)
        return false;
};
