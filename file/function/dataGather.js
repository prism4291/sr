window.fff = dataGather;
function dataGather(){ // original name: Le()
    Item_Attribute_Data = new Int32Array(Item_Catalogue.length);
    for (var i=0; i<Item_Catalogue.length; i++){
        for (var j=Item_Attribute_Data[i]=0; j<Item_Catalogue[i].length; j++){
            if (typeof Item_Catalogue[i][j]=='number')
                Item_Attribute_Data[i] += Item_Catalogue[i][j]&255; // if the item's attribute is a number, add it to Item_Attribute_Data
        }
    }
    Enemy_Spawn_Data = 0;
    for (var i=0; i<Stage_Spawns.length; i++){
        for (var j=0; j<Stage_Spawns[i].length; j++){
            for (var k=0; k<Stage_Spawns[i][j].length; k++)
                Enemy_Spawn_Data += Stage_Spawns[i][j][k];
        }
    }
    Monster_Data = 0;
    for (var i=0; i<EN_Info.length; i++){
        for (var j=0; j<EN_Info[i].length; j++)
            Monster_Data += EN_Info[i][j]&65535;
    }
    Shop_Item_Data = 0;
    for (var i=0; i<Shop_Items.length; i++){
        for (var j=0; j<Shop_Items[i].length; j++){
            for (var k=0; k<Shop_Items[i][j].length; k++)
                Shop_Item_Data += Shop_Items[i][j][k]*k&65535;
        }
    }
}
