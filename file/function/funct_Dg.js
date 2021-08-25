function funct_Dg(a){ // original name: Dg()
    var xhr,a,result_text,d;
    Global_Eg = 0;
    for (var b=0; b<100; b++)
        Fg[b] = "";

    try {
        xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function(){
            if (xhr.readyState==4 && xhr.status==200){ // 200 is "OK"
                d = 0;
                for (var c=0; c<xhr.responseText.length; c++){ // for every character in the response string...
                    result_text = xhr.responseText[c];
                    if (result_text=='='){ // set result_text to responseText at current position. If it's an equals sign...
                        for (c+=1; c<xhr.responseText.length; c++){ // add the
                            result_text = xhr.responseText[c];
                            if (result_text==Line_Return)
                                break;
                            Fg[d] += result_text;
                        }
                        d++;
                    } else {
                        for (; c<xhr.responseText.length && xhr.responseText[c]!=Line_Return; c++);
                    }
                }
                Global_Eg = 1;
            } else {
                Global_Eg = -1;
            }
        };
        xhr.open(di,a,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send("");
    }
    catch(d){
        Global_Eg = -2;
    }
}
