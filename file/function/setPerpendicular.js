function setPerpendicular(vec1){ // original name: dh()
    var xcomp = vec1.x;

    vec1.x = vec1.y;
    vec1.y = -xcomp;
}
