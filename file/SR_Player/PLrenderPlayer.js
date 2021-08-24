// draws stickman
window.fff = SR_Player.prototype.PLrenderPlayer;
SR_Player.prototype.PLrenderPlayer = function(){ // Pg.prototype.b
    var team_leader,weap_range,weap_color,head_color,body_color,anger_lightning_opacity,rand_joint,wing_color,glove_hbox,whip_tip_size,shifted_color,rings,rings_out,primary_aura,aura_color;
    var weapon_point1 = new Vector2D;
    var weapon_point2 = new Vector2D;

    if (Game_Mode!=1)
         team_leader = Stickmen_Slots;
    else team_leader = (Stickmen_Slots<<1);
    for (var s=0; s<team_leader; s++){
        weap_range = getVal(Item_Inv[Stickmen_Slots+s],Weap_Range);
        weap_color = getVal(Item_Inv[Stickmen_Slots+s],Item_Color);
        head_color = 0xF2BD6B;                       // base color for head and body
        body_color = 0xFFFFFF;

        if (checkEff(Stickmen_Slots+s,Card_Zombie)){ // color change when zombie's card is equipped
            head_color = 0xCCCCCC;
            body_color = 0x330066;
        }
        if (this.PL_frozen_ticks[s]>0){              // color of character when frozen
            head_color = 0x1E5CD0;
            body_color = 0x5A8EE1;
        } else if (this.PL_ice_ticks[s]>0){          // color of character when slowed (ice)
            head_color = 0x002670;
            body_color = 0x1E5CD0;
        } else if (this.PL_poison_ticks[s]>0){       // color when poisoned
            head_color = 0x339900;
            body_color = 0x33FF00;
        }
        if (this.PL_damaged_ticks[s]>0){             // color when taking hits
            this.PL_damaged_ticks[s]--;
            body_color = 0xFF0000;
        }

        Display_Mode2 = Display_Mode = 1;
        if (Selected_Player==s && Game_Mode==0 && Sett_PL_Symbol==2){
            for (var j=0; j<11; j++)
                dispItemCentered(Effect_Img,floor(this.PL_joint[s][j].x),floor(this.PL_joint[s][j].y),12,12,0,0,12,12,0x50FF0000); // PL symbol shadow
        } else if (Anger_Crown_Lightning>0){
            Anger_Crown_Lightning--;
            if (Anger_Crown_Lightning<64)
                 anger_lightning_opacity = Anger_Crown_Lightning;
            else anger_lightning_opacity = 64;
            for (var j=0; j<11; j++)
                dispItemCentered(Effect_Img,floor(this.PL_joint[s][j].x),floor(this.PL_joint[s][j].y),24,24,0,0,12,12,anger_lightning_opacity<<24|0xFFFFFF66);

            if (Anger_Crown_Lightning>120){
                rand_joint = randInt(11);
                Players.PLprojectileAttack(563,Players.PL_joint[s][rand_joint].x,Players.PL_joint[s][rand_joint].y,0);
            }
        } else {
            for (var j=0; j<11; j++)
                dispItemCentered(Effect_Img,floor(this.PL_joint[s][j].x),floor(this.PL_joint[s][j].y),12,12,0,0,12,12,0x40000000); // basic shadow
        }
        Display_Mode = Display_Mode2 = 0;

        if (this.PL_class_ID[s]==8){ // if stickman is an angel draw wings
            wing_color = (weap_color&0xFFFFFF)>>17<<16|(weap_color&0x00FFFF)>>9<<8|(weap_color&0x0000FF)>>1;
            drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][11].x,this.PL_joint[s][11].y,wing_color);
            drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][12].x,this.PL_joint[s][12].y,wing_color);
            drawLine(this.PL_joint[s][11].x,this.PL_joint[s][11].y,this.PL_joint[s][12].x,this.PL_joint[s][12].y,wing_color);
            drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][13].x,this.PL_joint[s][13].y,wing_color);
            drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][14].x,this.PL_joint[s][14].y,wing_color);
            drawLine(this.PL_joint[s][13].x,this.PL_joint[s][13].y,this.PL_joint[s][14].x,this.PL_joint[s][14].y,wing_color);
        }
        drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][2].x,this.PL_joint[s][2].y,body_color);

        if (this.PL_class_ID[s]!=Class_Dead){ // if stickman is not dead, draw (spine?)
            drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][3].x,this.PL_joint[s][3].y,body_color);
            drawLine(this.PL_joint[s][1].x,this.PL_joint[s][1].y,this.PL_joint[s][4].x,this.PL_joint[s][4].y,body_color);
        }
        drawLine(this.PL_joint[s][3].x,this.PL_joint[s][3].y,this.PL_joint[s][5].x,this.PL_joint[s][5].y,body_color);
        drawLine(this.PL_joint[s][4].x,this.PL_joint[s][4].y,this.PL_joint[s][6].x,this.PL_joint[s][6].y,body_color);

        if (this.PL_class_ID[s]!=Class_Dead){
            drawLine(this.PL_joint[s][2].x,this.PL_joint[s][2].y,this.PL_joint[s][7].x,this.PL_joint[s][7].y,body_color);
            drawLine(this.PL_joint[s][2].x,this.PL_joint[s][2].y,this.PL_joint[s][8].x,this.PL_joint[s][8].y,body_color);
        }
        drawLine(this.PL_joint[s][7].x,this.PL_joint[s][7].y,this.PL_joint[s][9].x,this.PL_joint[s][9].y,body_color);
        drawLine(this.PL_joint[s][8].x,this.PL_joint[s][8].y,this.PL_joint[s][10].x,this.PL_joint[s][10].y,body_color);

        outlineRect(floor(this.PL_joint[s][0].x)-2,floor(this.PL_joint[s][0].y)-2,5,5,head_color);

        Display_Mode2 = 2;
        if (checkEff(Stickmen_Slots+s,Crown_Imprl))
            dispItem(Drop_Img,floor(this.PL_joint[s][0].x)-6,floor(this.PL_joint[s][0].y)-6-6,12,12,228,0,12,12,0xFFFFD700);
        if (checkEff(Stickmen_Slots+s,Crown_Anger))
            dispItem(Drop_Img,floor(this.PL_joint[s][0].x)-6,floor(this.PL_joint[s][0].y)-6-6,12,12,228,0,12,12,0xFFDDDDDD);
        Display_Mode2 = 0;

        if (this.PL_class_ID[s]==1){ // if character is a boxer
            glove_hbox = 3;
            if (checkEff(Stickmen_Slots+s,Card_Big))
                glove_hbox = 5;
            filledRect(floor(this.PL_joint[s][5].x)-1,floor(this.PL_joint[s][5].y)-1,glove_hbox,glove_hbox,weap_color);
            filledRect(floor(this.PL_joint[s][6].x)-1,floor(this.PL_joint[s][6].y)-1,glove_hbox,glove_hbox,weap_color);
        }
        else if (this.PL_class_ID[s]==2){ // if character is a gladiator
            if (checkEff(Stickmen_Slots+s,Card_Longsw))
                weap_range += getEff(Stickmen_Slots+s,Eff1);
            if (checkEff(Stickmen_Slots+s,Card_Katana))
                weap_range += getEff(Stickmen_Slots+s,Eff2);
            weapon_point1.Vdistance(this.PL_joint[s][5],this.PL_joint[s][6]);
            normalize(weapon_point1);
            scaleVector2D(weapon_point1,weap_range);
            weapon_point1.Vadd(this.PL_joint[s][6]);
            drawLine(this.PL_joint[s][6].x,this.PL_joint[s][6].y,weapon_point1.x,weapon_point1.y,weap_color); // draw sword
        }
        else if (this.PL_class_ID[s]==3){ // if character is a sniper
            weapon_point1.Vdistance(this.PL_joint[s][6],this.PL_joint[s][5]);
            normalize(weapon_point1);
            weapon_point2.Vset(weapon_point1);
            setPerpendicular(weapon_point2);
            scaleVector2D(weapon_point1,18);
            weapon_point1.Vadd(this.PL_joint[s][5]);
            drawLine(this.PL_joint[s][5].x,this.PL_joint[s][5].y,weapon_point1.x,weapon_point1.y,weap_color);
            scaleVector2D(weapon_point2,8);
            sumVector2D(weapon_point1,this.PL_joint[s][6],weapon_point2);
            drawLine(this.PL_joint[s][5].x,this.PL_joint[s][5].y,weapon_point1.x,weapon_point1.y,0x808080); // counter-clockwise bowstring segment
            weapon_point2.Vdistance(this.PL_joint[s][6],weapon_point2);
            drawLine(this.PL_joint[s][5].x,this.PL_joint[s][5].y,weapon_point2.x,weapon_point2.y,0x808080); // clockwise bowstring segment
            drawLine(weapon_point1.x,weapon_point1.y,weapon_point2.x,weapon_point2.y,0xC0C0C0); // draw bow stave
        }
        else if (this.PL_class_ID[s]==4){ // if character is a magician
            sumVector2D(weapon_point1,this.PL_joint[s][5],this.PL_joint[s][6]);
            scaleVector2D(weapon_point1,0.5);
            filledRect(floor(weapon_point1.x)-1,floor(weapon_point1.y)-1,3,3,weap_color); // draw orb
        }
        else if (this.PL_class_ID[s]==5){ // if character is a priest
            weapon_point1.x = this.PL_joint[s][0].x+randomRange(-10,10);
            weapon_point1.y = this.PL_joint[s][0].y+randomRange(-10,0);
            weapon_point1.Vdistance(this.PL_joint[s][6],this.PL_joint[s][4]);
            normalize(weapon_point1);
            setPerpendicular(weapon_point1);
            scaleVector2D(weapon_point1,8);
            drawLine(this.PL_joint[s][6].x-weapon_point1.x,this.PL_joint[s][6].y-weapon_point1.y,this.PL_joint[s][6].x+weapon_point1.x,this.PL_joint[s][6].y+weapon_point1.y,0x808080);
            filledRect(floor(this.PL_joint[s][6].x+weapon_point1.x)-1,floor(this.PL_joint[s][6].y+weapon_point1.y)-1,3,3,weap_color);
        }
        else if (this.PL_class_ID[s]==6){ // if character is a gunner
            weap_range = clamp(floor(this.PL_joint[s][6].x)-floor(this.PL_joint[s][1].x),-8,8)>>1;
            // gun angles
            if (weap_range==-4)      filledRect(floor(this.PL_joint[s][6].x)-5,floor(this.PL_joint[s][6].y)-2,7,2,weap_color);
            else if (weap_range==-3) filledRect(floor(this.PL_joint[s][6].x)-4,floor(this.PL_joint[s][6].y)-2,6,2,weap_color);
            else if (weap_range==-2) filledRect(floor(this.PL_joint[s][6].x)-3,floor(this.PL_joint[s][6].y)-2,5,2,weap_color);
            else if (weap_range==-1) filledRect(floor(this.PL_joint[s][6].x)-2,floor(this.PL_joint[s][6].y)-2,3,2,weap_color);
            else if (weap_range==0)  filledRect(floor(this.PL_joint[s][6].x)-1,floor(this.PL_joint[s][6].y)-3,2,2,weap_color);
            else if (weap_range==1)  filledRect(floor(this.PL_joint[s][6].x)-1,floor(this.PL_joint[s][6].y)-2,3,2,weap_color);
            else if (weap_range==2)  filledRect(floor(this.PL_joint[s][6].x)-2,floor(this.PL_joint[s][6].y)-2,5,2,weap_color);
            else if (weap_range==3)  filledRect(floor(this.PL_joint[s][6].x)-2,floor(this.PL_joint[s][6].y)-2,6,2,weap_color);
            else if (weap_range==4)  filledRect(floor(this.PL_joint[s][6].x)-2,floor(this.PL_joint[s][6].y)-2,7,2,weap_color);

            filledRect(floor(this.PL_joint[s][6].x)-1,floor(this.PL_joint[s][6].y)-2,2,4,weap_color); // draw gun
        }
        else if (this.PL_class_ID[s]==7){ // if character is a whipper
            whip_tip_size = 3;
            if (checkEff(Stickmen_Slots+s,Card_Big))
                whip_tip_size = 5;
            shifted_color = (weap_color&0xFF0000)>>17<<16|(weap_color&0x00FF00)>>9<<8|(weap_color&0x0000FF)>>1;
            drawLine(this.PL_joint[s][5].x,this.PL_joint[s][5].y,this.PL_joint[s][11].x,this.PL_joint[s][11].y,shifted_color);
            drawLine(this.PL_joint[s][11].x,this.PL_joint[s][11].y,this.PL_joint[s][12].x,this.PL_joint[s][12].y,shifted_color);
            drawLine(this.PL_joint[s][12].x,this.PL_joint[s][12].y,this.PL_joint[s][13].x,this.PL_joint[s][13].y,shifted_color);
            drawLine(this.PL_joint[s][13].x,this.PL_joint[s][13].y,this.PL_joint[s][14].x,this.PL_joint[s][14].y,shifted_color);
            filledRect(floor(this.PL_joint[s][14].x)-1,floor(this.PL_joint[s][14].y)-1,whip_tip_size,whip_tip_size,weap_color);
        }
        else if (this.PL_class_ID[s]==8){ // if character is an Angel
            if (DEX[s]<10)       rings = 1;
            else if (DEX[s]<30)  rings = 2;
            else if (DEX[s]<60)  rings = 3;
            else if (DEX[s]<100) rings = 4;
            else                 rings = 5;

            if (checkEff(Stickmen_Slots+s,Card_Rings))
                rings += 1;
            for (var r=0; r<rings; r++){
                if (this.PL_ring_thrown_status[s][r]!=0)
                    rings_out = r;
            }
            if (rings_out!=rings)
                dispItemCentered(Effect_Img,floor(this.PL_joint[s][0].x),floor(this.PL_joint[s][0].y)-5,7,3,33,0,7,3,weap_color);
            for (var r=0; r<rings; r++){
                if (this.PL_ring_thrown_status[s][r]!=0)
                    dispItemCentered(Effect_Img,floor(this.PL_joint[s][15+r].x),floor(this.PL_joint[s][15+r].y),7,3,33,0,7,3,weap_color);
            }
        }
        if (Sequence_Step!=40){
            if (STR_Aura[s]+DEX_Aura[s] > 0){
                Display_Mode = 2;
                Display_Mode2 = 1;
                primary_aura = STR_Aura[s];
                if (DEX_Aura[s]>primary_aura)
                    primary_aura = DEX_Aura[s];
                if (MAG_Aura[s]>primary_aura)
                    primary_aura = MAG_Aura[s];
                aura_color = 0xFF000000|0xFF*STR_Aura[s]/primary_aura<<16|0xFF*DEX_Aura[s]/primary_aura<<8|0xFF*MAG_Aura[s]/primary_aura; // aura color
                dispItemCentered(Effect_Img,floor(this.PL_joint[s][9].x+this.PL_joint[s][10].x)>>1,floor(this.PL_joint[s][9].y+this.PL_joint[s][10].y)>>1,20,12,12,0,20,12,aura_color);
                Display_Mode = Display_Mode2 = 0;
            }
            if ((Sett_LP_Bar_Disp&1)>0 && LP_Current[s]>0){
                filledRect(floor(this.PL_joint[s][0].x)-6,floor(this.PL_joint[s][0].y)-6,13,2,0x990000);
                filledRect(floor(this.PL_joint[s][0].x)-6,floor(this.PL_joint[s][0].y)-6,floor(13*LP_Current[s]/LP_Max[s]),2,0x00CC00);
            }
            if (Selected_Player==s && Game_Mode==0){
                if (Sett_PL_Symbol==0){
                    filledRect(floor(this.PL_joint[s][0].x)-1,floor(this.PL_joint[s][0].y)-8,3,3,0xFFFF00); // draw square symbol above player
                } else if (Sett_PL_Symbol==1){
                    drawLine(floor(this.PL_joint[s][0].x)-3,floor(this.PL_joint[s][0].y)-14,floor(this.PL_joint[s][0].x)+3,floor(this.PL_joint[s][0].y)-14,0xFFFF00); // draw triangle symbol above player
                    drawLine(floor(this.PL_joint[s][0].x)-3,floor(this.PL_joint[s][0].y)-14,floor(this.PL_joint[s][0].x)+0.5,floor(this.PL_joint[s][0].y)-7,0xFFFF00);
                    drawLine(floor(this.PL_joint[s][0].x)+3.5,floor(this.PL_joint[s][0].y)-14,floor(this.PL_joint[s][0].x)+0.5,floor(this.PL_joint[s][0].y)-7,0xFFFF00);
                }
            }
        }
    }
};
