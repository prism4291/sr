window.fff = SR_Enemy.prototype.ENmain;
SR_Enemy.prototype.ENmain = function(){ // original name: hh.prototype.move
    var type;
    for (var current_en=0; current_en<this.EN_index_current; current_en++){
        type = this.EN_species_ID[current_en];

        if (this.EN_poison_ticks[current_en]>0 && this.EN_health[current_en]>0){
            this.EN_poison_ticks[current_en]--;
            DPSM_Calculator.CL_dmg_session[this.EN_DPSM_poisoner[current_en]] += minOf(this.EN_health[current_en],this.EN_poison_dmg[current_en]);
            DPSM_Calculator.CL_DPS_session[this.EN_DPSM_poisoner[current_en]] += minOf(this.EN_health[current_en],this.EN_poison_dmg[current_en]);
            DPSM_Calculator.CL_dmg_stage[this.EN_DPSM_poisoner[current_en]] += minOf(this.EN_health[current_en],this.EN_poison_dmg[current_en]);
            DPSM_Calculator.CL_DPS_stage[this.EN_DPSM_poisoner[current_en]] += minOf(this.EN_health[current_en],this.EN_poison_dmg[current_en]);
            for (var i=0; i<DPSM_Calculator.CL_interval_count; i++)
                DPSM_Calculator.CL_dmg[i][this.EN_DPSM_poisoner[current_en]] += minOf(this.EN_health[current_en],this.EN_poison_dmg[current_en]);

            this.EN_health[current_en] = maxOf(this.EN_health[current_en]-this.EN_poison_dmg[current_en],0);
            Target_HP_Current = this.EN_health[current_en];
            Target_HP_Max = EN_Info[this.EN_array_ID[current_en]][EN_LP];
            En_Count_From_Max = 100;
            Target_Array_ID = this.EN_array_ID[current_en];
        }
        else {
            this.EN_DPSM_poisoner[current_en] = -1; // unset poisoner
        }
        if (this.EN_frozen_ticks[current_en]>0 && this.EN_health[current_en]>0){
            this.EN_frozen_ticks[current_en]--;
        } else {
            if (this.EN_ice_ticks[current_en]>0 && this.EN_health[current_en]>0 && (this.EN_ice_ticks[current_en]--,this.EN_slowness[current_en]>random(100)))
                continue;

            switch (type){
                case 0: current_en = this.ENwlk(current_en); break;       // Walker
                case 1: current_en = this.ENsnk(current_en); break;       // Snake
                case 2: current_en = this.ENbat(current_en); break;       // Bat
                case 3: current_en = this.ENdgn(current_en); break;       // Dragon
                case 4: current_en = this.ENstk(current_en,type); break;  // Stickman
                case 5: current_en = this.ENtre(current_en,type); break;  // Tree
                case 6: current_en = this.ENwhe(current_en); break;       // Wheel
                case 7: current_en = this.ENfsh(current_en); break;       // Fish
                case 8: current_en = this.ENmsh(current_en); break;       // Mushroom
                case 9: current_en = this.ENeel(current_en,type); break;  // Eel (swimming)
                case 10: current_en = this.ENspr(current_en); break;      // Spider
                case 11: current_en = this.ENcts(current_en); break;      // Cactus
                case 12: current_en = this.ENstk(current_en,type); break; // Zombie
                case 13: current_en = this.ENeel(current_en,type); break; // Eel (flying)
                case 14: current_en = this.ENcop(current_en); break;      // Copter
                case 15: current_en = this.ENbon(current_en); break;      // Bouncer
                case 16: current_en = this.ENgrm(current_en); break;      // Germ
                case 17: current_en = this.ENdig(current_en); break;      // Digger
                case 18: current_en = this.ENtre(current_en,type); break; // Tree (hanging)
            }
        }
    }
};
