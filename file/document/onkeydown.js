document.onkeydown = function(event){ // vh.onkeydown
    var key = event.keyCode;
    if (65<=key && key<=90){ // if key is a letter
        if (!event.shiftKey)
            key += 32; // if not shift, make it lowercase
    } else if (event.shiftKey){
        key = Arr256_5[key]
    } else {
        key = Arr256_4[key];
    }

    if (0<=key && key<256){
        Is_Key_Held[key] = true;
        Arr256_2[key] = true;
    }
    if (key!=0 && Mouse_In_Window)
        return false;
};
