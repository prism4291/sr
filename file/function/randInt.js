function randInt(num1){ // original name: $g()
    Rand_EF += Rand_FF;
    Rand_EF &= 1023;
    return ~~(Rand_Arr_Df[Rand_EF]*num1); // ~~() is floor()
}
