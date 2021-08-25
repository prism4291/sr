function outlineRectCentered(x_pos,y_pos,width,height,color){ // original name: If()
    var left = x_pos-(width>>1);
    var top = y_pos-(height>>1);
    outlineRect(left,top,width,height,color);
}
