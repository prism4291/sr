function ci(event){ // original name: ci()
    for (var b=0,c=0,d=cv; null!=d; d=d.offsetParent){
        b += d.offsetLeft;
        c += d.offsetTop;
    }
    event = event.touches;
    Mouse_Xpos2 = floor(event[0].pageX-b);
    Mouse_Ypos2 = floor(event[0].pageY-c);
}
