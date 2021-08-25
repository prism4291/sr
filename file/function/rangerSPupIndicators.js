function rangerSPupIndicators(ranger,stat){
    var ring_increase = 0;
    if (stat==1){ // effect of LP investment
        switch (Ranger_Class[ranger]){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"LP+",0xFFFFFFFF); break;
        }
    } else if (stat==2){ // effect of STR investment
        switch (Ranger_Class[ranger]){
            case 1:
            case 2:
            case 6:
            case 7:
            case 8: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"AT+",0xFFFF0000); break;
            case 3:
            case 4: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"RANGE+",0xFF00FFFF); break;
            case 5: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"AURA+",0xFFFF0000); break;
        }
    } else if (stat==3){ // effect of DEX investment
        switch (Ranger_Class[ranger]){
            case 1:
            case 4:
            case 6: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"AGI-",0xFF00FF00); break;
            case 2:
            case 3: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"AT+",0xFFFF0000); break;
            case 5: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"AURA+",0xFF00FF00); break;
            case 7: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"BULLET+",0xFFFFFF00); break;
            case 8: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"RING+",0xFFFFFF00); break;

        }
    } else if (stat==4){ // effect of MAG investment
        switch (Ranger_Class[ranger]){
            case 1:
            case 2:
            case 3:
            case 7:
            case 8: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"MP+"+1,0xFF6666FF); break;
            case 4: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"AT+",0xFFFF0000); break;
            case 5: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"RANGE+",0xFF00FFFF); break;
            case 6: Indicators.INadd(Players.PL_joint[Selected_Player][0].x,Players.PL_joint[Selected_Player][0].y,0,"COST-",0xFFFFFF00); break;
        }
    }
}
