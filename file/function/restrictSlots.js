// hides slots
function restrictSlots(item_pos,compo_slot){ // original name: Ng()
    var held_item_eff_ID = getVal(Item_Inv[Inv_Last],Eff_ID);
    var held_item_class_ID = getVal(Item_Inv[Inv_Last],Item_Class_ID);
    var weapon = Stickmen_Slots+item_pos;
    if (1<=held_item_class_ID && held_item_class_ID<=8 && held_item_class_ID!=Ranger_Class[item_pos])
        return false; // if item is a weapon AND item doesn't fit character's class

    if (Item_Inv[Inv_Last]==0 || held_item_class_ID!=Class_Compo)
        return true;  // if no item is held OR if item held is not a compo

    if (Item_Inv[weapon]==0 || (compo_slot==0 && Comp1_Inv[weapon]==Null_Slot) || (compo_slot==1 && Comp2_Inv[weapon]==Null_Slot))
        return false; // if no weapon is equipped OR if compo slot of weapon is null (store-bought weapons)

    if ((compo_slot==0 && held_item_eff_ID==getVal(Comp2_Inv[weapon],Eff_ID)) || (compo_slot==1 && held_item_eff_ID==getVal(Comp1_Inv[weapon],Eff_ID)))
        return false; // if weapon already has held compo
    else              // else check for restrictions
        return compRestrCheck(held_item_eff_ID,getVal(Item_Inv[weapon],Item_Class_ID),getVal(Item_Inv[weapon],Item_Type),getVal(Item_Inv[weapon],Item_Bullet));
}
