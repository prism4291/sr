function itemText(x_pos,y_pos,message,fill_color,outline_color,g){ // original name: hg()
    Large_Text.TX_spacing = g;
    Large_Text.TXoutputB(x_pos,y_pos,message,fill_color,outline_color);
    Large_Text.TX_spacing = 0;
}
