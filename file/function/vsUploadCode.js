// VS mode upload code
window.fff = vsUploadCode;
function vsUploadCode(a){ // original name: Ee()
    var b,e;
    var c = "";
    var d = new Int32Array(16);

    b = 0;
    d[b++] = floor(random(64));
    d[b++] = floor(random(64));
    d[b++] = floor(random(64));
    d[b++] = floor(random(64));

    d[b++] = Rank[0];
    d[b++] = Rank[1];

    d[b++] = a;

    d[b++] = VS_Player_Team_ID>>18&63;
    d[b++] = VS_Player_Team_ID>>12&63;
    d[b++] = VS_Player_Team_ID>>6&63;
    d[b++] = VS_Player_Team_ID&63;

    e = 0;
    for (var a=0; a<b; a++)
        e += d[a]*((a&15)+1);

    d[b++] = e>>8&47;
    d[b++] = e>>4&31;
    d[b++] = e>>0&15;

    c = ""+Char_List[d[0]];
    c += Char_List[d[1]];

    e = d[1];

    for (var a=2; a<b; a++){
        c += Char_List[d[a]+e&63];
        e += d[a]+a+d[0];
    }

    return c;
}
