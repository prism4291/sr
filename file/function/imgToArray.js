function imgToArray(image_var){ // original name: mf()
    var w,h,canvas1
    if (image_var.IG_dimensions==0 && image_var.IG_image.complete){
        Tile_Counter1--;
        w = image_var.IG_image.width;
        h = image_var.IG_image.height;

        if (w==0 || h==0)
            throw delete image_var.IG_image, image_var.IG_file = "", "ERROR";

        canvas1 = document.createElement('canvas');
        canvas1.width = w;
        canvas1.height = h;
        canvas1 = canvas1.getContext("2d");
        canvas1.drawImage(image_var.IG_image,0,0);
        canvas1 = canvas1.getImageData(0,0,w,h).data;
        setArea(image_var,w,h);

        for (var i=0; i<canvas1.length; i+=4){
            if (canvas1[i+3]==0) // if pixel is invisible
                 image_var.IG_pxl_color_index[i>>2] = -1;
            else image_var.IG_pxl_color_index[i>>2] = canvas1[i+0]<<16|canvas1[i+1]<<8|canvas1[i+2];
        }

        delete image_var.IG_image;
        image_var.IG_dimensions = 1;
    }
}
