function dispItem(image_src,img_Xpos,img_Ypos,img_width,img_height,src_Xpos,src_Ypos,src_width,src_height,color){ // dispItem()
    var alpha,red,green,blue,R,G,B,j,k,transparency;
    if (img_width!=0 && img_height!=0){
        src_width = floor((src_width<<8)/img_width);
        src_height = floor((src_height<<8)/img_height);

        src_Xpos <<= 8;
        src_Ypos <<= 8;

        if (img_Xpos < 0)
            src_Xpos += src_width*-img_Xpos;
        if (img_Ypos < 0)
            src_Ypos += src_height*-img_Ypos;

        if (Win_Width < img_Xpos+img_width)
             img_width = Win_Width;
        else img_width = floor(img_Xpos+img_width);

        if (Win_Height < img_Ypos+img_height)
             img_height = Win_Height;
        else img_height = floor(img_Ypos+img_height);

        if (img_Xpos < 0)
             img_Xpos = 0;
        else img_Xpos = floor(img_Xpos);

        if (img_Ypos < 0)
             img_Ypos = 0;
        else img_Ypos = floor(img_Ypos);

        alpha = color>>24&0xFF;
        red = color>>16&0xFF;
        green = color>>8&0xFF;
        blue = color&0xFF;

        if (Display_Mode2==0){
            for (; img_Ypos<img_height; img_Ypos++, src_Ypos+=src_height){
                j = img_Ypos*Win_Width+img_Xpos;
                k = ((src_Ypos>>8)*image_src.IG_width<<8)+src_Xpos;
                for (var l=img_Xpos; l<img_width; l++, j++, k+=src_width){
                    transparency = image_src.IG_pxl_color_index[k>>8];

                    if (transparency!=-1){
                        R = red*(transparency>>16&0xFF)>>8;
                        G = green*(transparency>>8&0xFF)>>8;
                        B = blue*(transparency&0xFF)>>8;

                        if (Display_Mode==0){
                            Game_Canvas[j] = R<<16|G<<8|B;
                        } else if (Display_Mode==1){
                            transparency = Game_Canvas[j]>>16&0xFF;
                            R = ((R-transparency)*alpha>>8)+transparency;
                            transparency = Game_Canvas[j]>>8&0xFF;
                            G = ((G-transparency)*alpha>>8)+transparency;
                            transparency = Game_Canvas[j]&0xFF;
                            B = ((B-transparency)*alpha>>8)+transparency;
                            Game_Canvas[j] = R<<16|G<<8|B;
                        } else if (Display_Mode==2){
                            R = (R*alpha>>8)+(Game_Canvas[j]>>16&0xFF);
                            if (R>0xFF)
                                R = 0xFF;
                            G = (G*alpha>>8)+(Game_Canvas[j]>>8&0xFF);
                            if (G>0xFF)
                                G = 0xFF;
                            B = (B*alpha>>8)+(Game_Canvas[j]&0xFF);
                            if (B>0xFF)
                                B = 0xFF;
                            Game_Canvas[j] = R<<16|G<<8|B;
                        } else if (Display_Mode==5){
                            transparency = Game_Canvas[j]>>16&0xFF;
                            R = transparency+(R*transparency*alpha>>16);
                            if (R > 0xFF)
                                R = 0xFF;
                            transparency = Game_Canvas[j]>>8&0xFF;
                            G = transparency+(G*transparency*alpha>>16);
                            if (G > 0xFF)
                                G = 0xFF;
                            transparency = Game_Canvas[j]&0xFF;
                            B = transparency+(B*transparency*alpha>>16);
                            if (B > 0xFF)
                                B = 0xFF;
                            Game_Canvas[j] = R<<16|G<<8|B;
                        }
                    }
                }
            }
        } else if (Display_Mode2==1){
            for (; img_Ypos<img_height; img_Ypos++,src_Ypos+=src_height){
                j = img_Ypos*Win_Width+img_Xpos;
                k = ((src_Ypos>>8)*image_src.IG_width<<8)+src_Xpos;
                for (var l=img_Xpos; l<img_width; l++,j++,k+=src_width){
                    transparency = alpha*(image_src.IG_pxl_color_index[k>>8]&0xFF)>>8;

                    if (transparency!=0){
                        if (Display_Mode==1){
                            R = Game_Canvas[j]>>16&0xFF;
                            R = ((red-R)*transparency>>8)+R;
                            G = Game_Canvas[j]>>8&0xFF;
                            G = ((green-G)*transparency>>8)+G;
                            B = Game_Canvas[j]&0xFF;
                            B = ((blue-B)*transparency>>8)+B;
                            Game_Canvas[j]=R<<16|G<<8|B;
                        } else if (Display_Mode==2){
                            R = (Game_Canvas[j]>>16&0xFF)+(red*transparency>>8);
                            if (R>0xFF)
                                R = 0xFF;
                            G = (Game_Canvas[j]>>8&0xFF)+(green*transparency>>8);
                            if (G>0xFF)
                                G = 0xFF;
                            B = (Game_Canvas[j]&0xFF)+(blue*transparency>>8);
                            if (B>0xFF)
                                B = 0xFF;
                            Game_Canvas[j] = R<<16|G<<8|B;
                        } else if (Display_Mode==3){
                            R = (Game_Canvas[j]>>16&0xFF)-transparency;
                            if (R<0)
                                R = 0;
                            G = (Game_Canvas[j]>>8&0xFF)-transparency;
                            if (G<0)
                                G = 0;
                            B = (Game_Canvas[j]&0xFF)-transparency;
                            if (B<0)
                                B = 0;
                            Game_Canvas[j] = R<<16|G<<8|B;
                        } else {
                            Game_Canvas[j] = colorBlend(Game_Canvas[j],color,transparency);
                        }
                    }
                }
            }
        } else if (Display_Mode2==2){
            for (; img_Ypos<img_height; img_Ypos++,src_Ypos+=src_height){
                j = img_Ypos*Win_Width+img_Xpos;
                k = ((src_Ypos>>8)*image_src.IG_width<<8)+src_Xpos;
                for (var l=img_Xpos; l<img_width; l++,j++,k+=src_width){
                    transparency = image_src.IG_pxl_color_index[k>>8];

                    if (transparency!=0){
                        R = transparency>>16&0xFF;
                        G = transparency>>8&0xFF;
                        B = transparency&0xFF;

                        if (R==G && B==G)
                             Game_Canvas[j] = red*R>>8<<16|green*G>>8<<8|blue*B>>8;
                        else Game_Canvas[j] = R<<16|G<<8|B;
                    }
                }
            }
        } else if (Display_Mode2==3){
            for (; img_Ypos<img_height; img_Ypos++, src_Ypos+=src_height){
                j = img_Ypos*Win_Width+img_Xpos;
                k = ((src_Ypos>>8)*image_src.IG_width<<8)+src_Xpos;
                for (var l=img_Xpos; l<img_width; l++, j++, k+=src_width){
                    transparency = alpha*(image_src.IG_pxl_color_index[k>>8]&0xFF)>>8;

                    if (transparency!=0){
                        if (Display_Mode==1){
                            Game_Canvas[j] = ((0xFF-Game_Canvas[j])*transparency>>8)+Game_Canvas[j];
                        } else if (Display_Mode==2){
                            R = (Game_Canvas[j]>>16&0xFF)+(red*transparency>>8);
                            if (R > 0xFF)
                                R = 0xFF;
                            G = (Game_Canvas[j]>>8&0xFF)+(green*transparency>>8);
                            if (G > 0xFF)
                                G = 0xFF;
                            B = (Game_Canvas[j]&0xFF)+(blue*transparency>>8);
                            if (B > 0xFF)
                                B = 0xFF;
                            Game_Canvas[j] = R<<16|G<<8|B;
                        } else if (Display_Mode==3){
                            transparency = Game_Canvas[j]-transparency;
                            if (transparency<0)
                                transparency = 0;
                            Game_Canvas[j] = transparency;
                        }
                    }
                }
            }
        }
    }
}
