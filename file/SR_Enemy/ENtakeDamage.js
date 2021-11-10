SR_Enemy.prototype.ENtakeDamage = function(attacker,splash,type,type_parameter,ATmin,ATmax,is_critical,x_pos,y_pos,hitbox_width,hitbox_height){ // original name: aa.K
    var hurtbox_height,hurtbox_width,en_damage,indicr_color;
    var target_ID = -1;
    Players.PL_dmg_dealt[attacker] = 0;
    hitbox_width *= 0.5;
    hitbox_height *= 0.5;

    for (var e=0; e<this.EN_index_current; e++){
        hurtbox_height = EN_Info[this.EN_array_ID[e]][EN_Size];
        species = EN_Info[this.EN_array_ID[e]][EN_Species];
        hurtbox_width = (Hitboxvar1[species]>>1)*((hurtbox_height>>1)+1);
        hurtbox_height *= Hitboxvar2[species]>>1;

        if (is_critical == true)
             indicr_color = 0xFFC0C0; // critical highlight
        else indicr_color = 0xC0C0C0; // color of enemy indicators

        if (this.EN_health[e]>0 && this.EN_joint[e][this.EN_center].x-hurtbox_width <= x_pos+hitbox_width && this.EN_joint[e][this.EN_center].x+hurtbox_width >= x_pos-hitbox_width && this.EN_joint[e][this.EN_center].y-hurtbox_height <= y_pos+hitbox_height && this.EN_joint[e][this.EN_center].y+hurtbox_height >= y_pos-hitbox_height){
            en_damage = ATmin+floor(random(ATmax-ATmin+1));
            if (type==4){ // poison attack
                this.EN_poison_ticks[e] = type_parameter-floor(type_parameter*EN_Info[this.EN_array_ID[e]][Po_Resist]/100);
                this.EN_poison_dmg[e] = en_damage;
                this.EN_DPSM_poisoner[e] = attacker;
                if (EN_Info[this.EN_array_ID[e]][Po_Resist]<0)
                    this.EN_poison_dmg[e] = maxOf(1,en_damage-floor(en_damage*EN_Info[this.EN_array_ID[e]][Po_Resist]/100));
            } else {
                if (type==0) // physical damage
                    en_damage = maxOf(1,en_damage-EN_Info[this.EN_array_ID[e]][Ph_Resist]);
                if (type==1) // fire damage
                    en_damage = maxOf(1,en_damage-floor(en_damage*EN_Info[this.EN_array_ID[e]][Fi_Resist]/100));
                if (type==2) // ice damage
                    en_damage = maxOf(1,en_damage-floor(en_damage*EN_Info[this.EN_array_ID[e]][Ic_Resist]/100));
                if (type==3) // thunder damage
                    en_damage = maxOf(1,en_damage-floor(en_damage*EN_Info[this.EN_array_ID[e]][Th_Resist]/100));

                if ((Sett_Dmg_Indicators&1)==0)
                    Indicators.INadd(this.EN_joint[e][this.EN_center].x,this.EN_joint[e][this.EN_center].y-hurtbox_height,1,en_damage,indicr_color);

                this.EN_is_provoked[e] = en_damage;
            }
            if (type==2){ // ice slow
                this.EN_ice_ticks[e] = 500-floor(500*EN_Info[this.EN_array_ID[e]][Ic_Resist]/100);
                this.EN_slowness[e] = type_parameter;
            }
            if (type==5) // freeze stop
                this.EN_frozen_ticks[e] = type_parameter-floor(type_parameter*EN_Info[this.EN_array_ID[e]][Fr_Resist]/100);

            DPSM_Calculator.CL_dmg_session[attacker] += minOf(this.EN_health[e],en_damage);
            DPSM_Calculator.CL_DPS_session[attacker] += minOf(this.EN_health[e],en_damage);
            DPSM_Calculator.CL_dmg_stage[attacker] += minOf(this.EN_health[e],en_damage);
            DPSM_Calculator.CL_DPS_stage[attacker] += minOf(this.EN_health[e],en_damage);
            for (var i=0; i<DPSM_Calculator.CL_interval_count; i++)
                DPSM_Calculator.CL_dmg[i][attacker] += minOf(this.EN_health[e],en_damage);
            en_damage=1;
            this.EN_health[e] = maxOf(this.EN_health[e]-en_damage,0);
            target_ID = e;
            Players.PL_dmg_dealt[attacker] += en_damage;
            Target_HP_Current = this.EN_health[e];
            Target_HP_Max = EN_Info[this.EN_array_ID[e]][EN_LP];
            En_Count_From_Max = 100;
            Target_Array_ID = this.EN_array_ID[e];

            if (splash==0)
                break;
        }
    }
    return target_ID;
};
