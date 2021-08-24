// reads the two compo slots and returns the compo items' effects' values
function getEff(compo,eff_num){ // original name: y()
    var value = 0;

    if (Slot1==true)
        value += getVal(Comp1_Inv[compo],eff_num);
    if (Slot2==true)
        value += getVal(Comp2_Inv[compo],eff_num);

    return value;
}
