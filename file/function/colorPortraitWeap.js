function colorPortraitWeap(left_pos,top_pos,class_ID,weap_color){ // original name: Yf()
    var left,top,right,bottom;

    if (left_pos<0)
         left = -left_pos;
    else left = 0;
    if (top_pos<0)
         top = -top_pos;
    else top = 0;
    if (left_pos+24>Win_Width)
         right = 24-(left_pos+24-Win_Width);
    else right = 24;
    if (top_pos+24>Win_Height)
         bottom = 24-(top_pos+24-Win_Height);
    else bottom = 24;

    for (var y=top; y<bottom; y++){
        for (var x=left; x<right; x++){
            if (Player_Img.IG_pxl_color_index[floor(24*y/24)*Player_Img.IG_width+class_ID+x]==0xFF0000)
                Game_Canvas[(top_pos+y)*Win_Width+left_pos+x] = weap_color;
        }
    }
}
