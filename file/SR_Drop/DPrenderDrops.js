SR_Drop.prototype.DPrenderDrops = function(){ // aa.b
    Display_Mode2 = 2;
    for (var d=0; d<this.DP_index; d++){
        if (this.DP_count[d]==Drop_Limit || (this.DP_count[d]&6)!=0)
            dispItem(Drop_Img,floor(this.DP_position[d].x)-6,floor(this.DP_position[d].y)-12,12,12,12*getVal(this.DP_item_ID[d],Item_Ico_Sm),0,12,12,getVal(this.DP_item_ID[d],Item_Color));
    }
    Display_Mode2 = 0;
};
