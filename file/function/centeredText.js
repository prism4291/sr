function centeredText(text,x_pos,y_pos,message,fill_color,outline_color){ // original name: yf()
    x_pos -= message.length*(text.TX_width+text.TX_spacing)>>1;
    y_pos -= text.TX_height>>1;
    text.TXoutputB(x_pos,y_pos,message,fill_color,outline_color);
}
