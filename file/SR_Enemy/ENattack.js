// enemy attack code
SR_Enemy.prototype.ENattack = function(monster,attack){ // original name: aa.p
    var vector_c = new Vector2D;                            // vector                            original name: c
    var mon_ID = this.EN_array_ID[monster]+attack;          // array ID of the current attack    original name: d
    var monster_info = EN_Info[mon_ID];                     // array of the current attack       original name: e
    var mon_att_mode = monster_info[7]%100;                 // attack mode                       original name: g
    var mon_att_mode_modifier = floor(monster_info[7]/100); // attack mode modifier              original name: k
    var mon_pj_orient = monster_info[8];                    // projectile orientation            original name: r
    var mon_pj_img = monster_info[9];                       // projectile image                  original name: m
    var mon_pj_color = monster_info[10];                    // projectile color                  original name: n
    var mon_pj_transp = monster_info[11];                   // projectile transparency           original name: F
    var mon_pj_width = monster_info[12];                    // projectile width                  original name: H
    var mon_pj_height = monster_info[13];                   // projectile height                 original name: M
    var mon_pj_hbox_width = monster_info[14];               // projectile hitbox width           original name: E
    var mon_pj_hbox_height = monster_info[15];              // projectile hitbox height          original name: ka
    var mon_pj_APdelay = monster_info[16];                  // projectile appearence delay       original name: Ja
    var mon_pj_EFdelay = monster_info[17];                  // delay before projectile is active original name: Ea
    var mon_pj_life = monster_info[18];                     // projectile lifespan               original name: Ca
    var mon_pj_disap_eff = monster_info[19];                // time before projectile disappears original name: Z
    var mon_pj_grav = monster_info[20];                     // projectile gravity                original name: X
    var mon_pj_accel = monster_info[21];                    // projectile acceleration           original name: $
    var mon_pj_pierce = monster_info[22];                   // projectile pierce                 original name: ob
    var mon_pj_bounce = monster_info[23];                   // projectile reflection             original name: pb
    var mon_pj_home = monster_info[24];                     // projectile homing range           original name: Xa
    var mon_pj_splash = monster_info[25];                   // projectile splash                 original name: ta
    var mon_AT_min = monster_info[26];                      // projectile min AT                 original name: ya
    var mon_AT_max = monster_info[27];                      // projectile max AT                 original name: rb
    var mon_pj_count = monster_info[28];                    // projectile count                  original name: ia
    var mon_pj_speed = monster_info[29];                    // projectile speed                  original name: ja
    var mon_min_agi = monster_info[30];                     // minimum attack speed              original name: za
    var mon_agi_cons = monster_info[31];                    // attack speed consistancy          original name: rr
    var mon_range = monster_info[32];                       // range                             original name: gg
    var mon_ele_type = monster_info[33];                    // damage type                       original name: bb
    var mon_ele_type_param = monster_info[34];              // type parameter                    original name: Ya
    var mon_res_mode = monster_info[41];                    // residue mode                      original name: Bb
    var mon_bonus_type_param = monster_info[42];            // residue type parameter            original name: Cb
    var mon_res_img = monster_info[43];                     // residue image                     original name: Sa
    var mon_res_color = monster_info[44];                   // residue color                     original name: Oa
    var mon_res_transp = monster_info[45];                  // residue transparency              original name: Ob
    var mon_res_width = monster_info[46];                   // residue width                     original name: Pb
    var mon_res_height = monster_info[47];                  // residue height                    original name: Qb
    var mon_res_hbox_width = monster_info[48];              // residue hitbox width              original name: Rb
    var mon_res_hbox_height = monster_info[49];             // residue hitbox height             original name: Sb
    var mon_res_life = monster_info[50];                    // residue lifespan                  original name: Tb
    var mon_res_fade_time = monster_info[51];               // time before residue disappears    original name: qb
    var mon_res_grav = monster_info[52];                    // residue gravity                   original name: Ub
    var mon_res_accel = monster_info[53];                   // residue acceleration              original name: Vb
    var mon_res_pierce = monster_info[54];                  // residue pierce                    original name: Wb
    var mon_res_bounce = monster_info[55];                  // residue reflection                original name: Xb
    var mon_res_splash = monster_info[56];                  // residue splash                    original name: Yb
    var mon_res_ATmin = monster_info[57];                   // residue min AT                    original name: Zb
    var mon_res_ATmax = monster_info[58];                   // residue max AT                    original name: ba
    var mon_res_bullet = monster_info[59];                  // residue count                     original name: e

    var mon_target,x_pos,y_pos,x_spd,y_spd,spread,rand_var1,rand_var2;

    if (this.EN_reload[monster]>0){
        this.EN_reload[monster]--;
    } else if (mon_agi_cons>=random(1000)){
        mon_target = Players.PLfindPlayer(this.EN_joint[monster][0].x-mon_range,this.EN_joint[monster][0].y-mon_range,this.EN_joint[monster][0].x+mon_range,this.EN_joint[monster][0].y+mon_range,0);
        if (mon_target!=-1){
            this.EN_reload[monster] = mon_min_agi;
            switch (mon_att_mode){
                case 0:
                    break;
                case 1: // no movement
                    x_pos = this.EN_joint[monster][0].x+10*vector_c.x;
                    y_pos = this.EN_joint[monster][0].y+10*vector_c.y;
                    x_spd = 0;
                    y_spd = 0;
                    Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param);
                    break;
                case 2: // horizontal movement
                    vector_c = Players.PL_joint[mon_target][2].x-this.EN_joint[monster][0].x;
                    vector_c /= absVal(vector_c);
                    x_pos = this.EN_joint[monster][0].x+10*vector_c;
                    y_pos = this.EN_joint[monster][0].y;
                    x_spd = vector_c*mon_pj_speed*0.1;
                    y_spd = 0;
                    Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param);
                    break;
                case 3: // aimed straight line
                    assignVector2D(vector_c,Players.PL_joint[mon_target][2].x-this.EN_joint[monster][0].x,Players.PL_joint[mon_target][2].y-this.EN_joint[monster][0].y);
                case 6: // around enemy
                    if (mon_att_mode==6)
                        assignVector2D(vector_c,0,-1);

                    if (mon_att_mode_modifier>0)
                         spread = mon_att_mode_modifier;
                    else spread = 16;

                    mon_att_mode_modifier = floor(512*angleToXAxis(vector_c)/TwoPi);
                    mon_att_mode_modifier -= (mon_pj_count-1)*spread>>1;

                    for (var p=0; p<mon_pj_count; p++){
                        vector_c.x = Xe_arr[mon_att_mode_modifier&511][0];
                        vector_c.y =- Xe_arr[mon_att_mode_modifier&511][1];
                        x_pos = this.EN_joint[monster][0].x+10*vector_c.x;
                        y_pos = this.EN_joint[monster][0].y+10*vector_c.y;
                        x_spd = vector_c.x*mon_pj_speed*0.1;
                        y_spd = vector_c.y*mon_pj_speed*0.1;
                        Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param);
                        mon_att_mode_modifier += spread;
                    }
                    break;
                case 4: // arc. -0x4- modifies spread
                    for (var p=0; p<mon_pj_count; p++){
                        assignVector2D(vector_c,Players.PL_joint[mon_target][2].x-this.EN_joint[monster][0].x,Players.PL_joint[mon_target][2].y-this.EN_joint[monster][0].y);
                        if (mon_att_mode_modifier>0)
                             spread = mon_att_mode_modifier;
                        else spread = mon_pj_count;

                        if (mon_pj_count>0){
                            rand_var1 = floor(random(512));
                            rand_var2 = random(10)*spread;
                            vector_c.x += Xe_arr[rand_var1][0]*rand_var2;
                            vector_c.y += Xe_arr[rand_var1][1]*rand_var2;
                        }
                        x_pos = this.EN_joint[monster][0].x;
                        y_pos = this.EN_joint[monster][0].y;
                        x_spd = vector_c.x/mon_pj_speed;
                        y_spd = (vector_c.y-0.5*mon_pj_speed*mon_pj_speed*mon_pj_grav*0.01)/mon_pj_speed;
                        Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param);
                    }
                    break;
                case 5: // spawn around range (like blizzard)
                    for (var p=0; p<mon_pj_count; p++){
                        x_pos = this.EN_joint[monster][0].x+randomRange(-mon_range,mon_range);
                        y_pos = this.EN_joint[monster][0].y+randomRange(-mon_range,0);
                        x_spd = 0;
                        y_spd = 0;
                        Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param);
                    }
                    break;
                case 7: // spawn another enemy
                    for (var p=0; p<mon_pj_count; p++){
                        x_pos = this.EN_joint[monster][0].x>>3;
                        y_pos = this.EN_joint[monster][0].y>>3;
                        this.ENadd(x_pos,y_pos,mon_ID+mon_AT_min);
                    }
                    break;
                case 8: // spawn on stickman: random
                    for (var p=0; p<mon_pj_count; p++){
                        y_pos = randInt(4);
                        x_pos = Players.PL_joint[y_pos][2].x;
                        y_pos = Players.PL_joint[y_pos][2].y;
                        x_spd = 0;
                        y_spd = 0;
                        Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param);
                    }
                    break;
                case 9: // ring formation
                    for (var p=0; p<mon_pj_count; p++){
                        y_pos = randInt(4);
                        assignVector2D(vector_c,Players.PL_joint[y_pos][0].x-this.EN_joint[monster][0].x,Players.PL_joint[y_pos][0].y-this.EN_joint[monster][0].y);
                        normalize(vector_c);
                        x_pos = this.EN_joint[monster][0].x+10*vector_c.x;
                        y_pos = this.EN_joint[monster][0].y+10*vector_c.y;
                        x_spd = vector_c.x*mon_pj_speed*0.1;
                        y_spd = vector_c.y*mon_pj_speed*0.1;
                        Projectiles.PJadd(-1,x_pos,y_pos,x_spd,y_spd,mon_pj_orient,mon_pj_img,mon_pj_color,mon_pj_transp,mon_pj_width,mon_pj_height,mon_pj_hbox_width,mon_pj_hbox_height,mon_pj_APdelay,mon_pj_EFdelay,mon_pj_life,mon_pj_disap_eff,mon_pj_grav,mon_pj_accel,mon_pj_pierce,mon_pj_bounce,mon_pj_home,0,0,mon_pj_splash,mon_AT_min,mon_AT_max,mon_ele_type,mon_ele_type_param,mon_res_mode,mon_bonus_type_param,mon_res_img,mon_res_color,mon_res_transp,mon_res_width,mon_res_height,mon_res_hbox_width,mon_res_hbox_height,0,0,mon_res_life,mon_res_fade_time,mon_res_grav,mon_res_accel,mon_res_pierce,mon_res_bounce,mon_res_splash,mon_res_ATmin,mon_res_ATmax,mon_res_bullet,mon_ele_type,mon_ele_type_param)
                    }
                    break;
            }
        }
    }
};
