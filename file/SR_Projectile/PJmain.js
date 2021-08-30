SR_Projectile.prototype.PJmain = function(){ // aa.move
    var b,homing_target,homing_magnitutude,proj_is_destroyed,target,g;
    var trajectory = new Vector2D;

    for (var curr_proj=0; curr_proj<this.PJ_index; curr_proj++){
        if (this.PJ_position[curr_proj].x<-64 || Win_Width+64<this.PJ_position[curr_proj].x){ // if projectile is 64+ pixels offscreen to the left or right
            this.PJsub(curr_proj--);                                                          // destroy projectile
        } else if (this.PJ_appear_delay[curr_proj] > 0){ // if appear delay timer is still going
            this.PJ_appear_delay[curr_proj]--;           // decrement appear delay timer
        } else if (this.PJ_is_transparent[curr_proj]==1){
            this.PJ_lifespan[curr_proj]++;
            if (this.PJ_lifespan[curr_proj] >= this.PJ_disp_eff[curr_proj]) // if projectile has reached its lifespan
                this.PJsub(curr_proj--);                                    // destroy projectile
        } else {
            if (this.PJ_homing[curr_proj] > 0){ // if projectile has homing properties
                if (Game_Mode!=1){
                    if (this.PJ_attacker[curr_proj]>=0)
                         homing_target = Enemies.ENfindEnemy(this.PJ_position[curr_proj].x-this.PJ_homing[curr_proj],this.PJ_position[curr_proj].y-this.PJ_homing[curr_proj],this.PJ_position[curr_proj].x+this.PJ_homing[curr_proj],this.PJ_position[curr_proj].y+this.PJ_homing[curr_proj]);
                    else homing_target = Players.PLfindPlayer(this.PJ_position[curr_proj].x-this.PJ_homing[curr_proj],this.PJ_position[curr_proj].y-this.PJ_homing[curr_proj],this.PJ_position[curr_proj].x+this.PJ_homing[curr_proj],this.PJ_position[curr_proj].y+this.PJ_homing[curr_proj],0);
                } else   homing_target = Players.PLfindPlayer(this.PJ_position[curr_proj].x-this.PJ_homing[curr_proj],this.PJ_position[curr_proj].y-this.PJ_homing[curr_proj],this.PJ_position[curr_proj].x+this.PJ_homing[curr_proj],this.PJ_position[curr_proj].y+this.PJ_homing[curr_proj],1-this.PJ_attacker[curr_proj]<<2);

                if (homing_target!=-1){
                    if (Game_Mode!=1){
                        if (this.PJ_attacker[curr_proj]>=0)
                             trajectory.Vdistance(Enemies.EN_joint[homing_target][0],this.PJ_position[curr_proj]);
                        else trajectory.Vdistance(Players.PL_joint[homing_target][0],this.PJ_position[curr_proj]);
                    } else   trajectory.Vdistance(Players.PL_joint[homing_target][0],this.PJ_position[curr_proj]);

                    normalize(trajectory);
                    homing_magnitutude = magnitudeOf(this.PJ_velocity[curr_proj]);
                    this.PJ_velocity[curr_proj].x = 0.85*this.PJ_velocity[curr_proj].x+0.15*trajectory.x+randomRange(-0.1,0.1);
                    this.PJ_velocity[curr_proj].y = 0.85*this.PJ_velocity[curr_proj].y+0.15*trajectory.y+randomRange(-0.1,0.1);
                    normalize(this.PJ_velocity[curr_proj]);
                    scaleVector2D(this.PJ_velocity[curr_proj],maxOf(homing_magnitutude,1));
                }
            }

            this.PJ_velocity[curr_proj].y += 0.01*this.PJ_gravity[curr_proj];
            scaleVector2D(this.PJ_velocity[curr_proj],0.01*this.PJ_accel[curr_proj]);
            proj_is_destroyed = this.PJifContact(curr_proj,trajectory);

            b = 1;
            if (this.PJ_res_type[curr_proj]==1 && this.PJ_res_type_param[curr_proj]!=0 && random(1000)>this.PJ_res_type_param[curr_proj])
                b = 0;
            if (this.PJ_solid_delay[curr_proj] > 0){
                this.PJ_solid_delay[curr_proj]--;
                b = 0;
            }

            target = -1;
            if (b==1){
                if (Game_Mode!=1){
                    if (this.PJ_attacker[curr_proj]>=0)
                         target = Enemies.ENtakeDamage(this.PJ_attacker[curr_proj],this.PJ_splash[curr_proj],this.PJ_res_type[curr_proj],this.PJ_res_type_param[curr_proj],this.PJ_AT_min[curr_proj],this.PJ_AT_max[curr_proj],this.PJ_is_critical[curr_proj],this.PJ_position[curr_proj].x,this.PJ_position[curr_proj].y,this.PJ_box_width[curr_proj],this.PJ_box_height[curr_proj]);
                    else target = Players.PLtakeDamage(this.PJ_attacker[curr_proj],this.PJ_splash[curr_proj],this.PJ_res_type[curr_proj],this.PJ_res_type_param[curr_proj],this.PJ_AT_min[curr_proj],this.PJ_AT_max[curr_proj],this.PJ_is_critical[curr_proj],this.PJ_position[curr_proj].x,this.PJ_position[curr_proj].y,this.PJ_box_width[curr_proj],this.PJ_box_height[curr_proj],0);
                } else   target = Players.PLtakeDamage(this.PJ_attacker[curr_proj],this.PJ_splash[curr_proj],this.PJ_res_type[curr_proj],this.PJ_res_type_param[curr_proj],this.PJ_AT_min[curr_proj],this.PJ_AT_max[curr_proj],this.PJ_is_critical[curr_proj],this.PJ_position[curr_proj].x,this.PJ_position[curr_proj].y,this.PJ_box_width[curr_proj],this.PJ_box_height[curr_proj],1-this.PJ_attacker[curr_proj]<<2);
            }

            if (target!=-1 && this.PJ_knockback[curr_proj]!=0){
                if (Game_Mode!=1){
                    if (this.PJ_attacker[curr_proj]>=0)
                         trajectory.Vdistance(Enemies.EN_joint[target][0],this.PJ_position[curr_proj]);
                    else trajectory.Vdistance(Players.PL_joint[target][0],this.PJ_position[curr_proj]);
                } else   trajectory.Vdistance(Players.PL_joint[target][0],this.PJ_position[curr_proj]);

                normalize(trajectory);
                scaleVector2D(trajectory,0.1*this.PJ_knockback[curr_proj]);

                if (Game_Mode!=1 && this.PJ_attacker[curr_proj]>=0)
                     scaleVector2D(trajectory,Text_Spacing[EN_Info[Enemies.EN_array_ID[target]][EN_Species]]/EN_Info[Enemies.EN_array_ID[target]][EN_Size]);
                else scaleVector2D(trajectory,0.1);

                if (Game_Mode!=1){
                    if (this.PJ_attacker[curr_proj]>=0)
                         Enemies.EN_joint_destination[target][0].Vsub(trajectory);
                    else Players.PL_joint_destination[target][0].Vsub(trajectory);
                } else   Players.PL_joint_destination[target][0].Vsub(trajectory);

                this.PJ_knockback[curr_proj] = 0;
            }

            if (this.PJ_res_type[curr_proj]==1 && this.PJ_res_type_param[curr_proj]!=0)
                target = -1;

            if (proj_is_destroyed==1 || target!=-1){
                this.PJ_is_transparent[curr_proj] = 1;
                this.PJ_lifespan[curr_proj] = 0;

                // residue modes (1-9 not 2)
                if (this.PJ_res_mode[curr_proj]==1 || this.PJ_res_mode[curr_proj]==3 || this.PJ_res_mode[curr_proj]==4 || this.PJ_res_mode[curr_proj]==5 || this.PJ_res_mode[curr_proj]==6 || this.PJ_res_mode[curr_proj]==7 || this.PJ_res_mode[curr_proj]==8 || this.PJ_res_mode[curr_proj]==9){
                    g = floor(random(512));

                    for (var j=0; j<this.PJ_res_bullet[curr_proj]; j++){
                        switch (this.PJ_res_mode[curr_proj]){
                            case 1: // immobile (Poison Arrow like)
                                assignVector2D(trajectory,0,0);
                                break;
                            case 3: // random spread (Flame Arrow like)
                                g = floor(random(512));
                                k = randomRange(0.05,0.1);
                                trajectory.x = this.PJ_res_bullet[curr_proj]*Xe_arr[g][0]*k;
                                trajectory.y = this.PJ_res_bullet[curr_proj]*Xe_arr[g][1]*k;
                                break;
                            case 4: // spread upwards, wider (Volcano like)
                                trajectory.x = randomRange(0.1*-this.PJ_res_bullet[curr_proj],0.1*this.PJ_res_bullet[curr_proj]);
                                trajectory.y = randomRange(0.2*-this.PJ_res_bullet[curr_proj],0.1*-this.PJ_res_bullet[curr_proj]);
                                break;
                            case 5: // clumped, forward moving (Wave Cannon like)
                                trajectory.x = this.PJ_velocity[curr_proj].x;
                                trajectory.y = this.PJ_velocity[curr_proj].y;
                                break;
                            case 6: // spread upwards, narrower (Super Volcano like)
                                trajectory.x = randomRange(0.01*-this.PJ_res_bullet[curr_proj],0.01*this.PJ_res_bullet[curr_proj]);
                                trajectory.y = randomRange(0.2*-this.PJ_res_bullet[curr_proj],0.05*-this.PJ_res_bullet[curr_proj]);
                                break;
                            case 7: // equally spread (Ice Spike like)
                                k = floor(g+512*j/this.PJ_res_bullet[curr_proj])&511;
                                trajectory.x = this.PJ_res_bullet[curr_proj]*Xe_arr[k][0];
                                trajectory.y = this.PJ_res_bullet[curr_proj]*Xe_arr[k][1];
                                break;
                            case 8: // works like 3 but more even spread in radial direction
                                g = floor(random(512));
                                k = randomRange(0,0.1);
                                trajectory.x = this.PJ_res_bullet[curr_proj]*Xe_arr[g][0]*k;
                                trajectory.y = this.PJ_res_bullet[curr_proj]*Xe_arr[g][1]*k;
                                break;
                            case 9: // works like 5 but fixed speed (imagine something like the original velocity vector being normalized)
                                trajectory.x = this.PJ_velocity[curr_proj].x;
                                trajectory.y = this.PJ_velocity[curr_proj].y;
                                normalize(trajectory);
                                break;
                            /*add*/
                            case 10:
                                tragectory.x = 0.1;
                                tragectory.y = -0.5;
                                break;
                            //*/
                        }
                        Projectiles.PJadd(this.PJ_attacker[curr_proj],this.PJ_position[curr_proj].x,this.PJ_position[curr_proj].y,trajectory.x,trajectory.y,this.PJ_res_orient[curr_proj],this.PJ_res_img[curr_proj],this.PJ_res_color[curr_proj],this.PJ_res_transp[curr_proj],this.PJ_res_width[curr_proj],this.PJ_res_height[curr_proj],this.PJ_res_box_width[curr_proj],this.PJ_res_box_height[curr_proj],this.PJ_res_appear_delay[curr_proj],this.PJ_res_solid_delay[curr_proj],this.PJ_res_lifespan[curr_proj],this.PJ_res_fade_tick[curr_proj],this.PJ_res_grav[curr_proj],this.PJ_res_accel[curr_proj],this.PJ_res_pierce[curr_proj],this.PJ_res_bounce[curr_proj],this.PJ_is_critical[curr_proj],0,0,this.PJ_res_splash[curr_proj],this.PJ_res_AT_min[curr_proj],this.PJ_res_AT_max[curr_proj],this.PJ_res_base_type[curr_proj],this.PJ_res_base_type_param[curr_proj],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
                    }
                }
            }
            if (this.PJ_lifespan[curr_proj] > 0)
                this.PJ_lifespan[curr_proj]--;
            if (this.PJ_lifespan[curr_proj]==0)
                this.PJ_is_transparent[curr_proj] = 1;

            // residue mode 2: constant, residue count => production rate
            if (this.PJ_res_mode[curr_proj]==2 && (random(100)<this.PJ_res_bullet[curr_proj] || proj_is_destroyed==1 || target!=-1)){
                trajectory.x = randomRange(-1,1);
                trajectory.y = randomRange(-1,1);
                Projectiles.PJadd(this.PJ_attacker[curr_proj],this.PJ_position[curr_proj].x,this.PJ_position[curr_proj].y,trajectory.x,trajectory.y,this.PJ_res_orient[curr_proj],this.PJ_res_img[curr_proj],this.PJ_res_color[curr_proj],this.PJ_res_transp[curr_proj],this.PJ_res_width[curr_proj],this.PJ_res_height[curr_proj],this.PJ_res_box_width[curr_proj],this.PJ_res_box_height[curr_proj],this.PJ_res_appear_delay[curr_proj],this.PJ_res_solid_delay[curr_proj],this.PJ_res_lifespan[curr_proj],this.PJ_res_fade_tick[curr_proj],this.PJ_res_grav[curr_proj],this.PJ_res_accel[curr_proj],this.PJ_res_pierce[curr_proj],this.PJ_res_bounce[curr_proj],this.PJ_is_critical[curr_proj],0,0,this.PJ_res_splash[curr_proj],this.PJ_res_AT_min[curr_proj],this.PJ_res_AT_max[curr_proj],this.PJ_res_base_type[curr_proj],this.PJ_res_base_type_param[curr_proj],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
            }
        }
    }
};
