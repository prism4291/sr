function normalize(vec1){ // original name: Xg()
    var magnitude1 = magnitudeOf(vec1);

    if (magnitude1==0)
        return 0;

    vec1.x = vec1.x/magnitude1;
    vec1.y = vec1.y/magnitude1;

    return magnitude1;
}
