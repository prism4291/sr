var Debug_Mode = 0;                         // display debug mode on/off       original name: ca
var Curr_Sequence = ["0: Title Screen: launch game","1: Title Screen: spawn stickmen","2: Title Screen: enable buttons","3: Title Screen: class select","4: Title Screen: load new game","5: Title Screen: load saved game","6: Title Screen: world map","","","","10: Enemy Screen: load screen","11: Enemy Screen: fade in","12: Enemy Screen: play","13: Enemy Screen: fade out","","","","","","","20: Enemy Screen: pause","","","","","","","","","","30: Enemy Screen: game over","","","","","","","","","","40: Enemy Screen: game clear","","","","","","","","","","50: Town Screen: load screen","51: Town Screen: fade in","52: Town Screen: play","53: Town Screen: open shop","54: Town Screen: open book","55: Town Screen: open forget","","","","59: Town Screen: fade out","60: VS Mode Screen: ","61: VS Mode Screen: ","62: VS Mode Screen: ","63: VS Mode Screen: ","64: VS Mode Screen: ","","","","","","70: VS Mode Screen: ","71: VS Mode Screen: ","72: VS Mode Screen: ","73: VS Mode Screen: "]; // current game mode                (new variable)
var Win_Width = 512;                        // width of game window            original name: ea
var Win_Height = 384;                       // height of game window           original name: fa
var Inv_Height = 0;                         // height of inventory UI           (new variable)
var Inv_Top = Win_Height-Inv_Height;        // top of inv. 384-128 = 256        (new variable)
var Win_Hcenter = Win_Width>>1;             // horizontal center of window      (new variable)
var Game_Mode = 0;                          // 0: PvE, 1: PvP, 2:upload screen original name: ga
var Game_ID;      // your ID#, checked to see if the save code belongs to you  original name: ha
var VS_Player_Team_Text;                    // team ID sent when uploading     original name: la
var Player_Name;                            // your username                   original name: ma
var VS_Player_Team_Name;                    // your team's name                original name: na
var VS_Opponent_Team_ID;                    // opponent team ID                original name: oa
var VS_Opponent_Name;                       // opponent's username             original name: qa
var VS_Opponent_Team_Name;                  // opponent team's name            original name: ra
var VSMODECODE8;                            // VSMODECODE8                     original name: sa
var VS_Upload_Errors = 0;                   // error handler for uploads/day   original name: ua
var VS_Player_Team_ID = 0;                  // player's Team ID, not encoded   original name: va
var VSMODECODE11 = new SR_Image;            // VSMODECODE11                    original name: xa
var VSMODECODE12 = new SR_Image;            // VSMODECODE12                    original name: Aa
var VSMODECODE13 = new SR_Image;            // VSMODECODE13                    original name: Ba
var VSMODECODE14 = new SR_Image;            // VSMODECODE14                    original name: Da
var VSMODECODE15 = new SR_Image;            // VSMODECODE15                    original name: Fa
var VSMODECODE16 = new SR_Image;            // VSMODECODE16                    original name: Ga
var Save_Cookie;                            // save file from player's cookie  original name: Ha
var VS_Opponent_Data;                       // opponent's team data save code  original name: Ia
var VS_Game_ID_Plain = [0,0,0,0,0,0,0,0];   // plain Game ID used in save code original name: Ka
var Game_Language;                          // Japanese/English/Chinese        original name: La
var Stage_Eff_Canvas = new SR_Image;        // foreground snow and game over   original name: Ma
var Stage_Terrain_Img = new SR_Image;       // background terrain              original name: Na
var Terrain_Textures = Array(13);           // terrain textures                original name: Pa
var Player_Img = new SR_Image;              // stickman weapons and shadow     original name: Qa
var Drop_Img = new SR_Image;                // icons for items when dropped    original name: Ra
var Item_Img = new SR_Image;                // icons for items in inventory    original name: Ua
var Enemy_Head_Img = new SR_Image;          // enemy head images               original name: Va
var Sign_Img = new SR_Image;                // blank sign icon                 original name: Wa
var Projectiles_Img = new SR_Image;         // images for all projectiles      original name: Za
var Title_Img = new SR_Image;               // main menu title                 original name: $a
var Effect_Img = new SR_Image;              // aura and flashlight             original name: cb
var Hut_Img = new SR_Image;                 // hut image                       original name: db
var Water_Img = new SR_Image;               // water tile (in stage not map)   original name: fb
var Water_Red_Img = new SR_Image;           // red water tile                  original name: gb
var Forget_Tree_Img = new SR_Image;         // forget tree image               original name: hb
var Map_Elev_Index = new SR_Image;          // elevation index                 original name: ib
var Map_Tiles_Img = new SR_Image;           // land/rock/sand image            original name: jb
var Map_Feature_Index = new SR_Image;       // feature index                   original name: kb
var Map_Features_Img = new SR_Image;        // tree/castle/cave image          original name: lb
var Sequence_Step = 0;                      // game sequence                   original name: f
var Text_Fade = 0;                          // fadeout timer                   original name: mb
var Current_Stage = 0;                      // ID of stage                     original name: h
var Current_Screen = 0;                     // current screen in stage         original name: nb
var Sign_Touched_Mode = 0;    // 0:sign not hit 1:NEXT sign hit 2:MAP sign hit original name: sb
var Displayed_Object = 0;                   // ID of selected object           original name: l
var Selected_Player = 3;                    // ID of held player               original name: tb
var Mouse_Up = false;                       // left mouse button state         original name: ub
var Menu_Column = 0;                        // column for shop/book/forget     original name: vb
var Menu_Row = 0;                           // current row for shop/book       original name: wb
var Menu_Entry = 0;                         // current entry for shop/book     original name: xb
var Book_Page = 0;                          // column for shop/book/forget     original name: vb
var Book_Row = 0;                           // current row for shop/book       original name: wb
var Book_Column = 0;                        // current entry for shop/book     original name: xb
var Ranger_Class_Proxy = [0,0,0,0];         // team list placeholder           original name: yb
var Item_Inv_Proxy = [0,0,0,0];             // item inventory placeholder      original name: zb
var Comp1_Inv_Proxy = [0,0,0,0];            // compo 1 placeholder             original name: Ab
var Comp2_Inv_Proxy = [0,0,0,0];            // compo 2 placeholder             original name: Eb
var Target_HP_Current = 0;                  // current LP of target            original name: Fb
var Target_HP_Max = 0;                      // max LP of target                original name: Gb
var En_Count_From_Max = 0;                  // max that can spawn per screen   original name: Hb
var Target_Array_ID = 0;                    // array position of target        original name: Ib
var Click_To_Sell_Mode = 0;                 // click to sell mode              original name: Jb
var Enemy_Spawn_Scale = 100;                // enemy spawn cap scale (100 means numbers are percentages aka denominator 100) original name: Kb
var Max_Crowns = 4;                         // maximum number of crowns         (new variable)
var Enemy_Mult = 1;                         // enemy limit multiplier   ******(WARNING: THIS WILL CAUSE MAJOR LAG)******
var Proj_Limit = 1000;                      // projectile limit         ******(WARNING: THIS WILL CAUSE MAJOR LAG)******
var Ind_Limit = 1000;                       // animated indicator limit ******(WARNING: THIS WILL CAUSE MAJOR LAG)******
var Drop_Limit = 100;                       // drop count limit         ******(WARNING: THIS WILL CAUSE MAJOR LAG)******
var Anger_Crown_Lightning = 0;              // Anger Crown lightning           original name: Lb
var LV = [1,1];                             // LV[PvE,PvP] (level)             original name: Mb
var FP = [1,1];                             // FP[PvE,PvP] (Fighting Power)    original name: Nb
var Rank = [0,0];                           // Rank[PvE,PvP]                   original name: $b
var SP = [0,0,0,0,0,0,0,0];                 // uninvested skill points         original name: ac
var Team_EXP = 0;                           // experience                      original name: cc
var Team_Gold = 0;                          // gold                            original name: dc
var Ranger_Class = [0,0,0,0,0,0,0,0];       // class ID of each stickman       original name: ec
var Class_Dead = 100;                       // class of dead stickmen           (new variable)
var Class_Compo = 200;                      // class of compo items            original name: Mg
var Class_Pickup = 300;                     // class of gold, onigiri           (new variable)
var Class_Stickman = 0;                     // class of unequipped characters   (new variable)
var LP_Current = [50,50,50,50,50,50,50,50]; // LP of each stickman             original name: p
var MP_Bar = [0,0,0,0,0,0,0,0];             // MP of each stickman             original name: fc
var LP_SP = [0,0,0,0,0,0,0,0];              // points in LP of each stickman   original name: gc
var STR_SP = [0,0,0,0,0,0,0,0];             // points in STR of each stickman  original name: hc
var DEX_SP = [0,0,0,0,0,0,0,0];             // points in DEX of each stickman  original name: ic
var MAG_SP = [0,0,0,0,0,0,0,0];             // points in MAG of each stickman  original name: jc
var LP_Max = [50,50,50,50,50,50,50,50];     // max LP of each stickman         original name: kc
var STR = [0,0,0,0,0,0,0,0];                // STR parameter                   original name: lc
var DEX = [0,0,0,0,0,0,0,0];                // DEX parameter                   original name: mc
var MAG = [0,0,0,0,0,0,0,0];                // MAG parameter                   original name: nc
var AT_Min = [0,0,0,0,0,0,0,0];             // minimum AT of each stickman     original name: oc
var AT_Max = [0,0,0,0,0,0,0,0];             // maximum AT of each stickman     original name: pc
var Agi_Min = [0,0,0,0,0,0,0,0];            // minimum AGI of each stickman    original name: qc
var Agi_Max = [0,0,0,0,0,0,0,0];            // maximum AGI of each stickman    original name: rc
var Range = [0,0,0,0,0,0,0,0];              // range of each stickman          original name: tc
var Sett_Auto_Move = [1,1,1,1,1,1,1,1];     // move setting of each stickman   original name: uc
var Sett_Move_If_Dying = 0;                 // "move of dying" setting         original name: vc
var Sett_Dmg_Indicators = 0;                // "damage effect" setting         original name: wc
var Sett_LP_Bar_Disp = 0;                   // LP bar on/off                   original name: xc
var Sett_PL_Symbol = 0;                     // symbol above selected player    original name: yc
var Sett_Drag_Dead_Body = 1;                // if dead body parts draggable    original name: zc
var STR_Aura = [0,0,0,0,0,0,0,0];           // STR aura points                 original name: Ac
var DEX_Aura = [0,0,0,0,0,0,0,0];           // DEX aura points                 original name: Bc
var MAG_Aura = [0,0,0,0,0,0,0,0];           // MAG aura points                 original name: Cc
var Item_Inv = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  // each item in the inventory              original name: q[]
var Comp1_Inv = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // 1st compo on each item in the inventory original name: Dc[]
var Comp2_Inv = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // 2nd compo on each item in the inventory original name: Ec[]
var Stickmen_Slots = 4;                     // number of stickmen              original name: s
var Inv_First = 16;                         // first inventory slot            original name: Fc
var Inv_Last = 40;                          // stored inventory capacity       original name: Gc
var Inv_Size = 41;                          // inventory and held item size    original name: Hc
var Null_Slot = 59;                         // null slot (aka NG or X)         original name: Ic
var Class_Name_List = "Stickman Boxer Gladiator Sniper Magician Priest Gunner Whipper Angel".split(" "); // list of classes original name: Jc
var Rank_List = "123456789S".split("");     // character list of ranks         original name: Kc
var Item_Name = 0;                          // array element of item name      original name: Mc
var Item_LV = 1;                            // array element of item tier      original name: Nc
var Item_Buy_Price = 2;                     // shop price of item              original name: Oc
var Item_Ico_Sm = 3;                        // drop icon number                original name: Pc
var Item_Ico_Big = 4;                       // inventory icon number           original name: Qc
var Item_Class_ID = 5;                      // class for item/weapon           original name: Rc
var Item_Color = 6;                         // color of item                   original name: Sc
var Ring_HBox_Rate = 7;                     // ring hit frequency               (new variable)
var Item_Splash = 9;                        // if it has splash DMG (0/1)       (new variable)
var Item_AT_Min = 10;                       // item's minimum damage           original name: Tc
var Item_AT_Max = 11;                       // item's maximum damage           original name: Uc
var Item_Bullet = 12;                       // number of bullets               original name: Vc
var Weap_AGI_Min = 14;                      // min = MAXimum rate of fire      original name: Wc
var Weap_AGI_Max = 15;                      // max = MINimum rate of fire      original name: Xc
var Weap_Range = 16;                        // range                           original name: Yc
var Proj_Color = 19;                        // color of projectile             original name: Zc
var Proj_Lifespan = 27;                     // how long until projectile ends   (new variable)
var Item_Type = 34;                         // element type                    original name: $c
var Item_Type_Para = 35;                    // element parameter               original name: ad
var Weap_MP_Price = 36;                     // MP cost or bullet cost          original name: bd
var Item_Res_Mode = 37;                     // residue mode                    original name: cd
var Item_BAT_Min = 39;                      // bonus attack min damage         original name: dd
var Item_BAT_Max = 40;                      // bonus attack max damage         original name: ed
var Res_Color = 44;                         // color of bonus attack           original name: fd
var Res_Lifespan = 52;                      // how long until residue ends      (new variable)
var Eff_ID = 7;                             // array element of effect ID      original name: hd
var Eff1 = 8;                               // 1st effect parameter            original name: t
var Eff2 = 9;                               // 2nd effect parameter            original name: id
var Compo_Desc_1 = 10;                      // description line 1              original name: jd
var Compo_Desc_2 = 11;                      // description line 2              original name: kd
var Stone_White = 1;                        // White Stone effect ID           original name: ld
var Stone_Red = 2;                          // Red Stone effect ID             original name: md
var Stone_Green = 3;                        // Green Stone effect ID           original name: nd
var Stone_Blue = 4;                         // Blue Stone effect ID            original name: od
var Stone_Black = 5;                        // Black Stone effect ID           original name: pd
var Crystal_Red = 6;                        // Red Crystal effect ID           original name: qd
var Crystal_Yellow = 7;                     // Yellow Crystal effect ID        original name: rd
var Crystal_Silver = 8;                     // Silver Crystal effect ID        original name: sd
var Crystal_Purple = 9;                     // Purple Crystal effect ID        original name: td
var Crystal_Black = 10;                     // Black Crystal effect ID         original name: ud
var Card_Vampir = 11;                       // Vampire's Card effect ID        original name: vd
var Card_ONIGIR = 12;                       // ONIGIRI's Card effect ID        original name: wd
var Card_Gldrsh = 37;                       // Gold rush Card effect ID        original name: xd
var Jewel_Ruby = 13;                        // Ruby effect ID                  original name: yd
var Jewel_Garnet = 14;                      // Garnet effect ID                original name: zd
var Jewel_Sapphire = 15;                    // Sapphire effect ID              original name: Ad
var Jewel_Aquamarine = 16;                  // Aquamarine effect ID            original name: Bd
var Jewel_Topaz = 17;                       // Topaz effect ID                 original name: Cd
var Jewel_Emerald = 18;                     // Ememrald effect ID              original name: Dd
var Jewel_Peridot = 19;                     // Peridot effect ID               original name: Ed
var Jewel_Diamond = 20;                     // Diamond effect ID               original name: Fd
var Card_Quicks = 21;                       // Quick's Card effect ID          original name: Gd
var Card_Longsw = 22;                       // Long Sword's effect ID          original name: Hd
var Card_Catapt = 23;                       // Catapult's Card effect ID       original name: Id
var Card_Pierce = 24;                       // Pierce's Card effect ID         original name: Jd
var Card_Guides = 25;                       // Guide's Card effect ID          original name: Kd
var Card_Bullet = 26;                       // Bullet's Card effect ID         original name: Ld
var Card_Explsn = 27;                       // Explosion's Card effect ID      original name: Md
var Card_Bersrk = 28;                       // Berserk Card effect ID          original name: Nd
var Card_Critcl = 29;                       // Critical's Card effectID        original name: Od
var Card_Zombie = 32;                       // Zombie's Card effect ID         original name: Pd
var Medal_Bronze = 33;                      // Bronze Medal effect ID          original name: Qd
var Medal_Silver = 34;                      // Silver Medal effect ID          original name: Rd
var Medal_Gold = 35;                        // Gold Medal effect ID            original name: Sd
var Medal_Iron = 36;                        // Iron Medal effect ID            original name: Td
var Charm_Ice = 38;                         // Ice Charm effect ID             original name: Ud
var Charm_Poison = 39;                      // Poison Charm effect ID          original name: Vd
var Charm_Freeze = 40;                      // Freeze Charm effect ID          original name: Wd
var Spirit_Eff = 41;                        // Spirit effect ID                original name: Xd
var Card_Big = 42;                          // Big Card effect ID              original name: Yd
var Card_Knockb = 43;                       // Knockback's Card effect ID      original name: Zd
var Card_Reflct = 44;                       // Reflection Card effect ID       original name: $d
var Card_Katana = 45;                       // Katana's Card effect ID         original name: ae
var Card_Heals = 46;                        // Heal's Card effect ID           original name: be
var Card_Rings = 47;                        // Ring's Card effect ID           original name: ce
var Crown_Imprl = 48;                       // Imperial Crown effect ID        original name: de
var Crown_Anger = 49;                       // Anger Crown effect ID           original name: ee
var Save_Code1 = 0;        // original name: fe
var Saving_Text_Timer = 0; // original name: ge
var Save_Code3 = "";       // original name: he
var Save_Error = 0;            // original name: je
var Save_Error_Text_Timer = 0; // original name: ke
var Save_Code_le = "";         // original name: le
var Slot1 = false;
var Slot2 = false;
var Char_List = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.*".split(""); // original name: ye
//var Check_Var_Primary = 0;    // original name: d
var Check_Var_Total = 0;      // original name: Fe
var Check_Var_Seed = 0;       // original name: Ge
var Item_Attribute_Data = []; // original name: He
var Enemy_Spawn_Data = 0;     // original name: Ie
var Monster_Data = 0;         // original name: Je
var Shop_Item_Data = 0;       // original name: Ke
//var Check_Var_Primary; // original name: d
var Check_Var_LV = 0;
var Check_Var_SP = 0;
var Check_Var_LP_SP = 0;
var Check_Var_STR_SP = 0;
var Check_Var_DEX_SP = 0;
var Check_Var_MAG_SP = 0;
var Check_Var_Ranger_Class = 0;
var Check_Var_LP_Current = 0;
var Check_Var_MP_Bar = 0;
var Check_Var_LP_Max = 0;
var Check_Var_STR = 0;
var Check_Var_DEX = 0;
var Check_Var_MAG = 0;
var Check_Var_AT_Min = 0;
var Check_Var_AT_Max = 0;
var Check_Var_Agi_Min = 0;
var Check_Var_Agi_Max = 0;
var Check_Var_Range = 0;
var Check_Var_Item_Inv = 0;
var Check_Var_Comp1_Inv = 0;
var Check_Var_Comp2_Inv = 0;
var Check_Var_STR_Aura = 0;
var Check_Var_DEX_Aura = 0;
var Check_Var_Stage_Status = 0;
// stage number    [0,1,2,3,4 ,5 ,6 ,7 ,8 ,9 ,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26 ,27 ,28 ,29 ,30 ,31 ,32 ,33 ,34 ,35 ,36 ,37 ,38 ,39 ,40 ,41 ,42 ,43 ,44 ,45 ,46 ,47 ,48 ,49 ,50 ,51 ,52 ,53 ,54 ,55 ,56 ,57 ,58 ,59 ,60 ,61 ,62 ,63 ,64 ,65 ,66 ,67 ,68 ,69 ,70 ,71 ,72 ,73 ,74 ,75 ,76 ,77 ,78 ,79 ,80 ,81 ,82 ,83 ,84 ,85 ,86 ,87 ,88 ,89]; // added this comment for easier reference
var Book_Indexer = [0,0,5,9,14,19,23,27,31,35,39,41,45,49,53,57,61,65,70,75,80,80,85,90,94,98,102,106,110,114,116,120,124,128,130,134,138,142,146,150,154,158,162,164,168,172,176,180,180,185,190,195,199,203,207,211,215,219,223,227,231,235,239,243,245,249,253,257,260,264,268,268,270,274,278,282,286,290,290,294,298,302,306,310,315,320,324,328,332,338,339]; // original name Pe[]
var EN_Lvl = 0;      // enemy level         original name: Qe
var EN_Species = 1;  // enemy species       original name: bh
var EN_Size = 3;     // enemy size          original name: ch
var EN_LP = 6;       // enemy LP            original name: lg
var Ph_Resist = 35;  // physical resistance original name: pg
var Fi_Resist = 36;  // fire resistance     original name: qg
var Ic_Resist = 37;  // ice resistance      original name: rg
var Th_Resist = 38;  // thunder resistance  original name: sg
var Po_Resist = 39;  // poison resistance   original name: tg
var Fr_Resist = 40;  // freeze resistance   original name: ug
var En_2nd_Att = 60; // 2nd attack switch   original name: Re
var EN_EXP = 61;     // enemy experience    original name: ng
var En_Gold = 62;    // enemy gold dropped  original name: mg
var En_Drop1 = 63;   // enemy drop #1       original name: og
var Hitboxvar1 = [20,20,20,20,18,8 ,20,20,8 ,20,16,16,20,20,16,16,16,14,8];   // original name: fh
var Hitboxvar2 = [20,20,20,20,24,40,20,20,20,20,16,24,20,20,16,16,16,14,40];  // original name: gh
var Text_Spacing = [1,0.2,1,0.2,2,0.5,1,0.1,1,0.1,1,1,0.1,0.1,1,1,0.2,1,0.5]; // original name: ah
var Stage_Count = 90; // original name: ze
var Stage_Status = [3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // original name: Ae
var Unlocked = 1;     // original name: Ce
var Beaten = 2;       // original name: Be
var Booked = 4;       // original name: kg
var Stage_In_Book = [1,2,3,4,5,6,7,8,11,12,13,9,10,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,88,89,0 ,0 ,0 ,0,0]; // stages in book original name: jg[]
// stage number [0,1,2,3,4,5,6,7,8 ,9 ,10,1,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,8,9]; // added this comment for easier reference
var Shop_Reqs = [1,2,3,4,5,5,6,6,7 ,7 ,9 ,5,6 ,7 ,1 ,8 ,8 ,9 ,9 ,9 ,1 ,10,11,11,12,12,13,13,14,14,12,13,14,1 ,15,15,15,16,16,1 ,17,17,18,17,18,18,18,1 ,19,19,19,20,20,20,21,23,20,21,21,22,22,23,22,23,24,24,24,24,24,25,1 ,1 ,24,25,26,26,26,1 ,27,27,28,28,1 ,29,30,31,32,33,1,1]; // stage that must be beaten in order to unlock the current weapon in shop original name: gg[]
var Stage_Names = "Town;Opening Street;Grassland 1;Grassland 2;Grassland 3;Grassland 4;Grassland 5;Grassland 6;Grassland 7;Castle Gate;Castle;Hill Country 1;Hill Country 2;Hill Country 3;Lake;Forest 1;Forest 2;Cavern 1;Cavern 2;Cavern 3;Village;Seaside 1;Seaside 2;Seaside 3;Seaside 4;Submarine 1;Submarine 2;Submarine 3;Submarine 4;Submarine Shrine;Mist Grove 1;Mist Grove 2;Mist Grove 3;???;Desert 1;Desert 2;Desert 3;Desert 4;Desert 5;Oasis;Desert 6;Desert 7;Pyramid;Desert 8;Beach 1;Beach 2;Beach 3;Resort;Cavern 4;Cavern 5;Cavern 6;Snowfield 1;Snowfield 2;Mountain 1;Mountain 2;Mountaintop;Snowfield 3;Snowfield 4;Snowfield 5;Snowfield 6;Snowfield 7;Snowfield 8;Frozen Lake;Ice Castle;Snowfield 9;Beach 4;Forest 3;Forest 4;Forest 5;Forest 6;Forget Tree;!!!;Hell 1;Hell 2;Hell 3;Hell 4;Hell 5;Island;Hell 6;Inferno 1;Inferno 2;Inferno 3;Blood Lake;Cavern 7;Cavern 8;Hell 7;Hell 8;Hell Gate;Hell Castle;Volcano".split(";"); // original name: Uf
// spawn positions
var Ground = 1;              // original name: O
var Ground_Left = 2;         // original name: P
var Ground_Middle = 3;       // original name: Q
var Ground_Right = 4;        // original name: R
var Air_Water = 5;           // original name: S
var Water = 6;               // original name: T
var Ground_Left_Clump = 7;   // original name: Mf
var Ground_Middle_Clump = 8; // original name: Nf
var Ground_Right_Clump = 9;  // original name: Of
var Air = 10;                // original name: Lf
var Ceiling = 11;            // original name: Pf
var Ceiling_Left = 12;       // original name: Qf
var Ceiling_Middle = 13;     // original name: Rf
var Ceiling_Left = 14;       // original name: Sf

