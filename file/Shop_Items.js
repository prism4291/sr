var Shop_Items = [                          // item ID #'s for each shop       original name: Lc
    // Shop (Town)
    [
        [3  ,7  ,11 ,15 ,54 ,64 ,68 ,72 ,116,121,131,137,153,178,202,214,226,253,312,328,345,360,394,410,429,451,471,479,496,504,512,520,549], // List of gloves
        [4  ,8  ,12 ,16 ,55 ,65 ,69 ,73 ,117,122,132,138,154,179,203,215,227,254,313,329,346,361,395,411,430,452,472,480,497,505,513,521,550], // Swords
        [5  ,9  ,13 ,17 ,56 ,66 ,70 ,74 ,118,123,133,139,155,180,204,216,228,255,314,330,347,362,396,412,431,453,473,481,498,506,514,522,551], // Bows
        [6  ,10 ,14 ,18 ,57 ,67 ,71 ,75 ,119,124,134,140,156,181,205,217,229,256,315,331,348,363,397,413,432,454,474,482,499,507,515,523,552], // Orbs
        [58 ,60 ,61 ,62 ,63 ,115,126,127,128,129,135,141,157,182,206,218,230,257,316,332,349,364,398,414,433,455,475,483,500,508,516,524,553], // Staffs
        [76 ,77 ,78 ,79 ,80 ,81 ,82 ,83 ,120,125,136,142,158,183,207,219,231,258,317,333,350,365,399,415,434,456,476,484,501,509,517,525,554], // Guns
        [188,189,190,191,192,193,194,195,196,197,198,199,200,201,208,220,232,259,318,334,351,366,400,416,435,457,477,485,502,510,518,526,555], // Whips
        [289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,319,335,352,367,401,417,436,458,478,486,503,511,519,527,556]  // Rings
    ],
    // Compo Shop (Village)
    [
        [19 ,20 ,21 ,22,23,0 ,0 ,0 ,0],                         // Level 1 stones
        [24 ,25 ,26 ,27,28,0 ,0 ,0 ,0],                         // Level 1 crystals
        [31 ,32 ,33 ,34,35,36,37,38,0],                         // Level 1 jewels
        [29 ,39 ,40 ,41,42,43,44,45,47,46,341,389,406,441,459], // Level 1 cards
        [51 ,52 ,53 ,48,0 ,0 ,0 ,0 ,0],                         // Level 1 medals
        [243,244,245,0 ,0 ,0 ,0 ,0 ,0],                         // Level 1 wards
        [277,285,0  ,0 ,0 ,0 ,0 ,0 ,0]                          // Level 1 charms
    ],
    // Junk Shop (Resort)
    [
        [270,270,0,0,0,0,0,0,0], // charge punch
        [271,271,0,0,0,0,0,0,0], // wooden sword
        [272,272,0,0,0,0,0,0,0], // pyramid arrow
        [273,273,0,0,0,0,0,0,0], // atomic ray
        [274,274,0,0,0,0,0,0,0], // high light staff
        [275,275,0,0,0,0,0,0,0], // missile
        [276,276,0,0,0,0,0,0,0], // freeze whip
        [307,307,0,0,0,0,0,0,0]  // chakram
    ],
    // Compo Shop (Island)
    [
        [19 ,84 ,143,209,323,418,20 ,85 ,144,210,324,419,21 ,86 ,145,211,325,420,22 ,87 ,146,212,326,421,23 ,88 ,147,213,327,422],//,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,    // Level 1-5 Stones
        [24 ,89 ,148,221,336,0  ,25 ,90 ,149,222,337,0  ,26 ,91 ,150,223,338,0  ,27 ,92 ,151,224,339,0  ,28 ,93 ,152,225,340,0], // ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,    // Level 1-5 Crystals
        [31 ,96 ,161,260,369,0  ,32 ,97 ,162,261,370,0  ,33 ,98 ,163,262,371,0  ,34 ,99 ,164,263,372,0  ,35 ,100,165,264,373,0  ,36 ,101,166,265,374,0  ,37 ,102,167,266,375,0  ,38 ,103,168,267,376,0], // ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,    // Level 1-5 Jewels
        [39 ,104,169,237,353,0  ,40 ,105,170,242,354,0  ,41 ,106,171,240,355,0  ,42 ,107,172,268,0  ,0  ,43 ,108,173,269,356,0  ,44 ,109,174,238,357,0  ,45 ,110,175,249,0  ,0  ,47 ,111,176,239,358,0  ,46 ,130,177,241,359,0  ,341,342,343,344,368,0  ,389,390,391,392,393,0  ,406,407,408,409,0  ,0  ,459,460,461,462,463,0], // Level 1-5 Cards
        [385,386,387,388,0  ,0  ,0  ,0  ,0], // ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,    // Level 5 Medals
        [243,244,245,246,247,248,250,251,252,320,321,322],//,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,    // Level 1-4 Spirits
        [277,285,377,279,287,379,281,308,381,283,310,0] //  ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,    // Level 1-5 Jewels
    ]
];
