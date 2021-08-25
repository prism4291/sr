function drawItem(image,left,top,width,height,source_left,source_top,source_width,source_height){ // original name: ag()
    var right,bottom;
    if (left>-16){
        if (left<0)
            source_left += -left;
        if (top<0)
            source_top += -top;
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
            for (var x=left; x<right; x++){
                color = image.IG_pxl_color_index[(y-top+source_top)*image.IG_width+(x-left+source_left)];
                if (color!=-1)
                    Game_Canvas[y*Win_Width+x] = color;
            }
        }
    }
}
