function filledRect(left,top,width,height,color){ // original name: V()
    var right,bottom,curr_pixel;
    if (left+width>Win_Width)
         right = Win_Width;
    else right = ~~(left+width);
    if (top+height>Win_Height)
         bottom = Win_Height;
    else bottom = ~~(top+height);
    if (left<0)
         left = 0;
    else left = ~~left;
    if (top<0)
         top = 0;
    else top = ~~top;

    for (var y=top; y<bottom; y++){
        for (var x=left; x<right; x++)
            if (Display_Mode==0)
                 Game_Canvas[y*Win_Width+x] = color;
            else Game_Canvas[y*Win_Width+x] = colorBlend(Game_Canvas[y*Win_Width+x],color,color>>24&0xFF);
    }
}
