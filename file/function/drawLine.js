function drawLine(pointA_xpos,pointA_ypos,pointB_xpos,pointB_ypos,color){ // original name: L()
    var width = pointB_xpos - pointA_xpos;
    var height = pointB_ypos - pointA_ypos;
    var pixel_pos,distance;

    if (absVal(width) >= absVal(height)){
        distance = floor(absVal(width));
        if (distance!=0)
            height = floor(65536*height/distance);
        if (width>=0)
            width = 65536;
        else
            width = -65536;
    } else {
        distance = floor(absVal(height));
        if (distance!=0)
            width = floor(65536*width/distance);
        if (height>=0)
            height = 65536;
        else
            height = -65536;
    }

    pointA_xpos = floor(65536*pointA_xpos)+32768;
    pointA_ypos = floor(65536*pointA_ypos)+32768;

    for (var i=distance; i>=0; i--){
        if (pointA_xpos>=0 && pointA_xpos>>16 < Win_Width && pointA_ypos>=0 && pointA_ypos>>16 < Win_Height){
            pixel_pos = (pointA_ypos>>16)*Win_Width+(pointA_xpos>>16);

            if (Display_Mode==0)
                 Game_Canvas[pixel_pos] = color;
            else Game_Canvas[pixel_pos] = colorBlend(Game_Canvas[pixel_pos],color,color>>24&0xFF);
        }
        pointA_xpos += width;
        pointA_ypos += height;
    }
}
