function outlineRect(left,top,width,height,color){ // original name: bg()
    width--;
    height--;
    drawLine(left,top,left+width,top,color);
    drawLine(left,top+height,left+width,top+height,color);
    drawLine(left,top,left,top+height,color);
    drawLine(left+width,top,left+width,top+height,color);
}
