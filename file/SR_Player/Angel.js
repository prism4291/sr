// angel class      original name: xa
window.fff = SR_Player.prototype.Angel;
SR_Player.prototype.Angel = function(current_char){
    var ang_target,ang_is_controlled,ang_range2,ang_splash,ang_combatant,ring_MP,ang_heal_crd;
    var ring_vector = new Vector2D;
    var ang_ATin = AT_Min[current_char]; // set base stats
    var ang_ATax = AT_Max[current_char];
    var ang_AGI = Agi_Min[current_char]+randInt(Agi_Max[current_char]-Agi_Min[current_char]+1);
    var ang_range = Range[current_char];
    var ang_Xpos = (this.PL_joint[current_char][9].x+this.PL_joint[current_char][10].x)>>1; // set position
    var ang_Ypos = (this.PL_joint[current_char][9].y+this.PL_joint[current_char][10].y)>>1;
    var ang_is_critical = 0;
    var ang_ring;
    if (DEX[current_char]<10) ang_ring = 1;
    else if (DEX[current_char]<30) ang_ring = 2;
    else if (DEX[current_char]<60) ang_ring = 3;
    else if (DEX[current_char]<100) ang_ring = 4;
    else ang_ring = 5;
    ang_ring = 4;
    if (checkEff(Stickmen_Slots+current_char,Card_Rings))
        ang_ring += 1; // angel Ring's Card

    for (var j=11; j<=14; j++)
        moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0.05,0.95); // make wings
    for (var j=15; j<=20; j++)
        moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0,1);       // make 6 rings
    // keep wings afloat?
    this.PL_joint[current_char][11].x -= 0.1; // move right wing shoulder left
    this.PL_joint[current_char][11].y -= 0.1; // move right wing shoulder up
    this.PL_joint[current_char][12].x -= 0.1; // move right wingtip left
    this.PL_joint[current_char][12].y += 0.1; // move right wingtip down
    this.PL_joint[current_char][13].x += 0.1; // move left wing shoulder right
    this.PL_joint[current_char][13].y -= 0.1; // move left wing shoulder up
    this.PL_joint[current_char][14].x += 0.1; // move left wingtip right
    this.PL_joint[current_char][14].y += 0.1; // move left wingtip down

    if (this.PL_is_grounded[current_char]!=0 && this.PL_held_player!=current_char){ // if on the ground and not being held
        if (this.PL_reload_ticks[current_char] > 0) // if ready to attack
            this.PL_reload_ticks[current_char]--;   // decrement reload timer
        if (Game_Mode!=1) // find target
             ang_target = Enemies.ENfindEnemy(ang_Xpos-ang_range,ang_Ypos-ang_range,ang_Xpos+ang_range,ang_Ypos+ang_range);
        else ang_target = Players.PLfindPlayer(ang_Xpos-ang_range,ang_Ypos-ang_range,ang_Xpos+ang_range,ang_Ypos+ang_range,getLeader(current_char,1));

        ang_is_controlled = 0;
        if (current_char==Selected_Player && (Is_Key_Held[97] || Is_Key_Held[100])){
            Walk(this,current_char,1);
            ang_is_controlled = 1;
        }

        if (ang_target!=-1){ // when a target is found
            for (var current_ring=0; current_ring<ang_ring && this.PL_ring_thrown_status[current_char][current_ring]!=0; current_ring++);
            if (this.PL_reload_ticks[current_char]==0 && current_ring!=ang_ring){ // when ready to attack and this is not the last ring
                this.PL_reload_ticks[current_char] = ang_AGI;                     // restart reload timer
                this.PL_ring_thrown_status[current_char][current_ring] = 1;                      // set ring as outgoing
                this.PL_ring_distance_to_travel[current_char][current_ring] = (ang_range>>1)+20; // set destination as 20 pixels past enemy
                this.PL_ring_ticks_until_active[current_char][current_ring] = 0;                 // set ring hitbox as active

                this.PL_joint[current_char][12].x -= 2; // move right wingtip left
                this.PL_joint[current_char][14].x += 2; // move left wingtip right
                this.PL_focus[current_char] = 15+current_ring; // set focus to this ring
                this.PL_joint[current_char][this.PL_focus[current_char]].Vset(this.PL_joint[current_char][0]);
                this.PL_joint[current_char][this.PL_focus[current_char]].y -= 5;
                this.PL_joint_destination[current_char][this.PL_focus[current_char]].Vset(this.PL_joint[current_char][this.PL_focus[current_char]]);

                if (Game_Mode!=1) // send out ring?
                     ring_vector.Vdistance(Enemies.EN_joint[ang_target][Enemies.EN_center],this.PL_joint[current_char][this.PL_focus[current_char]]);
                else ring_vector.Vdistance(this.PL_joint[ang_target][1],this.PL_joint[current_char][this.PL_focus[current_char]]);
                normalize(ring_vector);
                scaleVector2D(ring_vector,2);
                this.PL_joint[current_char][this.PL_focus[current_char]].Vadd(ring_vector);
            }
        } else if ((this.PL_is_grounded[current_char]&3)>0 && ang_is_controlled!=1){ // if a target is not found
            Walk(this,current_char,0);
            Swim(this,current_char);
        }
    }

    for (var r=0; r<ang_ring; r++){
        if (this.PL_ring_thrown_status[current_char][r] != 0){  // if ring is not held
            this.PL_focus[current_char] = 15+r;                 // set focus point
            this.PL_ring_distance_to_travel[current_char][r]--; // move ring towards its target

            if (this.PL_ring_distance_to_travel[current_char][r] <= 0){ // once ring has reached its destination
                if (this.PL_ring_thrown_status[current_char][r]==1){    // if ring was going out
                    this.PL_ring_thrown_status[current_char][r]++;      // make ring return
                    ring_vector.Vset(this.PL_joint[current_char][0]);
                    ring_vector.y -= 5;
                    this.PL_joint_destination[current_char][this.PL_focus[current_char]].Vset(this.PL_joint[current_char][this.PL_focus[current_char]]);
                    ring_vector.Vdistance(ring_vector,this.PL_joint[current_char][this.PL_focus[current_char]]);
                    ang_range2 = normalize(ring_vector);
                    scaleVector2D(ring_vector,2);
                    this.PL_joint[current_char][this.PL_focus[current_char]].Vadd(ring_vector);
                    this.PL_ring_distance_to_travel[current_char][r] = ang_range2>>1;
                } else {                                             // if ring was incoming
                    this.PL_ring_thrown_status[current_char][r] = 0; // set ring as held
                    this.PL_ring_distance_to_travel[current_char][r] = 0;
                    this.PL_ring_ticks_until_active[current_char][r] = 0;
                }
            }
            this.PL_ring_ticks_until_active[current_char][r]--;
            if (this.PL_ring_ticks_until_active[current_char][r] <= 0){ // base attack activation
                ang_splash = false; // angel splash damage
                if (checkEff(Stickmen_Slots+current_char,Card_Explsn) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)) ang_splash = true; // angel Explosion's Card

                if (checkEff(Stickmen_Slots+current_char,Card_Critcl) && random(100)<getEff(Stickmen_Slots+current_char,Eff1)){ // angel Critical's Card
                    ang_ATin += floor(getEff(Stickmen_Slots+current_char,Eff2)*ang_ATin/100);
                    ang_ATax += floor(getEff(Stickmen_Slots+current_char,Eff2)*ang_ATax/100);
                    ang_is_critical = 1;
                }
                ang_ATin += floor(900*ang_ATin/100);
                    ang_ATax += floor(900*ang_ATax/100);
                    ang_is_critical = 1;

                if (Game_Mode!=1) // detect if basic attack hits
                     ang_combatant = Enemies.ENtakeDamage(current_char,ang_splash,0,0,ang_ATin,ang_ATax,ang_is_critical,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,10,10);
                else ang_combatant = Players.PLtakeDamage(current_char,ang_splash,0,0,ang_ATin,ang_ATax,ang_is_critical,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,10,10,getLeader(current_char,1));

                if (ang_combatant!=-1){ // if going to do damage
                    antiCheatCheck();
                    ring_MP = getVal(Item_Inv[Stickmen_Slots+current_char],Weap_MP_Price); // bonus attack activation
                    if (MP_Bar[current_char]+MAG[current_char] < ring_MP)                  // if this hit doesn't fill MP bar
                         MP_Bar[current_char] = MP_Bar[current_char]+MAG[current_char];    // add MAG to the magic bar
                    else MP_Bar[current_char] = ring_MP;                                   // otherwise set the magic bar to full (maxOf capacity of magic bar is the weapon's
                    if (ring_MP==MP_Bar[current_char] && ring_MP>0 || ring_MP==-1){        // if magic bar is full and weapon has a bonus attack, or if bonus attack is free
                        MP_Bar[current_char] = 0;                                          // reset mp bar
                        this.PLprojectileAttack(current_char,this.PL_joint[current_char][this.PL_focus[current_char]].x,this.PL_joint[current_char][this.PL_focus[current_char]].y,ang_combatant);
                    }
                    if (checkEff(Stickmen_Slots+current_char,Card_Heals)){                                                           // angel Heal's Card
                        ang_heal_crd = getEff(Stickmen_Slots+current_char,Eff1);
                        LP_Current[current_char] = clamp(LP_Current[current_char]+ang_heal_crd,0,LP_Max[current_char]);              // increase LP
                        Indicators.INadd(this.PL_joint[current_char][0].x,this.PL_joint[current_char][0].y,0,ang_heal_crd,0x00FF00); // output LP increase
                    }
                    antiCheatSet();
                    this.PL_ring_ticks_until_active[current_char][r] = getVal(Item_Inv[Stickmen_Slots+current_char],Ring_HBox_Rate);
                }
            }
        }
    }
    pullJoints(this.PL_joint[current_char][0] ,this.PL_joint[current_char][1] ,3.6,0.5,0.5); // top of head to neck
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][2] ,3.6,0.5,0.5); // neck to crotch
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][3] ,4.8,0.5,0.5); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][4] ,4.8,0.5,0.5); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3] ,this.PL_joint[current_char][5] ,4.8,0.5,0.5); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4] ,this.PL_joint[current_char][6] ,4.8,0.5,0.5); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][2] ,this.PL_joint[current_char][7] ,4.8,0.5,0.5); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2] ,this.PL_joint[current_char][8] ,4.8,0.5,0.5); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7] ,this.PL_joint[current_char][9] ,4.8,0.5,0.5); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8] ,this.PL_joint[current_char][10],4.8,0.5,0.5); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7] ,this.PL_joint[current_char][8] ,6  ,0.1,0.1); // left knee to right knee

    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][11],3.6,0  ,0.1); // neck to left wing (shoulder)
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][12],12 ,0  ,0.1); // neck to left wing (tip)
    pullJoints(this.PL_joint[current_char][11],this.PL_joint[current_char][12],9.6,0.5,0.5); // left wing (shoulder) to left wing (tip)
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][13],3.6,0  ,0.1); // neck to right wing (shoulder)
    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][14],12 ,0  ,0.1); // neck to right wing (tip)
    pullJoints(this.PL_joint[current_char][13],this.PL_joint[current_char][14],9.6,0.5,0.5); // right wing (shoulder) to right wing (tip)
};
