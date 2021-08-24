// gunner class     original name: va
window.fff = SR_Player.prototype.Gunner;
SR_Player.prototype.Gunner = function(current_char){
    var gnr_target,gnr_is_controlled,gnr_heals_eff;
    var point_gun = new Vector2D;
    var gnr_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1); // set base stats
    var gnr_range = Range[current_char];
    var gun_cost = getVal(Item_Inv[Stickmen_Slots+current_char],Weap_MP_Price);
    var gun_bullet = 1;
    var gnr_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var gnr_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             gnr_target = Enemies.ENfindEnemy(gnr_Xpos-gnr_range,gnr_Ypos-gnr_range,gnr_Xpos+gnr_range,gnr_Ypos+gnr_range);
        else gnr_target = Players.PLfindPlayer(gnr_Xpos-gnr_range,gnr_Ypos-gnr_range,gnr_Xpos+gnr_range,gnr_Ypos+gnr_range,getLeader(current_char,1));

        gnr_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            gnr_is_controlled = 1;
        }

        if (gnr_target!=-1){ // gunner body movement when aiming
            if (Game_Mode!=1)
                 point_gun.Vdistance(Enemies.EN_joint[gnr_target][Enemies.EN_center],this.PL_joint[current_char][6]);
            else point_gun.Vdistance(this.PL_joint[gnr_target][2],this.PL_joint[current_char][6]);
            normalize(point_gun);
                // pulls hands toward target so that gunner is pointing gun at target
            this.PL_joint[current_char][5].x += 0.2*point_gun.x; // move left hand right
            this.PL_joint[current_char][5].y += 0.2*point_gun.y; // move left hand down
            this.PL_joint[current_char][6].x += 0.2*point_gun.x; // move right hand right
            this.PL_joint[current_char][6].y += 0.2*point_gun.y; // move right hand down
                // counters the pull
            this.PL_joint[current_char][1].x -= 0.4*point_gun.x; // move neck left
            this.PL_joint[current_char][1].y -= 0.4*point_gun.y; // move neck up

            if (this.PL_reload_ticks[current_char]==0){       // when ready to attack
                this.PL_reload_ticks[current_char] = gnr_AGI; // restart reload timer
                // gunner body movement when attacking (gun recoil)
                this.PL_joint[current_char][5].y -= 1.5;         // move left hand up
                this.PL_joint[current_char][6].y -= 1.5;         // move right hand up
                this.PL_joint[current_char][3].y += 1.6;         // move left elbow down
                this.PL_joint[current_char][4].y += 1.6;         // move right elbow down
                this.PL_focus[current_char] = 6;                 // set focus point to right hand

                antiCheatCheck();
                // base attack activation
                if (Item_Inv[Stickmen_Slots+current_char]==258){                                                                                            // create exception for 3-round burst, because 1 attack = 3 bullets to pay for
                    gun_bullet = getVal(Item_Inv[Stickmen_Slots+current_char],Item_Bullet);
                    if (checkEff(Stickmen_Slots+current_char,Card_Bullet))
                        gun_bullet += getEff(Stickmen_Slots+current_char,Eff1)+floor(gun_bullet*getEff(Stickmen_Slots+current_char,Eff2)/100);
                }
                if (gun_cost>0){                                                                                                                            // create exception for starter gun
                    gun_cost = maxOf(gun_cost-MAG[current_char],1);                                                                                         // set shooting cost after reduction from MAG (minimum of 1)
                    if (gun_cost*gun_bullet <= Team_Gold){                                                                                                  // if you have enough gold to pay for each bullet
                        Team_Gold = clamp(Team_Gold-gun_cost*gun_bullet,0,9999999);                                                                         // pay for each bullet
                        for (var b=0; b<gun_bullet; b++)
                            Indicators.INadd(this.PL_joint[current_char][6].x,this.PL_joint[current_char][6].y,point_gun.x<0? 0.5 :-0.5,gun_cost,0xFFFF00); // output gold payments
                        gun_cost = 0;                                                                                                                       // after paying for bullets, set cost to 0
                    }
                }
                if (gun_cost==0){
                    if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                            // gunner Heal's Card
                        gnr_heals_eff = getEff(Stickmen_Slots+current_char,Eff1);
                        LP_Current[current_char] = clamp(LP_Current[current_char]+gnr_heals_eff,0,LP_Max[current_char]);              // increase LP
                        Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,gnr_heals_eff,0x00FF00); // output LP increase
                    }
                    if (this.PL_focus[current_char]!=-1){                                                                                   // when gold for shot has been paid
                        this.PLprojectileAttack(current_char,this.PL_joint[current_char][6].x,this.PL_joint[current_char][6].y,gnr_target); // perform projectile attack
                        this.PL_focus[current_char] = -1;                                                                                   // unset focus point
                    }
                }
                antiCheatSet();
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && gnr_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
            Swim(this,current_char);
        }
    }
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6,0.5,0.5); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6,0.5,0.5); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,4.8,0.5,0.5); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,4.8,0.5,0.5); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8,0.5,0.5); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8,0.5,0.5); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][5],this.PL_joint[current_char][6] ,1.2,0.5,0.5); // right hand to left hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,4.8,0.5,0.5); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,4.8,0.5,0.5); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8,0.5,0.5); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8,0.5,0.5); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1,0.1); // left knee to right knee
};
