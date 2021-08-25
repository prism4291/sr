function load(){
    document.getElementById('inputBox').value = document.getElementById('inputBox').value.replace(/\x0D\x0A|\x0D|\x0A/g,'');
    var save_string = document.getElementById('inputBox').value;

    if(save_string!='')
        GameLoad(save_string);
}
