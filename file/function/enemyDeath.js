function enemyDeath(enemy,en_ID,xp_is_given){ // original name: Jg()
    var en_ID2,next_stage_enemy,lvl_diff,xp_earned,exp_mult,anger_crown,spirit_target,gold_value,gold_value_mult,onigiri_rate_mult,drop_rate_mult,direction;
    var highest_en_lvl = 0;
    for (var s=0; s<Stage_Count; s++){
        if ((Stage_Status[s]&Unlocked)!=0){
            next_stage_enemy = Book_Indexer[s+1]-Book_Indexer[s];
            for (var e=0; e<next_stage_enemy; e++){
                if (EN_Info[Book_Indexer[s]+e][EN_Lvl]>highest_en_lvl)
                    highest_en_lvl = EN_Info[Book_Indexer[s]+e][EN_Lvl];
                e += EN_Info[Book_Indexer[s]+e][En_2nd_Att]; // skip over arrays that are just 2nd attacks (e.g. for megabosses)
            }
        }
    }
    if (xp_is_given==1)
         en_ID2 = en_ID;
    else en_ID2 = enemy.EN_array_ID[en_ID];

    lvl_diff = absVal(LV[0]-EN_Info[en_ID2][EN_Lvl]);
    xp_earned = 0;

    if (Randomizer_Mode==1){ // exp gain in randomizer
        if (LV[0] <= EN_Info[en_ID2][EN_Lvl])         // if player LV is below enemy LV
            xp_earned = xp_earned = EN_Info[en_ID2][EN_EXP];
        else if (LV[0] >= EN_Info[en_ID2][EN_Lvl]+10) // if enemy is 10+ levels below
            xp_earned = 1;
        else                                          // if enemy is 1-9 levels below
            xp_earned = floor(EN_Info[en_ID2][EN_EXP]*(10-lvl_diff)/10);
    } else { // normal exp gain
        if (lvl_diff<10)                     // if player LV is +/- 9 of enemy LV
            xp_earned = floor(EN_Info[en_ID2][EN_EXP]*(10-lvl_diff)/10);
        else if (LV[0] >= highest_en_lvl+10) // if player is 10+ levels above the highest leveled enemy available
            xp_earned = 0;
        else                                 // if player is 10+ levels below
            xp_earned = 1;
    }

    exp_mult = 100;
    for (var s=0; s<Stickmen_Slots; s++){
        if (checkEff(Stickmen_Slots+s,Medal_Iron))
            exp_mult += getEff(Stickmen_Slots+s,Eff1);
    }
    xp_earned = floor(xp_earned*exp_mult/100);

    if (xp_is_given==1)
        return xp_earned;

    // leveling up
    antiCheatCheck();
    Team_EXP = clamp(Team_EXP+xp_earned,0,9999999);
    xp_for_prev_LV = 4753000;
    xp_for_next_LV = 9999999;

    if (LV[0]<98){
        xp_for_prev_LV = 0;
        for (var l=1; l<LV[0]; l++)
            xp_for_prev_LV += 1000*l;
        xp_for_next_LV = xp_for_prev_LV+1000*l;
    }
    if (xp_for_next_LV<=Team_EXP && LV[0]<99){
        LV[0]++;
        for (var s=0; s<Stickmen_Slots; s++)
            SP[s] += 2;

        // anger crown effect
        anger_crown = false;
        for (var i=Stickmen_Slots; i<Inv_Last; i++){
            if (getVal(Item_Inv[i],Eff_ID)==Crown_Anger || getVal(Comp1_Inv[i],Eff_ID)==Crown_Anger || getVal(Comp2_Inv[i],Eff_ID)==Crown_Anger)
                anger_crown = true;
        }
        if (anger_crown==true){
            Anger_Crown_Lightning = 480;
            for (var s=0; s<Stickmen_Slots; s++){
                Players.PLprojectileAttack(562,Players.PL_joint[s][0].x,Players.PL_joint[s][0].y,0);
                if (LP_Current[s]!=LP_Max[s]){
                    Indicators.INadd(Players.PL_joint[s][0].x,Players.PL_joint[s][0].y,0,LP_Max[s]-LP_Current[s],0x00FF00); // output LP restore
                    LP_Current[s] = LP_Max[s]; // restore LP
                }
            }
        }
    }
    antiCheatSet();
    //*
    for (var s=0; s<Stickmen_Slots; s++){
        if (checkEff(Stickmen_Slots+s,Spirit_Eff) && random(100)<getEff(Stickmen_Slots+s,Eff1)){
            spirit_target = Enemies.ENfindEnemy(enemy.EN_joint[en_ID][0].x-600,enemy.EN_joint[en_ID][0].y-300,enemy.EN_joint[en_ID][0].x+600,enemy.EN_joint[en_ID][0].y+300);
            if (spirit_target!=-1)
                Players.PLprojectileAttack(getEff(Stickmen_Slots+s,Eff2),enemy.EN_joint[en_ID][0].x,enemy.EN_joint[en_ID][0].y,spirit_target);
        }
    }
    //*/
    /* Spirited mod
    for (var i=0; i<Inv_Last; i++){
        if (getVal(Item_Inv[i],Eff_ID)==Spirit_Eff && random(100)<getVal(Item_Inv[i],Eff1)){
            spirit_target = Enemies.ENfindEnemy(enemy.EN_joint[en_ID][0].x-600,enemy.EN_joint[en_ID][0].y-300,enemy.EN_joint[en_ID][0].x+600,enemy.EN_joint[en_ID][0].y+300);
            if (spirit_target!=-1)
                Players.PLprojectileAttack(getVal(Item_Inv[i],Eff2),enemy.EN_joint[en_ID][0].x,enemy.EN_joint[en_ID][0].y,spirit_target);
        }
    }
    //*/
    gold_value = EN_Info[enemy.EN_array_ID[en_ID]][En_Gold];
    gold_value_mult = 100;
    onigiri_rate_mult = 100;
    drop_rate_mult = 100;
    for (var s=0; s<Stickmen_Slots; s++){
        if (checkEff(Stickmen_Slots+s,Medal_Bronze))
            drop_rate_mult += getEff(Stickmen_Slots+s,Eff1);
        if (checkEff(Stickmen_Slots+s,Medal_Silver))
            onigiri_rate_mult += getEff(Stickmen_Slots+s,Eff1);
        if (checkEff(Stickmen_Slots+s,Medal_Gold))
            gold_value_mult += getEff(Stickmen_Slots+s,Eff1);
    }
    direction = 0;
    if (enemy.EN_species_ID[en_ID]==17)
        direction = enemy.EN_state[en_ID]-1;

    for (var d=En_Drop1; d<En_Drop1+6; d+=2){
            // if enemy has a drop in this slot    &&  random*drop rate*100 < 100  **aka**  random < 1/drop rate
        if (EN_Info[enemy.EN_array_ID[en_ID]][d]!=0 && Math.random()*EN_Info[enemy.EN_array_ID[en_ID]][d+1]*100 < drop_rate_mult) // item drop
            Drops.DPadd(enemy.EN_joint[en_ID][direction].x,enemy.EN_joint[en_ID][direction].y,EN_Info[enemy.EN_array_ID[en_ID]][d],0,0);
    }
    if (3*Math.random() < 1) // 33% chance of dropping gold
        Drops.DPadd(enemy.EN_joint[en_ID][direction].x,enemy.EN_joint[en_ID][direction].y,1,floor(gold_value*gold_value_mult/100),0); // gold drop
    if (500*Math.random() < onigiri_rate_mult) // 20% chance of dropping onigiri
        Drops.DPadd(enemy.EN_joint[en_ID][direction].x,enemy.EN_joint[en_ID][direction].y,2,0,0); // onigiri drop
    return 0;
}
