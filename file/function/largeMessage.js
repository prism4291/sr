function largeMessage(text,x_pos,y_pos,message,fill_R,fill_G,fill_B,fill_opacity,outline_R,outline_G,outline_B,outline_opacity,widthvar,heightvar){ // original name: Gf()
    x_pos -= message.length*(widthvar+text.TX_spacing)>>1;
    text.TXoutputM(x_pos,y_pos-(heightvar>>1),message,fill_R,fill_G,fill_B,fill_opacity,outline_R,outline_G,outline_B,outline_opacity,widthvar,heightvar);
}
