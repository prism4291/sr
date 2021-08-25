function saveCode(){
    var save_html = '';
    save_html += '<table class="ctbl"><tr><td><textarea id="inputBox" rows="1" cols="48" onclick="this.select();"><\/textarea><\/td>';
    save_html += '<td><input type="submit" value="Get" onclick="getCode()" onmousedown="document.getElementById(\'inputBox\').value=\'\';">';
    save_html += '<input type="submit" value="Set" onclick="load()";><\/td><\/tr><br>';

    document.getElementById('saveCode').innerHTML = save_html;
}
saveCode();
