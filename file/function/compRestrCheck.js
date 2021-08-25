// weapon and class restrictions on compos
function compRestrCheck(cp_eff_ID,class_ID,weap_type,weap_bullet){ // original name: Oe()
    if (cp_eff_ID==Stone_White || cp_eff_ID==Stone_Red || cp_eff_ID==Stone_Green || cp_eff_ID==Stone_Blue || cp_eff_ID==Stone_Black) // White, Red, Green, Blue, or Black Stone
        return true;                                                                                                                 // For all weapons and classes

    if (cp_eff_ID==Crystal_Red || cp_eff_ID == Crystal_Yellow){                                     // Red or Yellow Crystal
        if (class_ID==1 || class_ID==2 || class_ID==3 || class_ID==6 || class_ID==7 || class_ID==8) // Only for Boxer (1), Gladiator (2), Sniper (3), Gunner (6), Whipper (7), and Angel (8)
            return true;
    }
    if (cp_eff_ID==Crystal_Silver || cp_eff_ID==Crystal_Purple || cp_eff_ID==Crystal_Black) // Silver, Purple, or Black Crystal
        return true;                                                                        // For all weapons and classes

    if (cp_eff_ID==Jewel_Ruby || cp_eff_ID==Jewel_Garnet){ // Ruby or Garnet
        if (weap_type==1)                                  // Only for fire (type 1) weapons
            return true;
    }
    if (cp_eff_ID==Jewel_Sapphire || cp_eff_ID==Jewel_Aquamarine){ // Sapphire or Aquamarine
        if (weap_type==2)                                          // Only for ice (type 2) weapons
            return true;
    }
    if (cp_eff_ID==Jewel_Topaz){ // Topaz
        if (weap_type==3)        // Only for thunder (type 3) weapons
            return true;
    }
    if (cp_eff_ID==Jewel_Emerald || cp_eff_ID==Jewel_Peridot){ // Emerald or Peridot
        if (weap_type==4)                                      // Only for poison (type 4) weapons
            return true;
    }
    if (cp_eff_ID==Jewel_Diamond){ // Diamond
        if (weap_type==5)          // Only for freeze (type 5) weapons
            return true;
    }
    if (cp_eff_ID==Card_Quicks) // Quick's Card
        return true;            // For all weapons and classes

    if (cp_eff_ID==Card_Longsw){ // Long Sword's Card
        if (class_ID==2)         // Only works for Gladiator (2)
            return true;
    }
    if (cp_eff_ID==Card_Catapt){                                                     // Catapult's Card
        if (class_ID==3 || class_ID==4 || class_ID==5 || class_ID==6 || class_ID==8) // Only works for Sniper (3), Magician (4), Priest (5), Gunner (6), and Angel (8)
            return true;
    }
    if (cp_eff_ID==Card_Pierce){                       // Pierce's Card
        if (class_ID==3 || class_ID==4 || class_ID==6) // Only works for Sniper (3), Magician (4), and Gunner (6)
            return true;
    }
    if (cp_eff_ID==Card_Guides){                       // Guide's Card
        if (class_ID==3 || class_ID==4 || class_ID==6) // Only works for Sniper (3), Magician (4), and Gunner (6)
            return true;
    }
    if (cp_eff_ID==Card_Bullet){ // Bullet's Card
        if (weap_bullet>=2)      // Only works if weapon has 2 or more bullets
            return true;
    }
    if (cp_eff_ID==Card_Explsn){                                      // Explosion's Card
        if (class_ID==1 || class_ID==3 || class_ID==6 || class_ID==8) // Only for Boxer (1), Sniper (3), Gunner (6), and Angel (8)
            return true;
    }
    if (cp_eff_ID==Card_Bersrk){                       // Berserk Card
        if (class_ID==1 || class_ID==2 || class_ID==7) // Only for Boxer (1), Gladiator (2), and Whipper (7)
            return true;
    }
    if (cp_eff_ID==Card_Critcl){                                                                    // Critical's Card
        if (class_ID==1 || class_ID==2 || class_ID==3 || class_ID==6 || class_ID==7 || class_ID==8) // Only for Boxer (1), Gladiator (2), Sniper (3), Gunner (6), Whipper (7), and Angel (8)
            return true;
    }
    if (cp_eff_ID==Card_Big){           // Big Card
        if (class_ID==1 || class_ID==7) // Only for Boxer (1) and Whipper (7)
            return true;
    }
    if (cp_eff_ID==Card_Knockb){                                                     // Knockback's Card
        if (class_ID==1 || class_ID==3 || class_ID==4 || class_ID==6 || class_ID==7) // Only for Boxer (1), Sniper (3), Magician (4), Gunner (6), and Whipper (7)
            return true;
    }
    if (cp_eff_ID==Card_Reflct){                                                     // Reflection Card
        if (class_ID==3 || class_ID==4 || class_ID==6 || class_ID==7 || class_ID==8) // Only for Sniper (3), Magician (4), Gunner (6), Whipper (7), and Angel (8)
            return true;
    }
    if (cp_eff_ID==Card_Rings){ // Ring's Card
        if (class_ID==8)        // Only for Angel (8)
            return true;
    }
    if (cp_eff_ID==Card_Vampir){                       // Vampire's Card
        if (class_ID==1 || class_ID==2 || class_ID==7) // Only for Boxer (1), Gladiator (2), and Whipper (7)
            return true;
    }
    if (cp_eff_ID==Card_Heals) // Heal's Card
        return true;           // For all weapons and classes

    if (cp_eff_ID==Card_Katana){ // Katana's Card
        if (class_ID==2)         // Only for Gladiator (8)
            return true;
    }
    if (cp_eff_ID==Card_ONIGIR){                       // ONIGIRI's Card
        if (class_ID==1 || class_ID==2 || class_ID==7) // Only for Boxer (1), Gladiator (2), and Whipper (7)
            return true;
    }
    if (cp_eff_ID==Card_Gldrsh){                       // Gold rush Card
        if (class_ID==1 || class_ID==2 || class_ID==7) // Only for Boxer (1), Gladiator (2), and Whipper (7)
            return true;
    }
    if (cp_eff_ID==Card_Zombie) // Zombie's Card
        return true;            // For all weapons and classes

    if (cp_eff_ID==Medal_Bronze || cp_eff_ID==Medal_Silver || cp_eff_ID==Medal_Gold || cp_eff_ID==Medal_Iron) // Bronze, Silver, Gold, or Iron Medal
        return true;                                                                                          // For all weapons and classes

    if (cp_eff_ID==Charm_Ice || cp_eff_ID==Charm_Poison || cp_eff_ID==Charm_Freeze) // Ice, Poison, or Freeze Charm
        return true;                                                                // For all weapons and classes

    if (cp_eff_ID==Spirit_Eff) // Any Spirit
        return true;           // For all weapons and classes

    if (cp_eff_ID==Crown_Imprl || cp_eff_ID==Crown_Anger) // Imperial or Anger Crown
        return true;                                      // For all weapons and classes

    return false;
}
