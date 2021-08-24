var Stage_Spawns = [         // original name: Me
    [   //0 Town
        [0,0  ,Ground,0,0,Ground,0,0,Ground,0,0,Ground,0,0],
        [0,100,Ground,0]
    ],
    [   //1 Opening Street
        [0,1  ,Ground     ,0,5 ,Ground_Middle,1,1],
        //[0,100,Ground_Middle_Clump,4,1], // Dummy training ground
        [0,1  ,Ground     ,0,6 ,Ground_Middle,1,3],
        [0,1  ,Ground     ,0,6 ,Ground_Left  ,1,2,Ground_Middle,2,1],
        [0,1  ,Ground     ,1,5 ,Ground_Middle,2,3],
        [0,1  ,Ground     ,2,5 ,Ground_Middle,1,2],
        [0,1  ,Ground     ,0,20],
        [0,1  ,Ground     ,2,8 ,Ground_Middle,3,1],
        [0,1  ,Ground     ,2,8 ,Ground_Left  ,0,3,Ground_Middle,3,2],
        [0,1  ,Ground     ,2,8 ,Ground_Left  ,3,1,Ground_Middle,3,2,Ground_Right,3,3],
        [0,100,Ground_Left,2,2 ,Ground_Middle,3,2,Ground_Right ,4,1]
    ],
    [   //2 Grassland 1
        [0,2  ,Ground_Left,5,1 ,Ground_Middle,5,2,Ground_Right ,5,3 ],
        [0,2  ,Ground     ,5,6 ,Ground_Middle,6,2],
        [0,2  ,Ground_Left,5,6 ,Ground_Middle,6,4],
        [0,2  ,Ground_Left,5,12],
        [0,2  ,Ground     ,5,6 ,Ground_Left  ,6,2,Ground_Middle,6,2 ,Ground_Right,7,1],
        [0,2  ,Ground_Left,6,3 ,Ground_Middle,7,2,Ground_Right ,6,3 ],
        [0,2  ,Ground_Left,7,3 ,Ground_Middle,6,4],
        [0,100,Ground_Left,5,1 ,Ground_Middle,5,6,Ground_Right ,8,12]
    ],
    [   //3 Grassland 2
        [0,2  ,Ground     ,9 ,2,Ground_Left  ,10,1,Ground_Middle,10,1,Ground_Right,10,1],
        [0,2  ,Ground     ,9 ,3,Ground_Left  ,10,1,Ground_Middle,10,3,Ground_Right,10,2],
        [0,2  ,Ground_Left,10,1,Ground_Middle,10,1,Ground_Right ,9 ,5],
        [0,2  ,Ground     ,9 ,3,Ground_Left  ,10,2,Ground_Middle,10,3,Ground_Right,11,2],
        [0,2  ,Ground     ,11,3,Ground_Left  ,10,3,Ground_Middle,10,3,Ground_Right,10,3],
        [0,2  ,Ground     ,10,8,Ground_Left  ,10,4,Ground_Middle,9 ,3,Ground_Right,12,1],
        [0,2  ,Ground     ,10,8,Ground_Left  ,9 ,3,Ground_Middle,12,1,Ground_Right,11,5],
        [0,2  ,Ground     ,9 ,5,Ground_Left  ,10,3,Ground_Middle,12,3,Ground_Right,11,3],
        [0,100,Ground_Left,12,2,Ground_Middle,13,1,Ground_Right ,11,2]
    ],
    [   //4 Grassland 3
        [0,2  ,Ground     ,15,3,Ground_Middle,14,1,Ground_Right ,14,1],
        [0,2  ,Ground     ,15,3,Ground_Left  ,16,1,Ground_Middle,14,1,Ground_Right,14,1],
        [0,2  ,Ground_Left,15,3,Ground_Middle,16,3,Ground_Right ,14,3],
        [0,2  ,Ground     ,16,6,Ground_Left  ,14,1,Ground_Middle,14,1,Ground_Right,14,1],
        [0,2  ,Ground     ,15,9,Ground_Right ,17,1],
        [0,2  ,Ground     ,17,1,Ground_Left  ,15,6,Ground_Middle,16,3,Ground_Right,14,3],
        [0,2  ,Ground     ,17,2,Ground_Left  ,14,3,Ground_Middle,14,3,Ground_Right,14,3],
        [0,2  ,Ground     ,17,3,Ground_Left  ,15,6,Ground_Middle,16,3,Ground_Right,16,3],
        [0,100,Ground_Left,15,3,Ground_Middle,18,1,Ground_Right ,15,3]
    ],
    [   //5 Grassland 4
        [0,2  ,Ground     ,19,5 ],
        [0,2  ,Ground     ,19,10],
        [0,2  ,Ground     ,19,15],
        [0,2  ,Ground_Left,19,5 ,Ground_Middle,19,5,Ground_Right ,21,1 ],
        [0,2  ,Ground     ,19,10,Ground_Middle,20,3],
        [0,2  ,Ground     ,19,10,Ground_Left  ,21,1,Ground_Middle,20,2 ,Ground_Right,21,1],
        [0,2  ,Ground     ,19,5 ,Ground_Left  ,19,3,Ground_Middle,20,3 ,Ground_Right,21,3],
        [0,100,Ground_Left,19,2 ,Ground_Middle,19,6,Ground_Right ,22,12]
    ],
    [   //6 Grassland 5
        [0,2  ,Ground       ,23,6],
        [0,2  ,Ground       ,23,8 ,Ground_Middle,24,3],
        [0,2  ,Ground       ,24,6 ,Ground_Left  ,23,2,Ground_Middle,23,2,Ground_Right,23,2],
        [0,2  ,Ground_Middle,24,6 ,Ground_Right ,23,6],
        [0,2  ,Ground       ,23,9 ,Ground_Middle,25,1],
        [0,2  ,Ground       ,23,9 ,Ground_Left  ,25,1,Ground_Middle,25,1,Ground_Right,25,1],
        [0,2  ,Ground       ,23,12,Ground_Left  ,24,3,Ground_Middle,25,2,Ground_Right,25,2],
        [0,2  ,Ground       ,25,6 ,Ground_Left  ,24,3,Ground_Middle,24,3,Ground_Right,24,3],
        [0,100,Ground       ,26,3 ,Ground_Left  ,23,3,Ground_Middle,25,3,Ground_Right,24,3]
    ],
    [   //7 Grassland 6
        [0,2  ,Ground_Middle,27,5,Ground_Right ,28,1],
        [0,2  ,Ground       ,27,5,Ground_Left  ,28,1,Ground_Middle,28,1,Ground_Right,28,1],
        [0,2  ,Ground       ,27,5,Ground_Left  ,29,1,Ground_Middle,29,1,Ground_Right,29,1],
        [0,2  ,Ground       ,28,5,Ground_Left  ,29,1,Ground_Middle,29,1,Ground_Right,29,1],
        [0,2  ,Ground_Left  ,27,5,Ground_Middle,28,3,Ground_Right ,29,2],
        [0,2  ,Ground       ,27,9,Ground_Middle,27,9],
        [0,2  ,Ground       ,28,5,Ground_Middle,29,5],
        [0,100,Ground       ,28,5,Ground_Left  ,29,2,Ground_Middle,30,1,Ground_Right,29,2]
    ],
    [   //8 Grassland 7
        [0,2  ,Ground_Middle,32,1,Ground_Right ,32,2],
        [0,2  ,Ground       ,31,3,Ground_Left  ,32,1,Ground_Middle,32,2,Ground_Right,32,2],
        [0,2  ,Ground_Left  ,31,3,Ground_Middle,32,2,Ground_Right ,32,3],
        [0,2  ,Ground       ,31,5,Ground_Middle,33,2],
        [0,2  ,Ground       ,32,8,Ground_Middle,33,1,Ground_Right ,33,2],
        [0,2  ,Ground_Left  ,31,5,Ground_Middle,33,4,Ground_Right ,33,3],
        [0,2  ,Ground       ,31,8,Ground_Left  ,32,2,Ground_Middle,32,3,Ground_Right,33,4],
        [0,100,Ground_Left  ,32,3,Ground_Middle,33,3,Ground_Right ,34,1]
    ],
    [   //9 Castle Gate
        [1,1  ,Ground_Middle,35,10,Ground_Right ,36,1],
        [1,1  ,Ground_Left  ,35,1 ,Ground_Middle,35,15,Ground_Right ,36,1 ],
        [1,1  ,Ground       ,35,15,Ground_Left  ,37,1 ,Ground_Middle,37,1 ,Ground_Right,37,1],
        [1,1  ,Ground       ,35,15,Ground_Left  ,36,1 ,Ground_Middle,36,1 ,Ground_Right,36,1],
        [1,1  ,Ground       ,37,5 ,Ground_Left  ,36,2 ,Ground_Middle,35,10,Ground_Right,36,2],
        [1,100,Ground       ,36,3 ,Ground_Middle,38,1 ]
    ],
    [   //10 Castle
        [1,100,Ground      ,39,0],
        [1,100,Ground_Right,39,1]
    ],
    [   //11 Hill Country 1
        [2,3  ,Ground_Middle,41,1,Ground       ,42,3],
        [2,3  ,Ground_Middle,41,1,Ground_Middle,42,6],
        [2,3  ,Ground_Middle,41,1,Ground_Right ,43,6],
        [2,3  ,Ground       ,41,2,Ground       ,43,5],
        [2,3  ,Ground       ,41,3,Ground       ,42,9],
        [2,3  ,Ground       ,41,3,Ground       ,42,9,Ground,43,6],
        [2,100,Ground_Middle,44,1,Ground_Middle,43,6]
    ],
    [   //12 Hill Country 2
        [2,3  ,Ground_Middle,45,1,Ground       ,46,3],
        [2,3  ,Ground_Middle,45,1,Air_Water    ,46,5],
        [2,3  ,Ground_Middle,45,1,Ground       ,47,5],
        [2,3  ,Ground       ,45,2,Ground       ,47,9],
        [2,3  ,Air_Water    ,45,3,Air_Water    ,46,6],
        [2,3  ,Air_Water    ,45,2,Air_Water    ,46,6,Ground,47,5],
        [2,100,Ground_Right ,48,1,Ground_Middle,45,2]
    ],
    [   //13 Hill Country 3
        [2,3  ,Ground       ,49,1,Ground       ,50,1],
        [2,3  ,Ground       ,49,1,Ground       ,51,5],
        [2,3  ,Ground       ,50,1,Ground       ,51,5],
        [2,3  ,Ground       ,49,1,Ground       ,50,1,Ground       ,51,9],
        [2,100,Ground_Middle,52,1,Ground_Middle,49,2,Ground_Middle,50,2]
    ],
    [   //14 Lake
        [0,4  ,Water,53,10,Water ,55,5 ],
        [0,4  ,Water,53,20,Water ,55,5 ],
        [0,4  ,Water,53,15,Ground,54,10],
        [0,4  ,Water,55,8 ,Ground,54,10],
        [0,4  ,Water,53,30,Water ,55,5 ],
        [0,4  ,Water,53,30,Ground,54,5 ],
        [0,4  ,Water,53,20,Ground,54,5 ,Water,55,5],
        [0,101,Water,56,1 ,Ground,54,5 ,Water,55,5]
    ],
    [   //15 Forest 1
        [3,1  ,Ground       ,58,3 ],
        [3,1  ,Ground       ,58,4 ,Ground       ,57,5 ],
        [3,1  ,Ground       ,58,5 ,Ground       ,59,5 ],
        [3,1  ,Ground       ,58,5 ,Ground_Middle,57,5 ,Ground_Left,59,5],
        [3,1  ,Ground_Middle,57,8 ,Ground_Right ,59,8 ],
        [3,1  ,Ground       ,58,15,Ground       ,57,1 ,Ground     ,59,1],
        [3,1  ,Ground       ,58,6 ,Ground       ,57,6 ,Ground     ,59,6],
        [3,100,Ground_Middle,60,3 ,Ground       ,58,10]
    ],
    [   //16 Forest 2
        [3,1  ,Ground       ,62,3 ,Ground   ,61,2],
        [3,1  ,Ground       ,62,4 ,Ground   ,63,3],
        [3,1  ,Ground       ,62,5 ,Air_Water,61,5],
        [3,1  ,Ground       ,62,5 ,Air_Water,63,5],
        [3,1  ,Air_Water    ,61,5 ,Air_Water,63,5],
        [3,1  ,Ground       ,62,15,Air_Water,61,1,Air_Water,63,1],
        [3,1  ,Ground       ,62,6 ,Air_Water,61,6,Air_Water,63,6],
        [3,100,Ground_Middle,64,1 ,Ground   ,62,3,Air_Water,61,1,Air_Water,63,1]
    ],
    [   //17 Cavern 1
        [4,5  ,Water        ,69,1,Ground       ,65,5],
        [4,5  ,Water        ,69,1,Ground       ,65,5,Ground_Middle,66,5],
        [4,5  ,Water        ,69,1,Ground       ,65,5,Ground_Right ,67,5],
        [4,5  ,Water        ,69,1,Ground_Middle,66,5,Ground_Middle,65,5],
        [4,5  ,Water        ,69,1,Ground_Left  ,66,5,Ground_Middle,65,5,Ground_Right,67,5],
        [4,5  ,Water        ,69,1,Ground       ,66,6,Ground       ,65,6,Ground      ,67,6],
        [4,102,Ground_Middle,68,1]
    ],
    [   //18 Cavern 2
        [4,5  ,Water        ,74,1,Ground       ,70,8],
        [4,5  ,Water        ,74,1,Ground       ,70,8,Ground       ,71,5],
        [4,5  ,Water        ,74,1,Ground       ,70,8,Ground       ,72,5],
        [4,5  ,Water        ,74,1,Ground_Middle,71,8,Ground       ,72,5],
        [4,5  ,Water        ,74,1,Ground_Left  ,70,6,Ground_Middle,71,6,Ground_Right,72,6],
        [4,5  ,Water        ,74,1,Ground       ,70,8,Ground       ,71,8,Ground      ,72,8],
        [4,102,Ground_Middle,73,1,Ground       ,71,8]
    ],
    [   //19 Cavern 3
        [4,5  ,Water        ,79,1,Ground       ,75,5,Ground_Middle,76,1],
        [4,5  ,Water        ,79,1,Ground       ,75,5,Ground       ,77,2],
        [4,5  ,Water        ,79,1,Ground       ,75,5,Air_Water    ,76,5],
        [4,5  ,Water        ,79,1,Ground_Middle,75,4,Ground_Middle,76,4,Ground_Middle,77,2],
        [4,5  ,Water        ,79,1,Ground       ,75,5,Air_Water    ,76,5,Ground       ,77,3],
        [4,102,Ground_Middle,78,2,Ground_Right ,78,3,Ground_Middle,77,5,Ground_Right ,77,10]
    ],
    [   //20 Village
        [0,0  ,Ground,80,0],
        [0,100,Ground,80,0]
    ],
    [   //21 Seaside 1
        [0,6  ,Ground      ,80,10,Ground_Middle,83,2],
        [0,6  ,Ground      ,81,10,Ground       ,83,5],
        [0,6  ,Ground      ,80,12,Ground_Middle,83,3,Ground_Right ,82,1],
        [0,6  ,Ground      ,83,12,Ground       ,81,5,Ground_Middle,82,1],
        [0,6  ,Ground_Left ,80,8 ,Ground_Middle,81,8,Ground_Right ,83,8,Ground,82,5],
        [0,100,Ground_Right,84,1 ]
    ],
    [   //22 Seaside 2
        [0,6  ,Ground      ,85,15,Ground_Middle,86,1],
        [0,6  ,Ground      ,85,15,Ground_Middle,86,2,Air_Water,87,5 ,Air_Water,88,1],
        [0,6  ,Air_Water   ,87,20,Air_Water    ,88,2],
        [0,6  ,Ground      ,85,15,Ground_Middle,86,1,Air_Water,87,15,Air_Water,88,1],
        [0,6  ,Ground      ,85,10,Ground_Middle,86,4,Air_Water,87,5 ,Air_Water,88,4],
        [0,100,Ground_Right,89,1 ]
    ],
    [   //23 Seaside 3
        [0,6  ,Ground_Middle,92,1 ,Ground_Middle,92,2 ],
        [0,6  ,Ground_Middle,90,15,Ground_Middle,92,1 ],
        [0,6  ,Ground       ,91,15,Ground_Middle,91,5 ,Ground_Middle,92,1],
        [0,6  ,Air_Water    ,91,15,Ground_Middle,92,1 ],
        [0,6  ,Ground_Middle,90,15,Air_Water    ,91,10,Ground_Middle,92,1],
        [0,100,Ground_Right ,93,1]
    ],
    [   //24 Seaside 4
        [0,6  ,Ground_Middle,94,10,Ground_Right ,94,10,Ground_Right ,96,5],
        [0,6  ,Air_Water    ,95,20,Ground       ,96,5 ],
        [0,6  ,Ground       ,94,30,Air_Water    ,95,30,Ground       ,96,5],
        [0,6  ,Ground_Middle,94,30,Air_Water    ,95,30,Ground_Middle,96,5],
        [0,100,Ground_Middle,97,1 ,Ground_Middle,96,20]
    ],
    [   //25 Submarine 1
        [4,4  ,Water        ,99 ,10,Water       ,100,1 ],
        [4,4  ,Water        ,98 ,10,Water       ,99 ,10,Water,100,1],
        [4,4  ,Ground_Left  ,98 ,10,Ground_Right,98 ,10,Water,100,1],
        [4,4  ,Water        ,99 ,20,Water       ,100,5 ],
        [4,4  ,Ground_Middle,98 ,10,Water       ,98 ,10,Water,99 ,5,Water,100,2],
        [4,101,Water        ,101,1 ]
    ],
    [   //26 Submarine 2
        [4,4  ,Ground       ,102,20,Water        ,103,3],
        [4,4  ,Ground       ,102,30,Ground       ,104,3],
        [4,4  ,Ground_Middle,102,20,Water        ,103,3,Ground_Right,104,3],
        [4,4  ,Ground       ,102,20,Water        ,103,8,Ground_Right,104,5],
        [4,101,Ground       ,102,50,Ground_Middle,105,1]
    ],
    [   //27 Submarine 3
        [4,4  ,Water,106,10,Water,107,3 ],
        [4,4  ,Water,106,20,Water,108,2 ],
        [4,4  ,Water,106,20,Water,107,5 ,Water,108,1],
        [4,4  ,Water,106,15,Water,107,10,Water,108,1],
        [4,4  ,Water,106,35,Water,108,3 ],
        [4,101,Water,109,5 ]
    ],
    [   //28 Submarine 4
        [4,4  ,Water,111,10,Water,112,1],
        [4,4  ,Water,111,20,Water,112,1],
        [4,4  ,Water,110,30,Water,112,1],
        [4,4  ,Water,111,20,Water,112,2],
        [4,101,Water,113,1 ,Water,112,2,Water,111,10]
    ],
    [   //29 Submarine Shrine
        [1,101,Water,114,0],
        [1,101,Water,114,1]
    ],
    [   //30 Mist Grove 1
        [3,2  ,Ground       ,116,5 ,Air_Water    ,118,3 ],
        [3,2  ,Ground       ,116,12,Ground       ,117,12],
        [3,2  ,Ground_Middle,116,10,Ground       ,116,5 ,Air_Water,118,5],
        [3,2  ,Ground       ,117,12,Air_Water    ,118,8 ],
        [3,2  ,Ground       ,116,10,Ground_Middle,117,10,Air_Water,118,5],
        [3,100,Ground_Middle,119,1 ,Air_Water    ,118,3 ]
    ],
    [   //31 Mist Grove 2
        [3,2  ,Ground_Right ,122,1,Ground,120,5 ],
        [3,2  ,Ground_Right ,122,3,Ground,120,10],
        [3,2  ,Ground_Right ,122,5,Ground,121,10,Ground_Right,120,10],
        [3,100,Ground_Middle,123,1,Ground,120,10]
    ],
    [   //32 Mist Grove 3
        [3,3  ,Ground       ,124,20],
        [3,3  ,Ground       ,125,20],
        [3,3  ,Ground       ,126,20],
        [3,2  ,Ground       ,124,10,Ground,125,5 ,Ground       ,126,5],
        [3,2  ,Ground_Right ,124,10,Ground,125,10,Ground_Middle,126,5],
        [3,3  ,Ground_Middle,124,30],
        [3,100,Ground_Middle,127,1 ]
    ],
    [   //33 ???
        [3,1  ,Ground,128,10],
        [3,1  ,Ground,128,50],
        [3,100,Ground,128,99,Ground,129,1]
    ],
    [   //34 Desert 1
        [5,7  ,Ground       ,130,10,Ground       ,132,1 ],
        [5,7  ,Ground       ,130,15,Ground       ,131,15,Ground_Right,132,2],
        [5,7  ,Ground       ,131,30,Ground       ,132,2 ],
        [5,7  ,Ground_Middle,130,30,Ground_Right ,132,3 ],
        [5,7  ,Ground       ,130,20,Ground_Middle,131,20,Ground      ,132,3],
        [5,100,Ground_Middle,133,1 ,Ground_Right ,132,5 ]
    ],
    [   //35 Desert 2
        [5,7  ,Ground       ,134,10,Air_Water    ,135,1 ],
        [5,7  ,Ground       ,134,30,Ground_Middle,136,5 ,Air_Water,135,3],
        [5,7  ,Air_Water    ,134,10,Ground       ,136,10,Air_Water,135,2],
        [5,7  ,Ground_Middle,134,10,Ground_Middle,136,5 ,Air_Water,135,4],
        [5,7  ,Air_Water    ,134,30,Ground_Middle,136,5 ,Air_Water,135,3],
        [5,100,Ground_Middle,137,1 ,Ground_Middle,135,2 ]
    ],
    [   //36 Desert 3
        [5,7  ,Ground_Left  ,138,5 ,Ground_Middle,139,5 ,Ground_Right,140,1 ],
        [5,7  ,Ground_Middle,139,10,Ground_Right ,138,10,Ground      ,140,2 ],
        [5,7  ,Ground       ,138,25,Ground_Middle,140,3 ],
        [5,7  ,Ground       ,139,25,Ground_Middle,140,3 ],
        [5,7  ,Ground_Left  ,138,15,Ground_Middle,140,3 ,Ground_Right,139,15],
        [5,7  ,Ground_Middle,139,20,Ground       ,140,5 ],
        [5,100,Ground       ,141,5 ,Ground       ,138,30]
    ],
    [   //37 Desert 4
        [5,7  ,Ground       ,143,10,Ground_Middle,142,3 ],
        [5,7  ,Ground       ,143,15,Ground_Middle,142,3 ,Ground_Middle,144,3 ],
        [5,7  ,Ground_Middle,143,1 ,Air_Water    ,142,20,Ground_Middle,144,5 ],
        [5,7  ,Ground_Middle,143,1 ,Air_Water    ,142,10,Ground       ,144,15],
        [5,7  ,Ground_Left  ,143,10,Air_Water    ,142,10,Ground_Middle,144,10],
        [5,100,Ground_Middle,145,1 ,Ground       ,143,8 ]
    ],
    [   //38 Desert 5
        [5,7  ,Ground_Middle,146,1 ,Ground_Right ,147,1 ,Water,148,1 ],
        [5,7  ,Ground       ,146,3 ,Water        ,148,2 ],
        [5,7  ,Ground       ,147,3 ,Water        ,148,3 ],
        [5,7  ,Ground       ,146,2 ,Ground       ,147,2 ,Water,148,3 ],
        [5,7  ,Ground_Middle,146,1 ,Ground_Middle,147,1 ,Water,148,30],
        [5,100,Ground_Middle,149,25,Ground_Right ,149,25]
    ],
    [   //39 Oasis
        [5,4  ,Water      ,150,10,Ground_Middle,151,10],
        [5,4  ,Water      ,151,10,Ground_Middle,152,10],
        [5,4  ,Water      ,152,10,Ground_Middle,150,10],
        [5,4  ,Ground_Left,150,10,Ground_Middle,151,10,Ground_Right,152,10],
        [5,4  ,Water      ,150,10,Water        ,151,10,Water       ,152,10],
        [5,101,Water      ,153,1 ]
    ],
    [   //40 Desert 6
        [5,7  ,Ground       ,154,3 ,Air_Water    ,155,2 ,Ground_Right ,156,1],
        [5,7  ,Ground       ,154,15,Ground_Middle,154,10,Ground_Middle,156,1],
        [5,7  ,Air_Water    ,155,20,Ground_Middle,156,1 ],
        [5,7  ,Ground       ,154,15,Air_Water    ,155,15,Ground       ,156,2],
        [5,7  ,Ground_Left  ,154,15,Air_Water    ,155,15,Ground       ,156,2],
        [5,100,Ground_Middle,157,1 ]
    ],
    [   //41 Desert 7
        [5,7  ,Ground_Left  ,158,10,Ground_Middle,160,1 ,Ground_Right,158,10],
        [5,7  ,Air_Water    ,159,20,Ground_Middle,160,2 ],
        [5,7  ,Ground_Left  ,158,10,Air_Water    ,159,20,Ground      ,160,3 ],
        [5,7  ,Ground_Middle,159,20,Ground_Middle,160,5 ],
        [5,100,Ground_Middle,161,1 ,Ground       ,160,5 ]
    ],
    [   //42 Pyramid
        [5,102,Ground_Middle,162,0],
        [5,102,Ground_Middle,162,1]
    ],
    [   //43 Desert 8
        [5,2  ,Ground_Left  ,164,10,Ground_Right,165,1],
        [5,2  ,Ground       ,165,2 ],
        [5,2  ,Ground       ,164,30,Ground      ,166,3],
        [5,2  ,Ground_Left  ,164,10,Ground_Right,165,1,Ground,166,3],
        [5,100,Ground_Middle,167,1 ,Ground_Right,165,1]
    ],
    [   //44 Beach 1
        [5,8  ,Ground       ,168,15,Air_Water,169,3],
        [5,8  ,Ground       ,168,20,Water    ,170,1],
        [5,8  ,Ground       ,168,20,Air_Water,169,5,Water,170,2],
        [5,8  ,Air_Water    ,169,30,Water    ,170,2],
        [5,8  ,Ground       ,168,10,Air_Water,169,5,Water,170,3],
        [5,101,Ground_Middle,171,1 ,Water    ,170,3]
    ],
    [   //45 Beach 2
        [5,8  ,Air_Water,172,5 ,Air_Water,173,5 ,Air_Water,174,1 ],
        [5,8  ,Air_Water,172,20,Air_Water,174,3 ],
        [5,8  ,Air_Water,173,20,Air_Water,174,3 ],
        [5,8  ,Air_Water,172,10,Air_Water,173,10,Air_Water,174,3 ],
        [5,8  ,Air_Water,173,3 ,Air_Water,173,3 ,Air_Water,174,15],
        [5,101,Air_Water,175,10]
    ],
    [   //46 Beach 3
        [5,8  ,Water        ,177,10,Ground,178,10],
        [5,8  ,Ground_Middle,176,1 ,Water ,177,10],
        [5,8  ,Ground_Middle,176,1 ,Ground,178,10],
        [5,8  ,Ground_Middle,176,1 ,Water ,177,10,Ground,178,10],
        [5,101,Ground_Middle,176,2 ,Water ,179,1]
    ],
    [   //47 Junk Shop
        [0,0  ,Ground,180,0],
        [0,100,Ground,180,0]
    ],
    [   //48 Cavern 4
        [4,9  ,Ground       ,180,20,Water ,184,1 ],
        [4,9  ,Ground       ,180,30,Ground,181,3 ,Water ,184,2],
        [4,9  ,Ground       ,180,40,Ground,182,3 ,Water ,184,3],
        [4,9  ,Ground       ,180,50,Ground,181,3 ,Ground,182,3],
        [4,9  ,Ground       ,180,60,Water ,184,10],
        [4,103,Ground_Middle,183,1 ,Ground,180,20]
    ],
    [   //49 Cavern 6
        [4,9  ,Ground      ,185,30,Ground_Middle,186,3 ],
        [4,9  ,Ground      ,185,40,Ground       ,186,10,Ground_Right ,187,1],
        [4,9  ,Ground      ,185,40,Ground_Middle,186,20,Ground_Middle,187,1],
        [4,9  ,Ground      ,185,70,Ground_Middle,187,1 ,Ground_Right ,187,1],
        [4,9  ,Ground      ,185,40,Water        ,189,1 ],
        [4,103,Ground_Right,188,1 ,Ground       ,186,5 ]
    ],
    [   //50 Cavern 6
        [4,9  ,Ground       ,190,80,Water,194,1],
        [4,9  ,Ground       ,191,80,Water,194,1],
        [4,9  ,Ground       ,192,80,Water,194,1],
        [4,103,Ground_Middle,193,1 ]
    ],
    [   //51 Snowfield 1
        [7,3  ,Ground_Right ,195,30,Ground_Middle,196,1],
        [7,3  ,Ground_Right ,195,30,Ground_Middle,197,3],
        [7,3  ,Ground       ,195,50,Ground_Middle,196,3,Ground_Middle,197,3],
        [7,3  ,Ground_Right ,195,50,Ground_Middle,196,3,Ground_Middle,197,3],
        [7,100,Ground_Middle,198,1 ,Ground_Middle,197,3]
    ],
    [   //52 Snowfield 2
        [7,3  ,Ground       ,199,30,Ground_Middle,200,2 ],
        [7,3  ,Ground       ,199,40,Ground_Middle,201,2 ],
        [7,3  ,Ground_Middle,200,20,Ground_Middle,201,2 ],
        [7,3  ,Ground       ,199,20,Ground_Middle,200,10,Ground_Right,201,2],
        [7,3  ,Ground       ,201,5 ],
        [7,100,Ground_Middle,202,1 ,Ground       ,199,90]
    ],
    [   //53 Mountain 1
        [3,10 ,Ground       ,203,30,Ground_Middle,205,1 ],
        [3,10 ,Ground       ,204,30,Ground_Middle,205,1 ],
        [3,10 ,Ground       ,205,5 ],
        [3,10 ,Ground       ,203,20,Ground_Middle,204,20,Ground      ,205,1],
        [3,100,Ground_Middle,206,1 ,Ground_Left  ,203,5 ,Ground_Right,204,5]
    ],
    [   //54 Mountain 2
        [4,10 ,Air_Water    ,207,30,Ground_Right ,208,30],
        [4,10 ,Air_Water    ,207,50,Ground_Middle,208,10,Ground_Right,209,1 ],
        [4,10 ,Air_Water    ,207,10,Ground       ,208,50,Ground_Right,209,1 ],
        [4,10 ,Air_Water    ,207,10,Ground       ,208,10,Ground      ,209,3 ],
        [4,100,Ground_Middle,210,1 ,Air_Water    ,207,10,Ground      ,208,10]
    ],
    [   //55 Mountaintop
        [0,1  ,Ground_Middle,4  ,1,Ground_Left  ,8  ,1,Air_Water    ,13 ,1,Air_Water    ,18 ,1,Ground_Left,22 ,1,Ground_Middle,26 ,1,Ground_Middle,30 ,1,Ground_Right ,34 ,1],
        [2,10 ,Ground_Middle,44 ,1,Air_Water    ,48 ,1,Ground_Middle,52 ,1,Ground_Middle,38 ,1],
        [3,10 ,Ground_Middle,60 ,1,Ground_Middle,64 ,1,Ground_Right ,68 ,1,Air_Water    ,73 ,1,Ground_Left,78 ,1],
        [0,8  ,Ground_Middle,84 ,1,Ground_Middle,89 ,1,Air_Water    ,93 ,1,Ground_Middle,97 ,1],
        [4,101,Water        ,56 ,1,Water        ,101,1,Ground_Middle,105,1,Water        ,109,1,Water      ,113,1,Water        ,153,1],
        [3,1  ,Ground_Left  ,119,1,Ground_Right ,123,1,Ground_Middle,127,1],
        [5,1  ,Ground_Middle,133,1,Ground_Middle,137,1,Ground       ,141,1,Ground_Right ,145,1,Ground_Left,149,1,Ground_Right ,157,1,Ground_Left  ,161,1,Ground_Middle,167,1],
        [5,8  ,Ground_Middle,171,1,Air_Water    ,175,1,Water        ,179,1],
        [4,103,Air_Water    ,183,1,Ground_Middle,188,1,Ground_Middle,193,1],
        [1,100,Air_Water    ,211,1,Air_Water    ,212,1,Air_Water    ,213,1,Air_Water    ,214,1]
    ],
    [   //56 Snowfield 3
        [7,3  ,Ground_Left  ,215,3 ,Ground_Right,216,3 ,Ground_Middle,217,3],
        [7,3  ,Air_Water    ,215,80,Ground      ,217,1 ],
        [7,3  ,Ground       ,216,80,Ground      ,217,1 ],
        [7,3  ,Air_Water    ,215,40,Ground      ,216,40,Ground       ,217,2],
        [7,100,Ground_Middle,218,1 ,Ground_Right,217,1 ]
    ],
    [   //57 Snowfield 4
        [7,3  ,Ground_Left  ,219,1,Ground_Middle,220,1,Ground_Right ,219,1],
        [7,3  ,Ground_Left  ,221,1,Ground_Middle,220,1,Ground_Right ,221,1],
        [7,3  ,Ground       ,221,3,Ground_Middle,219,1],
        [7,3  ,Ground_Middle,219,1,Ground       ,220,3,Ground_Middle,221,1],
        [7,100,Ground_Left  ,221,1,Ground_Middle,220,1,Ground_Right ,219,1,Ground_Middle,222,1]
    ],
    [   //58 Snowfield 5
        [7,1  ,Air_Water    ,223,50,Ground_Middle,225,1 ],
        [7,1  ,Air_Water    ,224,50,Ground_Middle,225,1 ],
        [7,1  ,Air_Water    ,223,20,Air_Water    ,224,20,Ground,225,2],
        [7,100,Ground_Middle,226,1 ]
    ],
    [   //59 Snowfield 6
        [7,1  ,Ground_Middle,227,30],
        [7,1  ,Ground_Middle,229,15,Ground_Right ,227,30],
        [7,1  ,Ground       ,228,50],
        [7,1  ,Ground       ,228,30,Ground_Middle,227,30],
        [7,1  ,Ground       ,228,10,Ground_Middle,229,30,Ground_Right,227,10],
        [7,100,Ground_Right ,230,30]
    ],
    [   //60 Snowfield 7
        [7,1  ,Ground_Middle,232,1,Ground,231,5 ],
        [7,1  ,Ground_Middle,232,1,Ground,231,50],
        [7,1  ,Ground_Middle,232,2,Ground,231,15],
        [7,100,Ground_Middle,234,1,Ground,233,99]
    ],
    [   //61 Snowfield 8
        [7,1  ,Ground       ,235,50,Ground_Middle,237,1 ],
        [7,1  ,Ground       ,236,50,Ground_Middle,237,1 ],
        [7,1  ,Ground_Left  ,237,1 ,Ground_Middle,237,1 ,Ground_Right,237,1],
        [7,1  ,Ground_Middle,235,30,Ground_Middle,236,30,Ground_Right,237,1],
        [7,100,Ground_Left  ,238,1 ,Ground_Middle,238,1 ,Ground_Right,238,1]
    ],
    [   //62 Frozen Lake
        [8,100,Air_Water    ,239,5,Ground       ,241,3],
        [8,100,Ground       ,240,2,Ground       ,241,5],
        [8,100,Air_Water    ,239,5,Ground_Middle,240,5],
        [8,100,Air_Water    ,239,5,Ground_Right ,240,1,Ground,241,5],
        [8,100,Ground_Middle,242,1]
    ],
    [   //63 Ice Castle
        [7,102,Ground_Middle,243,0],
        [7,102,Ground_Middle,243,1]
    ],
    [   //64 Snowfield 9
        [7,6  ,Ground       ,247,30],
        [7,6  ,Ground_Left  ,245,20,Ground_Middle,247,20],
        [7,6  ,Ground       ,245,20,Air_Water    ,246,30],
        [7,6  ,Ground       ,245,20,Air_Water    ,246,20,Ground_Right,247,20],
        [7,100,Ground_Middle,248,1 ]
    ],
    [   //65 Beach 4
        [7,8  ,Water ,249,30,Ground_Right ,251,1 ],
        [7,8  ,Water ,249,50,Ground_Right ,251,3 ],
        [7,8  ,Ground,250,40,Ground_Right ,251,1 ],
        [7,8  ,Water ,249,30,Ground_Middle,250,30,Ground_Right,251,2],
        [7,101,Water ,252,1 ,Water        ,251,3 ]
    ],
    [   //66 Forest 3
        [9,1  ,Ground_Middle,253,30,Air_Water,255,1 ],
        [9,1  ,Ground       ,254,30,Air_Water,255,1 ],
        [9,1  ,Ground_Middle,253,20,Ground   ,254,20,Air_Water,255,1],
        [9,1  ,Ground_Left  ,253,10,Ground   ,254,10,Air_Water,255,3],
        [9,100,Air_Water    ,256,1 ,Air_Water,255,1 ]
    ],
    [   //67 Forest 4
        [9,1  ,Ground_Middle,258,1 ],
        [9,1  ,Ground       ,258,10],
        [9,100,Ground_Middle,259,1 ]
    ],
    [   //68 Forest 5
        [9,1  ,Ground       ,262,30,Ground_Middle,260,30],
        [9,1  ,Ground       ,260,30,Ground_Middle,261,30],
        [9,1  ,Ground       ,262,30,Ground_Middle,261,30],
        [9,100,Ground_Middle,263,1 ,Ground_Right ,260,2 ,Ground_Right,261,2,Ground_Right,262,2]
    ],
    [   //69 Forest 6
        [9,1  ,Ground_Middle,264,1,Air_Water   ,265,80],
        [9,1  ,Ground_Middle,264,1,Ground      ,266,80],
        [9,1  ,Ground_Middle,264,1,Air_Water   ,265,40,Ground,266,40],
        [9,100,Ground_Middle,267,1,Ground_Right,264,1 ]
    ],
    [   //70 Forget Tree
        [9,0  ,Ground,268,0],
        [9,100,Ground,268,0]
    ],
    [   //71 !!!
        [4,101,Air_Water,268,30],
        [4,101,Air_Water,268,60],
        [4,101,Air_Water,268,99,Air_Water,269,1]
    ],
    [   //72 Hell 1
        [10,1  ,Ground_Middle,270,20,Ground_Right ,271,1 ],
        [10,1  ,Ground       ,270,40,Ground_Middle,271,1 ,Ground_Right,271,1],
        [10,1  ,Ground       ,270,40,Ground_Middle,271,1 ,Ground_Right,272,1],
        [10,1  ,Ground       ,270,40,Ground_Middle,272,1 ,Ground_Right,272,1],
        [10,1  ,Ground       ,270,10,Ground       ,271,3 ,Ground      ,272,3],
        [10,1  ,Ground_Middle,270,60],
        [10,100,Ground_Middle,273,1 ,Ground       ,270,30]
    ],
    [   //73 Hell 2
        [10,11 ,Air_Water    ,274,50,Ground_Middle,276,1],
        [10,11 ,Air_Water    ,274,50,Ground_Middle,275,1],
        [10,11 ,Ground       ,274,50,Ground_Right ,276,1,Ground_Middle,275,1],
        [10,11 ,Ground       ,274,50,Ground       ,275,2],
        [10,11 ,Ground       ,274,50,Ground_Left  ,276,1,Ground_Right ,276,1],
        [10,100,Ground_Middle,274,50,Ground_Middle,277,1]
    ],
    [   //74 Hell 3
        [10,11 ,Ground_Middle,279,1,Ground_Left ,278,10,Ground_Right ,280,10],
        [10,11 ,Ground       ,279,2,Ground      ,278,40],
        [10,11 ,Ground       ,279,2,Ground      ,280,60],
        [10,11 ,Ground       ,279,2,Ground      ,278,30,Ground       ,280,20],
        [10,100,Ground_Left  ,279,1,Ground_Right,279,1 ,Ground_Middle,281,1 ]
    ],
    [   //75 Hell 4
        [10,10 ,Ground_Middle,282,10,Ground_Right ,282,10],
        [10,10 ,Ground       ,283,30,Ground_Middle,282,10],
        [10,10 ,Ground       ,282,30,Ground       ,284,5 ],
        [10,10 ,Ground       ,283,30,Ground       ,284,5 ],
        [10,10 ,Ground       ,284,10,Ground_Middle,282,5 ,Ground_Right ,283,5],
        [10,100,Ground_Middle,285,1 ,Ground_Left  ,282,3 ,Ground_Middle,284,3,Ground_Right,283,3]
    ],
    [   //76 Hell 5
        [10,1  ,Ground_Left,286,1,Ground_Middle,286,1,Ground_Right,286,2],
        [10,1  ,Ground_Left,287,1,Ground_Middle,287,1,Ground_Right,287,2],
        [10,1  ,Ground_Left,288,1,Ground_Middle,288,1,Ground_Right,288,2],
        [10,1  ,Ground     ,286,3,Ground       ,287,3],
        [10,1  ,Ground     ,287,3,Ground       ,288,2],
        [10,1  ,Ground     ,288,3,Ground       ,286,3],
        [10,100,Ground_Left,286,1,Ground_Middle,287,1,Ground_Right,288,1,Ground,289,5]
    ],
    [   //77 Island
        [0,0  ,Ground,290,0],
        [0,100,Ground,290,0]
    ],
    [   //78 Hell 6
        [10,1  ,Air_Water    ,290,60,Ground_Middle,291,5],
        [10,1  ,Air_Water    ,290,60,Ground_Middle,292,2],
        [10,1  ,Air_Water    ,291,60,Ground_Middle,292,2],
        [10,1  ,Air_Water    ,292,10,Air_Water    ,290,2,Air_Water,291,2],
        [10,100,Ground_Middle,293,1 ,Air_Water    ,290,1,Air_Water,291,1,Air_Water,292,1]
    ],
    [   //79 Inferno 1
        [11,10 ,Ground       ,294,30,Ground_Middle,296,1 ],
        [11,10 ,Ground       ,295,30,Ground_Middle,296,1 ],
        [11,10 ,Ground_Middle,296,1 ,Ground_Right ,296,1 ],
        [11,10 ,Ground_Middle,294,50,Ground_Right ,295,50],
        [11,10 ,Ground_Left  ,294,20,Ground_Middle,295,20,Ground_Right,296,1],
        [11,100,Ground_Middle,297,1 ]
    ],
    [   //80 Inferno 2
        [11,1  ,Ground_Middle_Clump,298,100],
        [11,1  ,Ground_Middle_Clump,299,100],
        [11,1  ,Ground_Middle_Clump,300,100],
        [11,100,Ground_Left_Clump  ,298,20 ,Ground_Middle_Clump,300,20,Ground_Right_Clump,299,20,Ground_Right,301,1]
    ],
    [   //81 Inferno 3
        [11,1  ,Ground_Right ,302,20,Ground_Middle_Clump,302,20],
        [11,1  ,Ground       ,303,40],
        [11,1  ,Ground_Right ,304,20,Ground_Middle_Clump,304,20],
        [11,1  ,Ground_Left  ,302,15,Ground_Middle      ,304,15,Ground_Right,303,15],
        [11,100,Ground_Middle,305,1 ]
    ],
    [   //82 Blood Lake
        [11,4  ,Water        ,306,10,Ground_Middle,307,5 ],
        [11,4  ,Water        ,306,30,Air          ,308,10],
        [11,4  ,Ground       ,307,20,Air          ,308,10],
        [11,4  ,Water        ,306,10,Ground_Middle,307,5 ,Air,308,40],
        [11,4  ,Water        ,306,30,Ground_Middle,307,10,Air,308,5 ],
        [11,101,Ground_Middle,309,1 ,Air          ,308,10]
    ],
    [   //83 Cavern 7
        [11,9  ,Ground_Middle,310,10,Ceiling_Middle,311,10,Water        ,314,1],
        [11,9  ,Ground       ,310,30,Ceiling_Middle,311,10,Ground_Middle,312,1,Water,314,1],
        [11,9  ,Ground_Middle,310,10,Ceiling       ,311,30,Ground_Middle,312,1,Water,314,1],
        [11,9  ,Ground       ,310,30,Ceiling       ,311,30,Ground       ,312,2,Water,314,1],
        [11,103,Ground       ,312,2 ,Ground_Middle ,313,1 ]
    ],
    [   //84 Cavern 8
        [11,9  ,Ground_Middle,315,10,Ceiling_Middle,316,10,Water        ,319,1],
        [11,9  ,Ground       ,315,30,Ceiling_Middle,316,10,Ground_Middle,317,1,Water,319,1],
        [11,9  ,Ground_Middle,315,20,Ceiling       ,316,20,Ground_Middle,317,1,Water,319,1],
        [11,9  ,Ground       ,315,40,Ceiling       ,316,15,Ground       ,317,2,Water,319,1],
        [11,103,Ground_Middle,318,1 ]
    ],
    [   //85 Hell 7
        [10,1  ,Ground_Middle,320,50,Ground_Right,320,50],
        [10,1  ,Ground_Right ,321,5 ,Ground      ,320,20],
        [10,1  ,Air_Water    ,322,3 ,Ground      ,320,20],
        [10,1  ,Air_Water    ,322,2 ,Air_Water   ,321,3 ,Ground       ,320,20],
        [10,100,Air_Water    ,323,1 ,Air_Water   ,322,1 ,Ground_Middle,321,1 ,Ground_Middle,320,1]
    ],
    [   //86 Hell 8
        [10,11 ,Ground,324,10],
        [10,11 ,Ground,324,50,Air_Water   ,325,1],
        [10,11 ,Ground,324,50,Air_Water   ,326,1],
        [10,11 ,Ground,324,50,Air_Water   ,325,1,Air_Water,326,1],
        [10,100,Ground,324,50,Ground_Right,327,1]
    ],
    [   //87 Hell Gate
        [1,1  ,Ground_Middle,328,10,Ground_Right ,329,1 ],
        [1,1  ,Ground_Left  ,328,1 ,Ground_Middle,328,15,Ground_Right ,329,1 ],
        [1,1  ,Ground       ,328,15,Ground_Left  ,330,1 ,Ground_Middle,330,1 ,Ground_Right,330,1],
        [1,1  ,Ground       ,328,15,Ground_Left  ,329,1 ,Ground_Middle,329,1 ,Ground_Right,329,1],
        [1,1  ,Ground       ,330,5 ,Ground_Left  ,329,2 ,Ground_Middle,328,10,Ground_Right,329,2],
        [1,100,Ground_Middle,331,1 ,Ground       ,329,3 ]
    ],
    [   //88 Hell Castle
        [12,100,Ground_Middle,332,0],
        [12,100,Ground_Middle,332,1]
    ],
    [   //89 Volcano
        [7 ,100,Ground_Middle,198,1  ,Ground_Middle,202,1,Ground_Middle,218,1,Ground_Middle,222,1],
        [7 ,100,Ground_Middle,234,1  ,Ground_Middle,238,1,Ground_Middle,226,1,Ground_Right ,230,1],
        [4 ,100,Ground_Middle,206,1  ,Air_Water    ,210,1],
        [8 ,100,Ground_Middle,242,1  ,Ground_Middle,248,1],
        [9 ,100,Ground_Middle,267,1  ,Air_Water    ,256,1],
        [9 ,100,Ground_Middle,259,1  ,Ground_Middle,263,1],
        [10,100,Ground_Middle,273,1  ,Ground_Right ,277,1,Ground_Middle,281,1],
        [10,100,Ground_Middle,285,1  ,Ground       ,289,1,Ground_Middle,293,1],
        [11,100,Ground_Middle,297,1  ,Ground_Right ,301,1,Ground_Middle,305,1],
        [11,101,Water        ,252,1  ,Water        ,309,1],
        [11,103,Ground_Middle,313,1  ,Ground_Middle,318,1],
        [1 ,100,Ground_Left  ,323,1  ,Ground_Middle,327,1,Ground_Right ,331,1],
        [12,100,Air_Water    ,338,100]
    ],
    []
];
