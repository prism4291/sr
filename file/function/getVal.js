// takes the item array and the element number and returns the value of that element in that array
function getVal(item,element){ // original name: w()
    // if the element you are trying to access is beyond the range of the array
    if (Item_Catalogue[item].length <= element){
        return 0;
    } else { // if the value is a weapon/item color, projectile color, or residue color
         if (element == Item_Color || element == Proj_Color || element == Res_Color)
            return Item_Catalogue[item][element]>>>0;
         else
            return Item_Catalogue[item][element];
    }
}
