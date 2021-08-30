// attack function for SR_Player original name: Pg.prototype.p
SR_Player.prototype.PLprojectileAttack = function(source,AT_focus_Xpos,AT_focus_Ypos,target){
    var AT_weap_class_ID,bow_MP,AT_attacker,horizontal_spd,vertical_spd,AT_Xpos,AT_Ypos,proj_angle,spread,pl_at_lf;
    var proj_direction = new Vector2D;
    var AT_item = source;
    if (source < Stickmen_Slots<<1)
        AT_item = Item_Inv[Stickmen_Slots+source];  // if source is a stickman, get the stickman's weapon

    var AT_at_mode1 = getVal(AT_item,(Stickmen_Slots<<1))%100;       // attack mode                                                          original name: k
    var proj_angle = floor(getVal(AT_item,(Stickmen_Slots<<1))/100); // attack mode detail                                                   original name: r
    var AT_pj_orient = getVal(AT_item,17);                           // projectile orientation                                               original name: m
    var AT_pj_img = getVal(AT_item,18);                              // projectile Image                                                     original name: n
    var AT_pj_color = getVal(AT_item,Proj_Color);                    // projectile Color                                                     original name: F
    var AT_pj_transp = getVal(AT_item,20);                           // projectile transparency (2 = apply trasparency,1 = do not apply)     original name: H
    var AT_pj_width = getVal(AT_item,21);                            // projectile size x-direction                                          original name: M
    var AT_pj_height = getVal(AT_item,22);                           // projectile size y-direction                                          original name: E
    var AT_pj_box_width = getVal(AT_item,23);                        // projectile hitbox size x-direction                                   original name: ka
    var AT_pj_box_height = getVal(AT_item,24);                       // projectile hitbox size y-direction                                   original name: Ja
    var AT_pj_APdelay = getVal(AT_item,25);                          // appearence delay for multiple projectiles (time for all to appear)   original name: Ea
    var AT_pj_EFdelay = getVal(AT_item,26);                          // delay before projectile is effective                                 original name: Ca
    var AT_pj_life = getVal(AT_item,27);                             // projectile lifespan                                                  original name: Z
    var AT_pj_disap_eff = getVal(AT_item,28);                        // projectile disappearing effect time                                  original name: X
    var AT_pj_grav = getVal(AT_item,29);                             // projetile gravity (0 = ignore gravity,>0 = falling,<0 = rising)      original name: $
    var AT_pj_accel = getVal(AT_item,30);                            // projectile acceleration                                              original name: ob
    var AT_pj_pierce = getVal(AT_item,31);                           // projectile terrain piercing switch (1 = yes,0 = no)                  original name: pb
    var AT_pj_bounce = getVal(AT_item,32);                           // projectile terrain interaction (0 = disappear,1 = slide,2 = reflect) original name: Xa
    var AT_pj_home = getVal(AT_item,33);                             // homing range                                                         original name: ta
    var AT_is_crit = 0;                                              // is a critical hit or not                                              (new variable)
    var AT_knockback = 0;                                            // knockback                                                            original name: ya
    var AT_pj_splash = getVal(AT_item,Item_Splash);                  // projectile splash                                                    original name: rb
    if (source < Stickmen_Slots<<1)
         var AT_AT_min = AT_Min[source];
    else var AT_AT_min = getVal(AT_item,Item_AT_Min);                // minimum AT                                                           original name: ia
    if (source < Stickmen_Slots<<1)
         var AT_AT_max = AT_Max[source];
    else var AT_AT_max = getVal(AT_item,Item_AT_Max);                // maximum AT                                                           original name: ja
    var AT_weap_bullet = getVal(AT_item,Item_Bullet);                // Weapon number of bullets                                             original name: za
    var AT_pj_speed = getVal(AT_item,13);                            // projectile speed                                                     original name: rr
    var AT_bonus_type = getVal(AT_item,Item_Type);                   // weapon element type                                                  original name: gg
    var AT_bonus_type_param = getVal(AT_item,Item_Type_Para);        // element type parameters                                              original name: bb
    var AT_res_mode = getVal(AT_item,Item_Res_Mode);                 // weapon residue mode                                                  original name: Ya
    var AT_res_orient = getVal(AT_item,42);                          // residue orientation                                                  original name: Bb
    var AT_res_img = getVal(AT_item,43);                             // residue image                                                        original name: Cb
    var AT_res_color = getVal(AT_item,Res_Color);                    // residue color                                                        original name: Sa
    var AT_res_transp = getVal(AT_item,45);                          // residue transparency                                                 original name: Oa
    var AT_res_width = getVal(AT_item,46);                           // residue size x-direction                                             original name: Ob
    var AT_res_height = getVal(AT_item,47);                          // residue size y-direction                                             original name: Pb
    var AT_res_box_width = getVal(AT_item,48);                       // residue hitbox size x-direction                                      original name: Qb
    var AT_res_box_height = getVal(AT_item,49);                      // residue hitbox size y-direction                                      original name: Rb
    var AT_res_APdelay = getVal(AT_item,50);                         // appearence delay for multiple residues                               original name: Sb
    var AT_res_EFdelay = getVal(AT_item,51);                         // delay before residue is effective                                    original name: Tb
    var AT_res_life = getVal(AT_item,52);                            // residue lifespan                                                     original name: qb
    var AT_res_fade_time = getVal(AT_item,53);                       // residue disappearing effect time                                     original name: Ub
    var AT_res_grav = getVal(AT_item,54);                            // residue gravity                                                      original name: Vb
    var AT_res_accel = getVal(AT_item,55);                           // residue acceleration                                                 original name: Wb
    var AT_res_pierce = getVal(AT_item,56);                          // residue terrain piercing switch                                      original name: Xb
    var AT_res_bounce = getVal(AT_item,57);                          // residue terrain interaction                                          original name: Yb
    var AT_res_splash = getVal(AT_item,38);                          // residue splash switch                                                original name: Zb
    var AT_BATmin = getVal(AT_item,Item_BAT_Min);                    // bonus AT minimum                                                     original name: ba
    var AT_BATmax = getVal(AT_item,Item_BAT_Max);                    // bonus AT maximum                                                     original name: U
    var AT_res_bullet = getVal(AT_item,41);                          // residue number of bullets                                            original name: sc
    var base_AT_bonus_type = AT_bonus_type;                          // base weapon element type                                             original name: gd
    var base_AT_bonus_type_param = AT_bonus_type_param;              // base element type parameters                                         original name: Ta

    if (source < Stickmen_Slots<<1){ // damage compos on projectiles
        AT_weap_class_ID = getVal(Item_Inv[Stickmen_Slots+source],Item_Class_ID);
        switch (AT_weap_class_ID){
            case 1: // Boxer
            case 2: // Gladiator
            case 7: // Whipper
                AT_AT_min = getVal(Item_Inv[Stickmen_Slots+source],Item_BAT_Min); // melee classes have no initial projectile, so they use the initial projectile slots to be their bonus attack projectile
                AT_AT_max = getVal(Item_Inv[Stickmen_Slots+source],Item_BAT_Max);
                if (checkEff(Stickmen_Slots+source,Jewel_Ruby)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Garnet))
                    AT_pj_life += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Sapphire)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Aquamarine))
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Topaz)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Emerald)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Peridot))
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Diamond))
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                AT_AT_min += floor(AT_AT_min*STR_Aura[source]/100);
                AT_AT_max += floor(AT_AT_max*STR_Aura[source]/100);
                if (AT_weap_class_ID==7)
                    AT_weap_bullet += floor(DEX[source]/5);
                break;

            case 3: // Sniper
                if (AT_item!=402)
                    AT_bonus_type_param = AT_bonus_type = 0; // exception for Indra arrow
                antiCheatCheck();
                bow_MP = getVal(Item_Inv[Stickmen_Slots+source],Weap_MP_Price); // bonus attack activation
                if (MP_Bar[source]+MAG[source] < bow_MP)         // if this hit doesn't fill MP bar
                    MP_Bar[source] = MP_Bar[source]+MAG[source]; // add MAG to the magic bar
                else
                    MP_Bar[source] = bow_MP;            // otherwise set the magic bar to full (maxOf capacity of magic bar is the weapon's MP)

                if (MP_Bar[source]==bow_MP && bow_MP>0) // if magic bar is full and weapon has source bonus attack
                    MP_Bar[source] = 0;
                else
                    AT_res_mode = 0;

                antiCheatSet();
                if (checkEff(Stickmen_Slots+source,Jewel_Ruby)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Garnet))
                    AT_res_life += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Sapphire)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Aquamarine))
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Topaz)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Emerald)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Peridot))
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Diamond))
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                AT_BATmin += floor(AT_BATmin*STR_Aura[source]/100);
                AT_BATmax += floor(AT_BATmax*STR_Aura[source]/100);
                if (checkEff(Stickmen_Slots+source,Card_Pierce) && getEff(Stickmen_Slots+source,Eff1)>random(100))
                    AT_pj_pierce = 1;

                if (checkEff(Stickmen_Slots+source,Card_Guides))
                    AT_pj_home += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Card_Explsn) && getEff(Stickmen_Slots+source,Eff1)>random(100))
                    AT_pj_splash = 1;

                if (checkEff(Stickmen_Slots+source,Card_Critcl) && getEff(Stickmen_Slots+source,Eff1)>random(100)){
                    AT_AT_min += floor(getEff(Stickmen_Slots+source,Eff2)*AT_AT_min/100);
                    AT_AT_max += floor(getEff(Stickmen_Slots+source,Eff2)*AT_AT_max/100);
                    AT_is_crit = 1;
                } break;

            case 4: // Magician
            case 5: // Priest
                if (checkEff(Stickmen_Slots+source,Jewel_Ruby)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Garnet)){
                    AT_pj_life += getEff(Stickmen_Slots+source,Eff1);
                    AT_res_life += getEff(Stickmen_Slots+source,Eff1);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Sapphire)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Aquamarine)){
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Topaz)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Emerald)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Peridot)){
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Diamond)){
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                }
                AT_BATmin += floor(AT_BATmin*STR_Aura[source]/100);
                AT_BATmax += floor(AT_BATmax*STR_Aura[source]/100);
                if (checkEff(Stickmen_Slots+source,Card_Pierce) && getEff(Stickmen_Slots+source,Eff1)>random(100)){
                    AT_pj_pierce = 1;
                }
                if (checkEff(Stickmen_Slots+source,Card_Guides))
                    AT_pj_home += getEff(Stickmen_Slots+source,Eff1);
                break;
            case 6: // Gunner
                if (AT_res_mode!=0)
                    AT_bonus_type_param = AT_bonus_type = 0;

                if (checkEff(Stickmen_Slots+source,Jewel_Ruby)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Garnet))
                    AT_res_life += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Sapphire)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Aquamarine))
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Topaz)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Emerald)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Peridot))
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Jewel_Diamond))
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);

                AT_BATmin += floor(AT_BATmin*STR_Aura[source]/100);
                AT_BATmax += floor(AT_BATmax*STR_Aura[source]/100);
                if (checkEff(Stickmen_Slots+source,Card_Pierce) && getEff(Stickmen_Slots+source,Eff1)>random(100))
                    AT_pj_pierce = 1;

                if (checkEff(Stickmen_Slots+source,Card_Guides))
                    AT_pj_home += getEff(Stickmen_Slots+source,Eff1);

                if (checkEff(Stickmen_Slots+source,Card_Explsn) && getEff(Stickmen_Slots+source,Eff1)>random(100))
                    AT_pj_splash = 1;

                if (checkEff(Stickmen_Slots+source,Card_Critcl) && getEff(Stickmen_Slots+source,Eff1)>random(100)){
                    AT_AT_min += floor(getEff(Stickmen_Slots+source,Eff2)*AT_AT_min/100);
                    AT_AT_max += floor(getEff(Stickmen_Slots+source,Eff2)*AT_AT_max/100);
                    AT_is_crit = 1;
                } break;
            case 8: // Angel
                AT_AT_min = getVal(Item_Inv[Stickmen_Slots+source],Item_BAT_Min);
                AT_AT_max = getVal(Item_Inv[Stickmen_Slots+source],Item_BAT_Max);
                if (checkEff(Stickmen_Slots+source,Jewel_Ruby)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Ruby)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Garnet)){
                    AT_pj_life += getEff(Stickmen_Slots+source,Eff1);
                    AT_res_life += getEff(Stickmen_Slots+source,Eff1);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Sapphire)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Sapphire)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Aquamarine)){
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Topaz)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Topaz)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Emerald)){
                    AT_AT_min += getEff(Stickmen_Slots+source,Eff1);
                    AT_AT_max += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Emerald)){
                    AT_BATmin += getEff(Stickmen_Slots+source,Eff1);
                    AT_BATmax += getEff(Stickmen_Slots+source,Eff2);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Peridot)){
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                }
                if (checkEff(Stickmen_Slots+source,Jewel_Diamond)){
                    AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                    base_AT_bonus_type_param += getEff(Stickmen_Slots+source,Eff1);
                }
                AT_AT_min += floor(AT_AT_min*STR_Aura[source]/100);
                AT_AT_max += floor(AT_AT_max*STR_Aura[source]/100);
                AT_BATmin += floor(AT_BATmin*STR_Aura[source]/100);
                AT_BATmax += floor(AT_BATmax*STR_Aura[source]/100);
                break;
        }
        if (checkEff(Stickmen_Slots+source,Card_Bullet))
            AT_weap_bullet += getEff(Stickmen_Slots+source,Eff1)+floor(AT_weap_bullet*getEff(Stickmen_Slots+source,Eff2)/100);

        if (AT_weap_class_ID==3 || AT_weap_class_ID==4 || AT_weap_class_ID==6){ // ranged knockback
            if (checkEff(Stickmen_Slots+source,Card_Knockb) && getEff(Stickmen_Slots+source,Eff1)>random(100))
                AT_knockback = getEff(Stickmen_Slots+source,Eff2);
        }
        if (checkEff(Stickmen_Slots+source,Card_Reflct) && getEff(Stickmen_Slots+source,Eff1)>random(100))
            AT_pj_bounce = 2;
        /*add*#/
        AT_pj_bounce = 2;
        AT_weap_bullet = AT_weap_bullet*100;
        //*/
    }

    AT_attacker = source;

    if (Game_Mode!=1){
        if (AT_at_mode1==6){
            AT_EN_Xpos = Enemies.EN_joint[target][0].x;
            AT_EN_Ypos = Enemies.EN_joint[target][0].y;
        } else {
            AT_EN_Xpos = Enemies.EN_joint[target][Enemies.EN_center].x;
            AT_EN_Ypos = Enemies.EN_joint[target][Enemies.EN_center].y;
        }
    } else {
        AT_attacker = 1-(target>>2);
        AT_EN_Xpos = this.PL_joint[target][2].x;
        AT_EN_Ypos = this.PL_joint[target][2].y;
    }

    switch (AT_at_mode1){ // player attack mode
        case 0: break;                                      // 0  none/melee mode (e.g. Mach Punch)
        case 1:                                             // 1  no movement (but can drop with gravitiy on)
            AT_Xpos = AT_focus_Xpos+10*proj_direction.x;
            AT_Ypos = AT_focus_Ypos+10*proj_direction.y;
            Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,0,0,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            break;
        case 2:                                             // 2  horizontal
            proj_direction = (AT_EN_Xpos-AT_focus_Xpos)/absVal(AT_EN_Xpos-AT_focus_Xpos);
            AT_Xpos = AT_focus_Xpos+10*proj_direction;
            AT_Ypos = AT_focus_Ypos;
            horizontal_spd = proj_direction*AT_pj_speed*0.1;
            for (var p=0; p<AT_weap_bullet; p++){
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,horizontal_spd,0,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;
        case 3:                                             // 3  aimed straight line (X03 adjusts spread, X closer to 1 -> smaller spread. BUT 102403 = zero spread. X=16 if not specified)
            assignVector2D(proj_direction,AT_EN_Xpos-AT_focus_Xpos,AT_EN_Ypos-AT_focus_Ypos);
            if (proj_angle>0)
                 spread = proj_angle;
            else spread = 16;
            proj_angle = floor(512*angleToXAxis(proj_direction)/TwoPi)-((AT_weap_bullet-1)*spread>>1);
            for (var p=0; p<AT_weap_bullet; p++){
                proj_direction.x = Xe_arr[proj_angle&511][0];
                proj_direction.y = -Xe_arr[proj_angle&511][1];
                AT_Xpos = AT_focus_Xpos+10*proj_direction.x;
                AT_Ypos = AT_focus_Ypos+10*proj_direction.y;
                horizontal_spd = proj_direction.x*AT_pj_speed*0.1;
                vertical_spd = proj_direction.y*AT_pj_speed*0.1;
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,horizontal_spd,vertical_spd,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
                proj_angle += spread;
            }
            break;
        case 4:                                             // 4  arc (X04 adjusts spread, X=1 -> zero spread. X=(4+Bullet count) if not specified. Speed is "frames taken to reach target position"? and must !=0)
            for (var p=0; p<AT_weap_bullet; p++){
                assignVector2D(proj_direction,AT_EN_Xpos-AT_focus_Xpos,AT_EN_Ypos-AT_focus_Ypos);
                if (proj_angle>0)
                     spread = proj_angle
                else spread = AT_weap_bullet+4;
                if (AT_weap_bullet>1){
                    horizontal_spd = floor(random(512));
                    pl_at_lf = random(4)*spread;
                    proj_direction.x += Xe_arr[horizontal_spd][0]*pl_at_lf;
                    proj_direction.y += Xe_arr[horizontal_spd][1]*pl_at_lf;
                }
                AT_Xpos = AT_focus_Xpos;
                AT_Ypos = AT_focus_Ypos;
                horizontal_spd = proj_direction.x/AT_pj_speed;
                vertical_spd = (proj_direction.y-0.5*AT_pj_speed*AT_pj_speed*AT_pj_grav*0.01)/AT_pj_speed;
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,horizontal_spd,vertical_spd,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;
        case 5:                                             // 5  aimed from distance (e.g. Ice Bolt)
            for (var p=0; p<AT_weap_bullet; p++){
                if (proj_angle==0){
                    AT_Xpos = AT_focus_Xpos+randomRange(-40,40);
                    AT_Ypos = AT_focus_Ypos+randomRange(-60,0);
                } else {
                    AT_Xpos = AT_focus_Xpos+randomRange(-10*(proj_angle-1),10*(proj_angle-1));
                }
                AT_Ypos = AT_focus_Ypos+randomRange(-60,-50);
                assignVector2D(proj_direction,AT_EN_Xpos-AT_Xpos,AT_EN_Ypos-AT_Ypos);
                normalize(proj_direction);
                scaleVector2D(proj_direction,AT_pj_speed);
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,proj_direction.x,proj_direction.y,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;

        case 6:                                             // 6  around enemy (speed 0 = on enemy, higher speed => greater projectile spread, projectile orientation must =0)
            for (var p=0; p<AT_weap_bullet; p++){
                AT_Xpos = AT_EN_Xpos+randomRange(-AT_pj_speed,AT_pj_speed);
                AT_Ypos = AT_EN_Ypos+randomRange(-AT_pj_speed,AT_pj_speed);
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,0,0,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;

        case 7:                                             // 7  lightsaber like (outward) (Sword/Dual Sword/Hammer only?)
        case 10:                                            // 8  spawn around range (X08: horizontal range = 20(X-1) centered at target x-position, 108 = Thunder Spear like. X=5 if not specified)
            proj_direction.x = AT_focus_Xpos-this.PL_joint[source][5].x;
            proj_direction.y = AT_focus_Ypos-this.PL_joint[source][5].y;
            if (AT_Xpos==10 && proj_direction.y>0)
                proj_direction.y = -proj_direction.y;
            AT_Xpos = this.PL_joint[source][5].x+0.5*proj_direction.x;
            AT_Ypos = this.PL_joint[source][5].y+0.5*proj_direction.y;
            normalize(proj_direction);
            scaleVector2D(proj_direction,0.1*AT_pj_speed);
            for (var p=0; p<AT_weap_bullet; p++){
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,proj_direction.x,proj_direction.y,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;

        case 12:                                            // 12 unused, looks like 2?
            proj_direction = AT_focus_Xpos-this.PL_joint[AT_Ypos][0].x/absVal(proj_direction);
            AT_Xpos = this.PL_joint[AT_Ypos][0].x;
            AT_Ypos = this.PL_joint[AT_Ypos][0].y;
            horizontal_spd = proj_direction*AT_pj_speed*0.1;
            for (var p=0; p<AT_weap_bullet; p++){
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,horizontal_spd,0,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;

        case 8:                                             // 8  spawn around range (X08: horizontal range = 20(X-1) centered at target x-position, 108 = Thunder Spear like. X=5 if not specified)
            for (var p=0; p<AT_weap_bullet; p++){
                if (proj_angle==0)
                     AT_Xpos = AT_EN_Xpos+randomRange(-40,40);
                else AT_Xpos = AT_EN_Xpos+randomRange(-10*(proj_angle-1),10*(proj_angle-1));
                AT_Ypos = AT_EN_Ypos+randomRange(-30,-60);
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,0,0,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;

        case 9:                                             // 9  ring formation (9 = on enemy, 109 = on attacker, 1 projectile = random direction projectile)
            if (proj_angle==0){
                AT_Xpos = AT_EN_Xpos;
                AT_Ypos = AT_EN_Ypos;
            } else {
                AT_Xpos = AT_focus_Xpos;
                AT_Ypos = AT_focus_Ypos;
            }
            AT_focus_Xpos = floor(512/AT_weap_bullet);
            horizontal_spd = floor(random(AT_focus_Xpos));
            for (var p=0; p<AT_weap_bullet; p++){
                proj_direction.x = Xe_arr[horizontal_spd][0]*AT_pj_speed;
                proj_direction.y = Xe_arr[horizontal_spd][1]*AT_pj_speed;
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,proj_direction.x,proj_direction.y,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
                horizontal_spd += AT_focus_Xpos;
            }
            break;

        case 11:                                            // 11 thunder ring like (X11 adjusts spread, X=0 if not specified)
            assignVector2D(proj_direction,AT_EN_Xpos-AT_focus_Xpos,AT_EN_Ypos-AT_focus_Ypos);
            pl_at_lf = normalize(proj_direction);
            if (proj_angle>0)
                 spread = proj_angle;
            else spread = 0;
            for (var p=0; p<AT_weap_bullet; p++){
                horizontal_spd = randomRange(-spread,spread);
                AT_Xpos = AT_focus_Xpos+proj_direction.x*pl_at_lf/2+proj_direction.y*horizontal_spd;
                AT_Ypos = AT_focus_Ypos+proj_direction.y*pl_at_lf/2-proj_direction.x*horizontal_spd;
                horizontal_spd = AT_pj_speed*(p+1)/AT_weap_bullet*proj_direction.x;
                vertical_spd = AT_pj_speed*(p+1)/AT_weap_bullet*proj_direction.y;
                Projectiles.PJadd(AT_attacker,AT_Xpos,AT_Ypos,horizontal_spd,vertical_spd,AT_pj_orient,AT_pj_img,AT_pj_color,AT_pj_transp,AT_pj_width,AT_pj_height,AT_pj_box_width,AT_pj_box_height,AT_pj_APdelay,AT_pj_EFdelay,AT_pj_life,AT_pj_disap_eff,AT_pj_grav,AT_pj_accel,AT_pj_pierce,AT_pj_bounce,AT_pj_home,AT_is_crit,AT_knockback,AT_pj_splash,AT_AT_min,AT_AT_max,AT_bonus_type,AT_bonus_type_param,AT_res_mode,AT_res_orient,AT_res_img,AT_res_color,AT_res_transp,AT_res_width,AT_res_height,AT_res_box_width,AT_res_box_height,AT_res_APdelay,AT_res_EFdelay,AT_res_life,AT_res_fade_time,AT_res_grav,AT_res_accel,AT_res_pierce,AT_res_bounce,AT_res_splash,AT_BATmin,AT_BATmax,AT_res_bullet,base_AT_bonus_type,base_AT_bonus_type_param);
            }
            break;
    }
};
