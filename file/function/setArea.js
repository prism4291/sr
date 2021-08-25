function setArea(image,width,height){ // original name: qf()
    image.IG_width = width;
    image.IG_height = height;
    /*image.IG_shift = 0;
    for (var i=0; i<16; i++){
        if (image.IG_width == 1<<i) // if IG_width is a power of 2, set IG_shift to IG_width
            image.IG_shift = i;
    }*/
    image.IG_pxl_color_index = new Int32Array(image.IG_width*image.IG_height);
}
