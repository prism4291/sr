// checks if effect "compo_eff" is found in either slot of "weapon",if found set that slot to true
function checkEff(weapon,compo_eff){ // original name: x()
    Slot2 = Slot1 = false;

    if (getVal(Comp1_Inv[weapon],Eff_ID) == compo_eff) // check if the effect of weapon's second compo is compo_eff
        Slot1 = true;
    if (getVal(Comp2_Inv[weapon],Eff_ID) == compo_eff) // check if the effect of weapon's second compo is compo_eff
        Slot2 = true;

    if (Slot1 || Slot2) // if either slot contains a compo item
        return true;
    else
        return false;
}
