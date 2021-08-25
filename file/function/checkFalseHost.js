function checkFalseHost(){ // original name: jf()
    if (Host_Name.length!=Host_Site.length)
        return true;
    for (Check_Host1=0; Check_Host2<Host_Name.length; Check_Host2++){
        if (Host_Name[Check_Host2] != Host_Site[Check_Host2])
            return true;
    }
    return false;
}
