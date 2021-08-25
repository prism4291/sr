// used to cycle when scrolling through settings and lists original name: Zf()
function cycle(next,first,last){
    if (next < first)
         return last;
    else if (next > last)
         return first;
    else return next;
}
