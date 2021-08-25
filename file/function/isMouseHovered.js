function isMouseHovered(left,top,width,height){ // original name: Wf()
    if (Mouse_Xpos<left || Mouse_Xpos>=left+width || Mouse_Ypos<top || Mouse_Ypos>=top+height)
         return false;
    else return true;
}
