window.fff = setRangersUI; // original name: Cf()
function setRangersUI(){
    var team_last,wATn,wATx,wAGIn,wAGIx,wRnge,agi_reduction,aura_Xpos,aura_Ypos,ranger_Xpos,ranger_Ypos;
    antiCheatCheck();

    FP[0] = LV[0]; // FP (fighting power)
    FP[1] = LV[1];
    for (var s=0; s<Stickmen_Slots; s++)
        FP[0] += 2*getVal(Item_Inv[Stickmen_Slots+s],Item_LV)+getVal(Comp1_Inv[Stickmen_Slots+s],Item_LV)+getVal(Comp2_Inv[Stickmen_Slots+s],Item_LV);
    for (var s=Stickmen_Slots; s<Stickmen_Slots<<1; s++)
        FP[1] += 2*getVal(Item_Inv[Stickmen_Slots+s],Item_LV)+getVal(Comp1_Inv[Stickmen_Slots+s],Item_LV)+getVal(Comp2_Inv[Stickmen_Slots+s],Item_LV);

    if (floor((FP[0]-1)/20) < 9)
         Rank[0] = floor((FP[0]-1)/20);
    else Rank[0] = 9;
    if (floor((FP[1]-1)/20) < 9)
         Rank[1] = floor((FP[1]-1)/20);
    else Rank[1] = 9;
    if (Game_Mode!=1)
         team_last = Stickmen_Slots;
    else team_last = Stickmen_Slots<<1;

    for (var s=0; s<team_last; s++){
        STR[s] = STR_SP[s]; // get STR/DEX/MAG from invested SP
        DEX[s] = DEX_SP[s];
        MAG[s] = MAG_SP[s];
        if (checkEff(Stickmen_Slots+s,Stone_Red))
            STR[s] += getEff(Stickmen_Slots+s,Eff1); // add stones to STR/DEX/MAG
        if (checkEff(Stickmen_Slots+s,Stone_Green))
            DEX[s] += getEff(Stickmen_Slots+s,Eff1);
        if (checkEff(Stickmen_Slots+s,Stone_Blue))
            MAG[s] += getEff(Stickmen_Slots+s,Eff1);
        if (checkEff(Stickmen_Slots+s,Stone_Black)){
            STR[s] += getEff(Stickmen_Slots+s,Eff1);
            DEX[s] += getEff(Stickmen_Slots+s,Eff1);
            MAG[s] += getEff(Stickmen_Slots+s,Eff1);
        }
        wATn = getVal(Item_Inv[Stickmen_Slots+s],Item_AT_Min);
        wATx = getVal(Item_Inv[Stickmen_Slots+s],Item_AT_Max);
        wAGIn = getVal(Item_Inv[Stickmen_Slots+s],Weap_AGI_Min);
        wAGIx = getVal(Item_Inv[Stickmen_Slots+s],Weap_AGI_Max);
        wRnge = getVal(Item_Inv[Stickmen_Slots+s],Weap_Range);
        switch (Ranger_Class[s]){ // calculating values for UI
            case 1: // boxer
                AT_Min[s] = wATn+(STR[s]>>1);                          // Min AT
                AT_Max[s] = wATx+(STR[s]>>1);                          // Max AT
                if (wAGIn < maxOf(wAGIn-DEX[s],5))
                     Agi_Min[s] = wAGIn;                               // Min AGI
                else Agi_Min[s] = maxOf(wAGIn-DEX[s],5);
                if (wAGIx < maxOf(wAGIx-DEX[s],10))
                     Agi_Max[s] = wAGIx;                               // Max AGI
                else Agi_Max[s] = maxOf(wAGIx-DEX[s],10);
                Range[s] = wRnge;                                      // Range (from weapon)
                LP_Max[s] = 50+10*LP_SP[s]+4*STR[s]+3*DEX[s]+2*MAG[s]; // LP
                break;
            case 2: // gladiator
                AT_Max[s] = wATx+STR[s];                               // Max AT
                if (wATn+DEX[s] < AT_Max[s])
                     AT_Min[s] = wATn+DEX[s];                          // Min AT
                else AT_Min[s] = AT_Max[s];
                Agi_Min[s] = wAGIn;                                    // Min AGI
                Agi_Max[s] = wAGIx;                                    // Max AGI
                Range[s] = wRnge;                                      // Range (from weapon)
                if (checkEff(Stickmen_Slots+s,Card_Longsw))
                    Range[s] += getEff(Stickmen_Slots+s,Eff1);         // Range (from Long Sword's Card)
                if (checkEff(Stickmen_Slots+s,Card_Katana))
                    Range[s] += getEff(Stickmen_Slots+s,Eff2);         // Range (from Katana's Card)
                LP_Max[s] = 50+10*LP_SP[s]+4*STR[s]+4*DEX[s]+2*MAG[s]; // LP
                break;
            case 3: // sniper
                AT_Min[s] = wATn+(DEX[s]>>2);                          // Min AT
                AT_Max[s] = wATx+floor(DEX[s]/3);                      // Max AT
                Agi_Min[s] = wAGIn;                                    // Min AGI
                Agi_Max[s] = wAGIx;                                    // Max AGI
                Range[s] = wRnge+2*STR[s];                             // Range (from weapon and SP)
                if (checkEff(Stickmen_Slots+s,Card_Catapt))
                    Range[s] += getEff(Stickmen_Slots+s,Eff1);         // Range (from Catapult's Card)
                LP_Max[s] = 50+8*LP_SP[s]+2*STR[s]+3*DEX[s]+2*MAG[s];  // LP
                break;
            case 4: // magician
                AT_Min[s] = wATn+(MAG[s]>>2);                          // Min AT
                AT_Max[s] = wATx+floor(MAG[s]/3);                      // Max AT
                Agi_Min[s] = maxOf(wAGIn-DEX[s],50);                   // Min AGI
                Agi_Max[s] = maxOf(wAGIx-DEX[s],60);                   // Max AGI
                Range[s] = wRnge+2*STR[s];                             // Range (from weapon and SP)
                if (checkEff(Stickmen_Slots+s,Card_Catapt))
                    Range[s] += getEff(Stickmen_Slots+s,Eff1);         // Range (from Catapult's Card)
                LP_Max[s] = 50+8*LP_SP[s]+2*STR[s]+2*DEX[s]+2*MAG[s];  // LP
                break;
            case 5: // priest
                AT_Min[s] = wATn;                                      // Min AT
                AT_Max[s] = wATx;                                      // Max AT
                Agi_Min[s] = wAGIn;                                    // Min AGI
                Agi_Max[s] = wAGIx;                                    // Max AGI
                Range[s] = wRnge+2*MAG[s];                             // Range (from weapon and SP)
                if (checkEff(Stickmen_Slots+s,Card_Catapt))
                    Range[s] += getEff(Stickmen_Slots+s,Eff1);         // Range (from Catapult's Card)
                LP_Max[s]=50+8*LP_SP[s]+2*STR[s]+2*DEX[s]+2*MAG[s];    // LP
                break;
            case 6: // gunner
                AT_Min[s] = wATn+floor(wATn*STR[s]/50);                // Min AT
                AT_Max[s] = wATx+floor(wATx*STR[s]/50);                // Max AT
                Agi_Min[s] = maxOf(floor(50*wAGIn/(DEX[s]+50)),5);     // Min AGI
                Agi_Max[s] = maxOf(floor(50*wAGIx/(DEX[s]+50)),10);    // Max AGI
                Range[s] = wRnge;                                      // Range (from weapon)
                if (checkEff(Stickmen_Slots+s,Card_Catapt))
                    Range[s] += getEff(Stickmen_Slots+s,Eff1);         // Range (from Catapult's Card)
                LP_Max[s] = 50+8*LP_SP[s]+2*STR[s]+2*DEX[s]+2*MAG[s];  // LP
                break;
            case 7: // whipper
                AT_Min[s] = wATn+(STR[s]>>1);                          // Min AT
                AT_Max[s] = wATx+(STR[s]>>1);                          // Max AT
                Agi_Min[s] = wAGIn;                                    // Min AGI
                Agi_Max[s] = wAGIx;                                    // Max AGI
                Range[s] = wRnge;                                      // Range (from weapon)
                LP_Max[s] = 50+10*LP_SP[s]+3*STR[s]+3*DEX[s]+2*MAG[s]; // LP
                break;
            case 8: // angel
                AT_Min[s] = wATn+(STR[s]>>2);                          // Min AT
                AT_Max[s] = wATx+floor(STR[s]/3);                      // Max AT
                Agi_Min[s] = wAGIn;                                    // Min AGI
                Agi_Max[s] = wAGIx;                                    // Max AGI
                Range[s] = wRnge;                                      // Range (from weapon)
                if (checkEff(Stickmen_Slots+s,Card_Catapt))
                    Range[s] += getEff(Stickmen_Slots+s,Eff1);         // Range (from Catapult's Card)
                LP_Max[s] = 50+10*LP_SP[s]+4*STR[s]+2*DEX[s]+2*MAG[s]; // LP
                break;
        }
        if (checkEff(Stickmen_Slots+s,Stone_White)) // LP boosting compos
            LP_Max[s] += getEff(Stickmen_Slots+s,Eff1);

        if (checkEff(Stickmen_Slots+s,Card_Zombie))
            LP_Max[s] += floor(getEff(Stickmen_Slots+s,Eff1)*LP_Max[s]/100);

        if (checkEff(Stickmen_Slots+s,Card_Rings))
            LP_Max[s] += getEff(Stickmen_Slots+s,Eff2);

        switch (getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID)){ // damage compos on UI
            case 1: // Boxer
            case 2: // Gladiator       // These classes use MP
            case 3: // Sniper          // Jewels only apply to bonus attacks, which are seperate from the initial physical attack
            case 7: // Whipper         // Red Crystals, Yellow Crystals, and Katana's Cards only apply to the initial physical attack
            case 8: // Angel
                if (checkEff(Stickmen_Slots+s,Crystal_Red)){
                    AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                    AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                }
                if (checkEff(Stickmen_Slots+s,Crystal_Yellow)){
                    AT_Min[s] += floor(getEff(Stickmen_Slots+s,Eff1)*AT_Min[s]/100);
                    AT_Max[s] += floor(getEff(Stickmen_Slots+s,Eff1)*AT_Max[s]/100);
                }
                if (checkEff(Stickmen_Slots+s,Card_Katana)){
                    AT_Min[s] += floor(getEff(Stickmen_Slots+s,Eff1)*AT_Min[s]/100);
                    AT_Max[s] += floor(getEff(Stickmen_Slots+s,Eff1)*AT_Max[s]/100);
                }
                break;
            case 4: // Magician         // Jewels also affect the initial attack for these classes
            case 5: // Priest
                if (checkEff(Stickmen_Slots+s,Jewel_Ruby)){
                    AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                    AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                }
                if (checkEff(Stickmen_Slots+s,Jewel_Sapphire)){
                    AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                    AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                }
                if (checkEff(Stickmen_Slots+s,Jewel_Topaz)){
                    AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                    AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                }
                if (checkEff(Stickmen_Slots+s,Jewel_Emerald)){
                    AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                    AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                }
                break;
            case 6: // Gunner                    // Crystals affect the initial attack of guns
                if (checkEff(Stickmen_Slots+s,Crystal_Red)){
                    AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                    AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                }
                if (checkEff(Stickmen_Slots+s,Crystal_Yellow)){
                    AT_Min[s] += floor(getEff(Stickmen_Slots+s,Eff1)*AT_Min[s]/100);
                    AT_Max[s] += floor(getEff(Stickmen_Slots+s,Eff1)*AT_Max[s]/100);
                }
                if (getVal(Item_Inv[Stickmen_Slots+s],Item_Res_Mode)==false){ // if the gun is elemental but has no bonus attack
                    if (checkEff(Stickmen_Slots+s,Jewel_Ruby)){               // the jewel also affects the initial attack
                        AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                        AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                    }
                    if (checkEff(Stickmen_Slots+s,Jewel_Sapphire)){
                        AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                        AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                    }
                    if (checkEff(Stickmen_Slots+s,Jewel_Topaz)){
                        AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                        AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                    }
                    if (checkEff(Stickmen_Slots+s,Jewel_Emerald)){
                        AT_Min[s] += getEff(Stickmen_Slots+s,Eff1);
                        AT_Max[s] += getEff(Stickmen_Slots+s,Eff2);
                    }
                }
        }
        if (checkEff(Stickmen_Slots+s,Card_Quicks)){
            agi_reduction = getEff(Stickmen_Slots+s,Eff1);
            Agi_Min[s] -= floor(Agi_Min[s]*agi_reduction/100);
            Agi_Max[s] -= floor(Agi_Max[s]*agi_reduction/100);
        }
        AT_Min[s] += floor(AT_Min[s]*STR_Aura[s]/100); // Priest STR aura
        AT_Max[s] += floor(AT_Max[s]*STR_Aura[s]/100);

        if (Game_Mode==1){
            LP_Max[s] *= [1,5,5,5,5,3,4,5,5][Ranger_Class[s]]; // LP boost for VS mode characters
            LP_Max[s] *= Rank[1]+1;
        }
        LP_Current[s] = clamp(LP_Current[s],0,LP_Max[s]);
    }
    for (var s=0; s<team_last; s++){
        STR_Aura[s] = 0;
        DEX_Aura[s] = 0;
        MAG_Aura[s] = 0;
    }
    for (var s=0; s<team_last; s++){
        if (Ranger_Class[s]==5 && getVal(Item_Inv[Stickmen_Slots+s],Item_Class_ID)==5 && LP_Current[s]!=0){
            aura_Xpos = floor(Players.PL_joint[s][9].x+Players.PL_joint[s][10].x)>>1; // get center position of the priest's aura
            aura_Ypos = floor(Players.PL_joint[s][9].y+Players.PL_joint[s][10].y)>>1;

            for (var j=team_last-4; j<team_last; j++){
                if (LP_Current[j]!=0){
                    ranger_Xpos = floor(Players.PL_joint[j][9].x+Players.PL_joint[j][10].x)>>1; // get position of the character (that could receive the aura)
                    ranger_Ypos = floor(Players.PL_joint[j][9].y+Players.PL_joint[j][10].y)>>1;
                    if (absVal(aura_Xpos-ranger_Xpos) < Range[s] && absVal(aura_Ypos-ranger_Ypos) < Range[s]){ // check to see if character is in range of the aura
                        STR_Aura[j] += STR[s];
                        DEX_Aura[j] += DEX[s];
                        MAG_Aura[j] += MAG[s];
                    }
                }
            }
        }
    }
    for (var s=0; s<team_last; s++){
        if (LP_Current[s]!=0 && checkEff(Stickmen_Slots+s,Card_Bersrk))
            STR_Aura[s] += getEff(Stickmen_Slots+s,Eff1); // Berserk Card
    }
    antiCheatSet();
}
