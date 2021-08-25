//Randomize(); // Randomizer (based on a mod by Aho)
function Randomize(){
    Beaten2 = 1; // allow user to buy books for unlocked or beaten stages
    Randomizer_Mode = 1;
    var new_book_indexer = [0,0,5,9,14,19,23,27,31,35,39,40,44,48,52,56,60,64,69,74,79,79,84,89,93,97,101,105,109,113,114,118,122,126,128,132,136,140,144,148,152,156,160,161,165,169,173,177,177,182,187,192,196,200,204,208,212,216,220,224,228,232,236,240,241,245,249,253,256,260,264,264,266,270,274,278,282,286,286,290,294,298,302,306,311,316,320,324,328,329,339]; // original name Pe[]
    var enemy_drops = [];
    var randomized_EN_Info = [];
    var extra_attacks = [];
    var en_info_length = EN_Info.length;
    var forest_4_slot = 0;
    var m,b,current_stage,forest_4_spawner;

    // copy drops and bookmark drop slots
    for (var i=0; i<en_info_length-1; i++){
        for (var d=En_Drop1; d<=En_Drop1+4; d+=2){
            if (EN_Info[i][d]!=0 && EN_Info[i][d]!=2){ // skip empty slots and onigiri
                enemy_drops.push(EN_Info[i][d]);
                EN_Info[i][d] = -1;
            }
        }
    }
    shuffle(enemy_drops);
    // re-add drops after shuffling
    for (var i=0; i<en_info_length-1; i++){
        for (var d=En_Drop1; d<=En_Drop1+4; d+=2){
            if (EN_Info[i][d]==-1){
                EN_Info[i][d] = enemy_drops[0];
                enemy_drops.shift();
            }
        }
    }
    // copy enemy arrays
    for (var i=5; i<en_info_length-1; i++){
        if (EN_Info[i][0]!=0)
             randomized_EN_Info.push(EN_Info[i]);
        else extra_attacks.push(EN_Info[i]);
    }
    shuffle(randomized_EN_Info);
    shuffle(extra_attacks);
    // re-add enemy arrays after shuffling, also adjust Book_Indexer to account for secondary attacks
    current_stage = 0;
    for (var i=5; i<en_info_length-1; i++){
        while (new_book_indexer[current_stage+1]<=i)
            current_stage++;
        if (randomized_EN_Info[0][7]==7 || randomized_EN_Info[0][EN_Species]==15 && randomized_EN_Info[0][EN_Size]>1){ // isolate and save the first spawner, it will be used in forest 4
             forest_4_spawner = randomized_EN_Info[0];
             randomized_EN_Info.shift();
        } else {
            EN_Info[i] = randomized_EN_Info[0];
            if (randomized_EN_Info[0][En_2nd_Att] > 0){                   // if enemy has an extra attack
                for (var a=1; a<=randomized_EN_Info[0][En_2nd_Att]; a++){ //  for each extra attack that the enemy should have
                    EN_Info[i+a] = extra_attacks[0];                      //   and add random extra attack
                    extra_attacks.shift();
                }
                for (var b=current_stage+1; b<new_book_indexer.length-1; b++)
                    new_book_indexer[b] += randomized_EN_Info[0][En_2nd_Att];
                i += randomized_EN_Info[0][En_2nd_Att];
            }
            randomized_EN_Info.shift();
        }
        if (current_stage==67 && forest_4_slot==0)
            forest_4_slot = ++i;
    }
    if (forest_4_spawner[EN_Species]==15)
        forest_4_spawner[26]==-1;
    EN_Info[forest_4_slot] = forest_4_spawner;

    Book_Indexer = new_book_indexer;
    // adjust enemy spawns to account for secondary attacks
    m = 0;
    for (var t=0; t<Stage_Spawns.length; t++){
        if (t==11) m++;    // adjust after castle
        if (t==30) m++;    // adjust after submarine shrine
        if (t==43) m++;    // adjust after pyramid
        if (t==64) m++;    // adjust after ice castle
        if (t==89) m += 5; // adjust after hell castle
        for (var s=0; s<Stage_Spawns[t].length; s++){
            for (var g=3; g<Stage_Spawns[t][s].length; g+=3){
                b = 0;
                for (var e=0; e<Stage_Spawns[t][s][g]+b-m; e++)
                    b += EN_Info[e][En_2nd_Att];
                while (EN_Info[Stage_Spawns[t][s][g]+b-m][0]==0) b--; // avoid spawning 2nd attacks
                Stage_Spawns[t][s][g] += b-m;
            }
        }
    }
}
