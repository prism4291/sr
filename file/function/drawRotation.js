function drawRotation(corner_a1,corner_b1,corner_c1,corner_d1,corner_a2,corner_b2,corner_c2,corner_d2){ // original name: lh()
    var x,y;
    var m = maxOf(absVal(corner_a2-corner_a1>>16),absVal(corner_b2-corner_b1>>16))+1;
    corner_a2 = floor((corner_a2-corner_a1)/m);
    corner_b2 = floor((corner_b2-corner_b1)/m);
    corner_c2 = floor((corner_c2-corner_c1)/m);
    corner_d2 = floor((corner_d2-corner_d1)/m);
    corner_c1 = floor(corner_c1);
    corner_d1 = floor(corner_d1);
    for (var H=0; H<m; H++){
        x = corner_a1>>16;
        y = corner_b1>>16;
        if (y>=0 && y<Win_Height){
            if (x < Layer1[y]){
                Layer1[y] = x;
                Layer3[y] = corner_c1;
                Layer5[y] = corner_d1;
            }
            if (x > Layer2[y]){
                Layer2[y] = x;
                Layer4[y] = corner_c1;
                Layer6[y] = corner_d1;
            }
        }
        corner_a1 += corner_a2;
        corner_b1 += corner_b2;
        corner_c1 += corner_c2;
        corner_d1 += corner_d2;
    }
}
