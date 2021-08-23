/*
 Copyright (C) 2008 ha55ii,http://dan-ball.jp/
 The games source code use is prohibition.
*/

// Stick Ranger 18.9
// Patch version 19.11

/*    Changes:
 Added debug mode to options
 Investing SP shows indicators (AT+, Cost-, DEF+)
 Element descriptions are in color
 Lowercase letters
 Other numerous UI changes; none of which change gameplay, navagation, controls, etc.
 Anticheat sends error messages to console
 New Game with the crown now finds crowns on equipped weapons
 DPS measurements
 All enemy classes are able to use secondary attacks
 Grey out unpurchased stages in the book
 Arrow keys can be used to scroll through book stages and enemies
 Restored desert haze effect

   The following can be un-commented out to add these mechanics (search for "edit")
 Check crowns of equipped weapons on existing team
 Add debug option to Options menu
 Allow stickmen to sill attack if their feet are up to 8 pixels (1 tile) off the ground
 Stop priests from walking toward enemies outside their vertical range
 Allow stickmen to be controlled with WASD
 Stickmen no longer swim into corners if enemy is on the other side of a wall (not yet working)
 Right click (instead of hover) to scroll map
*/

/*    Mods:
 Randomizer (based on a mod by Aho)
 Spirited Mod
*/


/*    Errors:
 No known errors.
*/

/*    To Do list:
 define pl_at_lf
 anger_lightning_opacity
 translate PJifContact
 translate drawRotation
 translate doVSModeText
 swimming around vertical walls up/down
 add level 1-4 medals to island compo shop
 find out what the loadGame() values are
*/

/*    Comment out before releasing (search for "testing")
 unkillable stickmen
 screen transition skips
*/

// general order: left,right,top,bottom,x_pos,y_pos,width,height
// Global_Var, local_var, functionName(), ObjectFunction()

/* UI Modes
 0:
  fade in screen
  play normal & town screen
  fade out screen
  PvP
  game over
 1:
  paused game
  shop
  book
  forget tree
 2:
  world map
*/

/* TR_tile_data reference
the screen is split into 4px by 4px tiles, making it 64x48

3x3 block surrounded by Air:
    -1-1-1-1-1
    -1 0 1 2-1
    -1 3 4 5-1
    -1 6 7 8-1
    -1-1-1-1-1

    else if (m == T && 0 < I.ab) d = z(A(I.ab)), c = I.gb[d] & z(ea/8)-1, d = z(I.gb[d] / z(ea/8));
    else if (m == T && 0 < I.ab) d = z(A(I.ab)), c = I.gb[d] & z(ea/8)-1, d = z(I.gb[d] / z(ea/8));

Air: -1
Water: 9

top left corner: 0
top side: 1
top right corner: 2

left side: 3
surrounded: 4
right side: 5

bottom left corner: 6
bottom side: 7
bottom right corner: 8
*/
