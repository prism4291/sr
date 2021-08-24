window.AutoSave = saveGame;
function saveGame(save_string_var){ // original name: ue()
    if (save_string_var.length==0 || Save_Code1==0)
        return "";

    Save_Code1 = 0;
    Saving_Text_Timer = 50;
    return getSaveCode("0");
}
