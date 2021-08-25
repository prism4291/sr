function getCode(){
    var save_string = GameSave('0');

    if(save_string!='')
        document.getElementById('inputBox').value = save_string;
}
