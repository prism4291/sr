// fade in/fade out of text when entering stages?
function screenTransition(color){ // original name: Vf()
    var alpha,R,G,B;
    for (var i=0; i<Win_Height*Win_Width; i++){
        alpha = Game_Canvas[i]>>16&0xFF;
        R = ((0-alpha)*color>>8)+alpha;
        alpha = Game_Canvas[i]>>8&0xFF;
        G = ((0-alpha)*color>>8)+alpha;
        alpha = Game_Canvas[i]&0xFF;
        B = ((0-alpha)*color>>8)+alpha;
        Game_Canvas[i] = R<<16|G<<8|B;
    }
}
