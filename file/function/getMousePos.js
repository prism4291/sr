function getMousePos(event){ // original name: ai()
    var rect = cv.getBoundingClientRect();
    Mouse_Xpos2 = floor(event.clientX-rect.left);
    Mouse_Ypos2 = floor(event.clientY-rect.top);
}
