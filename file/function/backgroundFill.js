function backgroundFill(left,top,width,height,color){ // original name: Og()
    var right,bottom;
    if (left+width>Win_Width)
         right = Win_Width;
    else right = left+width;
    if (top+height>Win_Height)
         bottom = Win_Height;
    else bottom = top+height;
    if (left<0)
         left = 0;
    else left = ~~left;
    if (top<0)
         top = 0;
    else top = ~~top;

    for (var y=top; y<bottom; y++){
        for (var x=left; x<right; x++){
            if (Game_Canvas[y*Win_Width+x]==0) // if pixel is black (make sure to only fill blank space)
                Game_Canvas[y*Win_Width+x] = color;
        }
    }
}
