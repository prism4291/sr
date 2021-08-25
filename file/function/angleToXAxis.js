function angleToXAxis(vec1){ // original name: Vg()
    var b = Math.acos(vec1.x/Math.sqrt(vec1.x*vec1.x+vec1.y*vec1.y));

    if (vec1.y > 0)
        b = TwoPi-b;

    return b;
}
