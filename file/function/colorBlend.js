function colorBlend(pixel_color,top_color,bottom_color){ // original name: qh()
    if (pixel_color!=0)
        pixel_color = pixel_color;
    var mode = Display_Mode;
    var alpha = 0;
    var R = 0;
    var G = 0;
    var B = 0;

    if (mode==1){
        alpha = pixel_color>>16&0xFF;
        R = (((top_color>>16&0xFF)-alpha)*bottom_color>>8)+alpha;
        alpha = pixel_color>>8&0xFF;
        G = (((top_color>>8&0xFF)-alpha)*bottom_color>>8)+alpha;
        alpha = pixel_color&0xFF;
        B = (((top_color&0xFF)-alpha)*bottom_color>>8)+alpha;
    } else if (mode==2){
        R = ((top_color>>16&0xFF)*bottom_color>>8)+(pixel_color>>16&0xFF);
        if (R>0xFF)
            R = 0xFF;
        G = ((top_color>>8&0xFF)*bottom_color>>8)+(pixel_color>>8&0xFF);
        if (G>0xFF)
            G = 0xFF;
        B = ((top_color&0xFF)*bottom_color>>8)+(pixel_color&0xFF);
        if (B>0xFF)
            B = 0xFF;
    } else if (mode==3){
        R = (pixel_color>>16&0xFF)-((top_color>>16&0xFF)*bottom_color>>8);
        if (R<0)
            R = 0;
        G = (pixel_color>>8&0xFF)-((top_color>>8&0xFF)*bottom_color>>8);
        if (G<0)
            G = 0;
        B = (pixel_color&0xFF)-((top_color&0xFF)*bottom_color>>8);
        if (B<0)
            B = 0;
    } else if (mode==4){
        R = (top_color>>16&0xFF)*(pixel_color>>16&0xFF)>>8;
        G = (top_color>>8&0xFF)*(pixel_color>>8&0xFF)>>8;
        B = (top_color&0xFF)*(pixel_color&0xFF)>>8;
    } else if (mode==5){
        alpha = pixel_color>>16&0xFF;
        R = alpha+((top_color>>16&0xFF)*alpha*bottom_color>>16);
        if (R>0xFF)
            R = 0xFF;
        alpha = pixel_color>>8&0xFF;
        G = alpha+((top_color>>8&0xFF)*alpha*bottom_color>>16);
        if (G>0xFF)
            G = 0xFF;
        alpha = pixel_color&0xFF;
        B = alpha+((top_color&0xFF)*alpha*bottom_color>>16);
        if (B>0xFF)
            B = 0xFF;
    } else if (mode==6){
        alpha = pixel_color>>16&0xFF;
        R = alpha+(bottom_color-(2*alpha*bottom_color>>8));
        alpha = pixel_color>>8&0xFF;
        G = alpha+(bottom_color-(2*alpha*bottom_color>>8));
        alpha = pixel_color&0xFF;
        B = alpha+(bottom_color-(2*alpha*bottom_color>>8));
    }

    return R<<16|G<<8|B;
}
