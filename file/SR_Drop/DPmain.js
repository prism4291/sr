SR_Drop.prototype.DPmain = function(){ // aa.move
    var b = 0;
    var y_pos,x_pos,c,d,Xtile_pos,Ytile_pos,tile_data,target_player;
    var test_log = 0;
    for (var d=0; d<this.DP_index; d++)
        test_log += 7*this.DP_item_ID[d] + 3*this.DP_val1[d] + 11*this.DP_val2[d];

    if (this.DP_log != test_log){
        console.log("this.DP_log!="+test_log);
        Game_Canvas = null;
    }

    for (var d=0; d<this.DP_index; d++){
        this.DP_velocity[d].y += 0.04;
        scaleVector2D(this.DP_velocity[d],0.98);
        y_pos = clamp(this.DP_position[d].y+this.DP_velocity[d].y,8,Inv_Top-8-1);
        Xtile_pos = this.DP_position[d].x>>3;
        Ytile_pos = y_pos>>3;
        tile_data = Terrain.TR_tile_data[Ytile_pos][Xtile_pos];

        if (tile_data==-1 || tile_data==9)
            this.DP_position[d].y = y_pos;

        x_pos = clamp(this.DP_position[d].x+this.DP_velocity[d].x,16,Win_Width-16-1);
        Ytile_pos = this.DP_position[d].y>>3;
        Xtile_pos = x_pos>>3;
        tile_data = Terrain.TR_tile_data[Ytile_pos][Xtile_pos];

        if (tile_data==-1 || tile_data==9)
            this.DP_position[d].x = x_pos;

        target_player = Players.PLfindPlayer(this.DP_position[d].x-12,this.DP_position[d].y-6-12,this.DP_position[d].x+12,this.DP_position[d].y-6+12,0)
        if (this.DP_count[d]<100){ // ticks until drop is able to be picked up
            this.DP_count[d]++;
        } else if (Players.PLfindPlayer(this.DP_position[d].x-12,this.DP_position[d].y-6-12,this.DP_position[d].x+12,this.DP_position[d].y-6+12,0) != -1){ // if ranger is touching the drop
            antiCheatCheck();

            if (this.DP_item_ID[d]==1){                                                                   // gold pickup
                Team_Gold = clamp(Team_Gold+this.DP_val1[d],0,9999999);                                   // gold increase from pickup
                Indicators.INadd(this.DP_position[d].x,this.DP_position[d].y,0,this.DP_val1[d],0xFFFF00); // output gold increase
            } else if (this.DP_item_ID[d]==2){                                                                                       // onigiri pickup
                for (var s=0; s<Stickmen_Slots; s++){                                                                                // find ranger with lowest LP
                    if (Players.PL_is_chosen[s]!=0){
                        if (floor(100*LP_Current[target_player]/LP_Max[target_player]) > floor(100*LP_Current[s]/LP_Max[s]))
                            target_player = s;
                    }
                }
                if (LP_Current[target_player]==LP_Max[target_player]) // if team is at full, skip pickup
                    continue;
                antiCheatCheck();
                LP_Current[target_player] = clamp(LP_Current[target_player]+floor(LP_Max[target_player]/5),0,LP_Max[target_player]); // increase LP
                antiCheatSet();
                Indicators.INadd(this.DP_position[d].x,this.DP_position[d].y,0,floor(LP_Max[target_player]/5),0x00FF00);             // output LP increase
            } else {
                for (var i=Inv_First; i<Inv_Last; i++){ // search for next open slot
                    if (Item_Inv[i]==0){ // if there is space, add item to inventory
                        Item_Inv[i] = this.DP_item_ID[d];
                        Comp1_Inv[i] = this.DP_val1[d];
                        Comp2_Inv[i] = this.DP_val2[d];
                        break;
                    }
                }
                if (Inv_Last==i){
                    this.DP_velocity[d].x = randomRange(-1,1);
                    this.DP_velocity[d].y = randomRange(-1,-2);
                    this.DP_count[d] = 0;
                    continue;
                }
            }
            antiCheatSet();
            this.DPsub(d--);
        }
    }
};
