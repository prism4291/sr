function random(num1){ // original name: A()
    Rand_EF += Rand_FF;
    Rand_EF &= 1023;
    return Rand_Arr_Df[Rand_EF]*num1;
}
