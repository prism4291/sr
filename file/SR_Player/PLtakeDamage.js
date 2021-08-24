// do damage to player original name: Pg.prototype.K
SR_Player.prototype.PLtakeDamage = function(attacker,splash,type,type_parameter,ATmin,ATmax,is_critical,focus_Xpos,focus_Ypos,hitbox_width,hitbox_height,team_leader){
    var pl_damage,resist;
    var target_ID = -1;
    var indicr_color = 0xFF0000;  // color of damage indicators
    this.PL_dmg_dealt[attacker] = 0;
    hitbox_width *= 0.5;
    hitbox_height *= 0.5;

    for (var s=team_leader; s<team_leader+Stickmen_Slots; s++){
        if (this.PL_class_ID[s]!=Class_Dead && !(this.PL_joint[s][2].x-5 > focus_Xpos+hitbox_width || this.PL_joint[s][2].x+5 < focus_Xpos-hitbox_width || this.PL_joint[s][2].y-10 > focus_Ypos+hitbox_height || this.PL_joint[s][2].y+10 < focus_Ypos-hitbox_height)){
            target_ID = -1;
            pl_damage = ATmin+floor(random(ATmax-ATmin+1));
            this.PL_damaged_ticks[s] = 2; // amount of time that character turns red when hit
            if (s>=Stickmen_Slots){
                target_ID = 1;
                if (is_critical == true)
                     indicr_color = 0xFFC0C0; // critical highlight
                else indicr_color = 0xC0C0C0; // color of vs mode enemy team indicators
            }

            // damage altering compos
            if (checkEff(Stickmen_Slots+s,Card_Bersrk))
                pl_damage += floor(pl_damage*getEff(Stickmen_Slots+s,Eff2)/100);
            resist = false;
            switch (type) {
                case 0: // physical attack
                    pl_damage = maxOf(1,pl_damage-floor(DEX_Aura[s]/5)); break; // defense aura effect
                case 1: // fire attack
                    if (checkEff(Stickmen_Slots+s,Card_Zombie))
                        pl_damage += floor(pl_damage*getEff(Stickmen_Slots+s,Eff2)/100); break; // zombie's card weakness vs fire damage
                case 2: // ice attack
                    if (checkEff(Stickmen_Slots+s,Charm_Ice) && random(100)<getEff(Stickmen_Slots+s,Eff1)) // ice ward vs ice
                        resist = true;
                    if (resist==false){
                        this.PL_ice_ticks[s] = 500; // duration of slow when iced
                        this.PL_slowness[s] = type_parameter;
                        if (checkEff(Stickmen_Slots+s,Crystal_Purple))
                            this.PL_ice_ticks[s] -= floor(this.PL_ice_ticks[s]*getEff(Stickmen_Slots+s,Eff1)/100);       // purple crystal effect vs slow duration
                    } break;
                case 4: // poison attack
                    if (checkEff(Stickmen_Slots+s,Charm_Poison) && random(100)<getEff(Stickmen_Slots+s,Eff1))
                        resist = true; // poison ward vs poison
                    if (resist==false){
                        this.PL_poison_ticks[s] = type_parameter;
                        this.PL_poison_dmg[s] = pl_damage;
                        if (checkEff(Stickmen_Slots+s,Crystal_Purple)){
                            this.PL_poison_ticks[s] -= floor(this.PL_poison_ticks[s]*getEff(Stickmen_Slots+s,Eff1)/100); // purple crystal effect vs poison duration
                            this.PL_poison_dmg[s] -= floor(this.PL_poison_dmg[s]*getEff(Stickmen_Slots+s,Eff1)/100);     // purple crystal effect vs poison damage
                        }
                    }
                    target_ID = s;
                    continue; break;
                case 5: // freeze attack
                    if (checkEff(Stickmen_Slots+s,Charm_Freeze) && random(100)<getEff(Stickmen_Slots+s,Eff1))
                        resist = true; // freeze ward vs freeze
                    if (resist==false){
                        this.PL_frozen_ticks[s] = floor(type_parameter/10);
                        if (checkEff(Stickmen_Slots+s,Crystal_Purple))
                            this.PL_frozen_ticks[s] -= floor(this.PL_frozen_ticks[s]*getEff(Stickmen_Slots+s,Eff1)/100);
                    } break;
            }
            if (checkEff(Stickmen_Slots+s,Crystal_Silver) && type==0)
                pl_damage = maxOf(1,pl_damage-getEff(Stickmen_Slots+s,Eff1));                           // silver crystal effect
            if (checkEff(Stickmen_Slots+s,Crystal_Purple) && type!=0)
                pl_damage -= floor(pl_damage*getEff(Stickmen_Slots+s,Eff1)/100);                        // purple crystal effect vs damage
            if (checkEff(Stickmen_Slots+s,Crystal_Black) && random(100)<getEff(Stickmen_Slots+s,Eff1)){ // black crystal effect
                pl_damage = 0;
                this.PL_damaged_ticks[s] = 0;
                indicr_color = 0xFF8080; // color of 0 damage number (number when attack is blocked)
            }
            antiCheatCheck();
            /*DPSM_Calculator.CL_dmg_session[attacker] += minOf(LP_Current[s],pl_damage);
            DPSM_Calculator.CL_DPS_session[attacker] += minOf(LP_Current[s],pl_damage);
            DPSM_Calculator.CL_dmg_stage[attacker] += minOf(LP_Current[s],pl_damage);
            DPSM_Calculator.CL_DPS_stage[attacker] += minOf(LP_Current[s],pl_damage);
            for (var i=0; i<DPSM_Calculator.CL_interval_count; i++)
                DPSM_Calculator.CL_dmg[i][attacker] += minOf(LP_Current[s],pl_damage);*/

            LP_Current[s] = clamp(LP_Current[s]-pl_damage,0,LP_Max[s]);
            //LP_Current[s] = clamp(LP_Current[s]-pl_damage,1,LP_Max[s]); // unkillable stickmen for testing
            antiCheatSet();
            if (Sett_Dmg_Indicators<2)
                Indicators.INadd(this.PL_joint[s][0].x,this.PL_joint[s][0].y,target_ID,pl_damage,indicr_color); // output damage effect
            this.PL_dmg_dealt[attacker] += pl_damage;
            target_ID = s;
            // if no area of effect, break
            if (splash==false)
                break;
        }
    }
    return target_ID;
};
