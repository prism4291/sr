document.onkeyup = function(event){ // vh.onkeyup
    var key = event.keyCode;
    if (65<=key & key<=90){ // if pressed key is a letter key
        if (event.shiftKey==false)
            key += 32;
    } else {
        if (event.shiftKey==true)
             key = Arr256_5[key];
        else key = Arr256_4[key];
    }
    if (0<=key && key<256)
        Is_Key_Held[key] = false;
    if (key!=0 && Mouse_In_Window)
        return false;
};
