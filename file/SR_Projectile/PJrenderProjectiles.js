SR_Projectile.prototype.PJrenderProjectiles = function(){ // aa.b
    var img_corner1,img_corner2,img_corner3,img_corner4;
    var next_diff_x,next_diff_y,next_sum_x,next_sum_y,prev_diff_x,prev_diff_y,prev_sum_x,prev_sum_y,pj_ren_Z,pj_ren_X,pj_ren_dol,pj_ren_ob,img_var_pb;
    var pj_ren_Xa,top,pj_ren_rb,pj_ren_ia,pj_ren_spacing1,pj_ren_spacing2,pj_ren_rr,pj_ren_gg,pj_ren_bb,pj_ren_aa,pj_ren_RR,pj_ren_GG,pj_ren_BB,bottom;
    var pixel_color;
    var velocity_w = new Vector2D;
    var velocity_h = new Vector2D;
    var velocity_diff = new Vector2D;
    var velocity_sum = new Vector2D;

    for (var p=0; p<this.PJ_index; p++){
        if (this.PJ_appear_delay[p]<=0){ // if projectile has appeared (aka is active)
            img_corner1 = 16*this.PJ_img[p];

            if (this.PJ_is_transparent[p]==1)
                 pixel_color = floor((this.PJ_color[p]>>24&0xFF)*(this.PJ_disp_eff[p]-this.PJ_lifespan[p])/this.PJ_disp_eff[p])<<24|this.PJ_color[p]&0xFFFFFF;
            else pixel_color = this.PJ_color[p];

            if (this.PJ_solid_delay[p]>0)
                pixel_color = ((pixel_color>>24&0xFF)>>1)<<24|pixel_color&0xFFFFFF;

            Display_Mode = this.PJ_transp[p];
            Display_Mode2 = 1;

            if (this.PJ_orient[p]==0){ // if projectile is straight
                dispItemCentered(Projectiles_Img,floor(this.PJ_position[p].x),floor(this.PJ_position[p].y),this.PJ_width[p],this.PJ_height[p],img_corner1,0,16,16,pixel_color);
            } else {                   // if projectile is rotated
                velocity_h.Vset(this.PJ_velocity[p]);
                velocity_w.Vset(velocity_h);
                setPerpendicular(velocity_w);
                normalize(velocity_w);
                normalize(velocity_h);
                scaleVector2D(velocity_w,this.PJ_width[p]>>1);
                scaleVector2D(velocity_h,this.PJ_height[p]>>1);
                velocity_diff.Vdistance(velocity_h,velocity_w);
                sumVector2D(velocity_sum,velocity_h,velocity_w);
                next_diff_x = this.PJ_position[p].x+velocity_diff.x; // original name: r
                next_diff_y = this.PJ_position[p].y+velocity_diff.y; // original name: m
                img_corner2 = img_corner1;                               // original name: n
                next_sum_x = this.PJ_position[p].x+velocity_sum.x;   // original name: F
                next_sum_y = this.PJ_position[p].y+velocity_sum.y;   // original name: H
                img_corner3 = img_corner1+16;                            // original name: M
                prev_diff_x = this.PJ_position[p].x-velocity_diff.x; // original name: E
                prev_diff_y = this.PJ_position[p].y-velocity_diff.y; // original name: ka
                img_corner4 = img_corner1+16;                            // original name: Ja
                prev_sum_x = this.PJ_position[p].x-velocity_sum.x;   // original name: Ea
                prev_sum_y = this.PJ_position[p].y-velocity_sum.y;   // original name: Ca
                pj_ren_Z = 0;                                        // original name: Z
                pj_ren_X = 0;                                        // original name: X
                pj_ren_dol = 16;                                     // original name: $
                pj_ren_ob = 16;                                      // original name: ob
                img_var_pb = Projectiles_Img;                        // original name: pb

                next_diff_x <<= 16;
                next_diff_y <<= 16;
                next_sum_x <<= 16;
                next_sum_y <<= 16;
                prev_diff_x <<= 16;
                prev_diff_y <<= 16;
                prev_sum_x <<= 16;
                prev_sum_y <<= 16; // a<<16 is a*65536
                img_corner2 *= 65535;
                pj_ren_Z *= 65535;
                img_corner3 *= 65535;
                pj_ren_X *= 65535;
                img_corner4 *= 65535;
                pj_ren_dol *= 65535;
                img_corner1 *= 65535;
                pj_ren_ob *= 65535;

                pj_ren_Xa = void 0;       // original name: Xa
                top = Win_Height<<16;     // original name: ya
                pj_ren_rb = void 0;       // original name: rb
                pj_ren_ia = void 0;       // original name: ia
                pj_ren_spacing1 = void 0; // original name: ja
                pj_ren_spacing2 = void 0; // original name: za
                pj_ren_rr = void 0;       // original name: bb
                pj_ren_gg = void 0;       // original name: ab
                pj_ren_bb = void 0;       // original name: pa
                pj_ren_aa = void 0;       // original name: Ya
                pj_ren_RR = void 0;       // original name: Bb
                pj_ren_GG = void 0;       // original name: Cb
                pj_ren_BB = void 0;       // original name: Sa
                bottom = 0;               // original name: Oa

                if (top>next_diff_y)
                    top = next_diff_y;
                if (top>next_sum_y)
                    top = next_sum_y;
                if (top>prev_diff_y)
                    top = prev_diff_y;
                if (top>prev_sum_y)
                    top = prev_sum_y;
                if (bottom<next_diff_y)
                    bottom = next_diff_y;
                if (bottom<next_sum_y)
                    bottom = next_sum_y;
                if (bottom<prev_diff_y)
                    bottom = prev_diff_y;
                if (bottom<prev_sum_y)
                    bottom = prev_sum_y;
                top >>= 16;
                bottom >>= 16;
                if (top<0)
                    top = 0;
                if (bottom>=Win_Height)
                    bottom = Win_Height-1;

                for (var y=top; y<=bottom; y++){
                    Layer1[y] = Win_Width;
                    Layer2[y] = -1;
                }

                drawRotation(next_diff_x,next_diff_y,img_corner2,pj_ren_Z,next_sum_x,next_sum_y,img_corner3,pj_ren_X);
                drawRotation(next_sum_x,next_sum_y,img_corner3,pj_ren_X,prev_diff_x,prev_diff_y,img_corner4,pj_ren_dol);
                drawRotation(prev_diff_x,prev_diff_y,img_corner4,pj_ren_dol,prev_sum_x,prev_sum_y,img_corner1,pj_ren_ob);
                drawRotation(prev_sum_x,prev_sum_y,img_corner1,pj_ren_ob,next_diff_x,next_diff_y,img_corner2,pj_ren_Z);

                pj_ren_aa = pixel_color>>24&0xFF;
                pj_ren_rr = pixel_color>>16&0xFF;
                pj_ren_gg = pixel_color>>8&0xFF;
                pj_ren_bb = pixel_color&0xFF;

                for (var y=top; y<=bottom; y++){
                    for (
                         top = y*Win_Width+Layer1[y],
                         pj_ren_Xa = Layer2[y]-Layer1[y]+1,
                         pj_ren_spacing1 = (Layer4[y]-Layer3[y])/pj_ren_Xa,
                         pj_ren_spacing2 = (Layer6[y]-Layer5[y])/pj_ren_Xa,
                         pj_ren_rb = Layer3[y],
                         pj_ren_ia = Layer5[y],

                         pj_ren_Xa = Layer1[y]; pj_ren_Xa<=Layer2[y]; pj_ren_Xa++,

                         top++,
                         pj_ren_rb += pj_ren_spacing1,
                         pj_ren_ia += pj_ren_spacing2
                    ){
                        if (pj_ren_Xa>=0 && pj_ren_Xa<Win_Width){
                            pj_ren_BB = img_var_pb.IG_pxl_color_index[(pj_ren_ia>>16)*img_var_pb.IG_width+(pj_ren_rb>>16)];

                            if (Display_Mode2==0){
                                if (pj_ren_BB!=-1){
                                    pj_ren_RR = pj_ren_rr*((pj_ren_BB&0xFF0000)>>16)>>8;
                                    pj_ren_GG = pj_ren_gg*((pj_ren_BB&0x00FF00)>>8)>>8;
                                    pj_ren_BB = pj_ren_bb*(pj_ren_BB&0x0000FF)>>8;

                                    if (Display_Mode==0)
                                         Game_Canvas[top] = pj_ren_RR<<16|pj_ren_GG<<8|pj_ren_BB;
                                    else Game_Canvas[top] = colorBlend(Game_Canvas[top],pj_ren_RR<<16|pj_ren_GG<<8|pj_ren_BB,pj_ren_aa);
                                }
                            } else {
                                pj_ren_BB = pj_ren_aa*(pj_ren_BB&0xFF)>>8;
                                if (pj_ren_BB!=0)
                                    Game_Canvas[top] = colorBlend(Game_Canvas[top],pixel_color,pj_ren_BB);
                            }
                        }
                    }
                }
            }
            Display_Mode2 = Display_Mode = 0;
        }
    }
};
