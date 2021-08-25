document.ontouchmove = function(event){ // original name: vh.ontouchmove
    ci(event);
    if (Mouse_In_Window)
        return false;
};
