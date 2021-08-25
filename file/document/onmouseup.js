document.onmouseup = function(event){ // original name: vh.onmouseup
    getMousePos(event);
    if (event.button==0)
        Left_Click_Is_Down = false;
    if (event.button==2)
        Right_Click_Is_Down = false;
};
