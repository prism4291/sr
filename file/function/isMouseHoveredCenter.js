function isMouseHoveredCenter(x_pos,y_pos,width,height){ // original name: Df()
    var left = x_pos-(width>>1);
    var top = y_pos-(height>>1);
    return isMouseHovered(left,top,width,height);
}
