function doVSModeText(team_ID,message){ // original name: vg()
    var c,var_a;
    if (team_ID.IG_dimensions==0){
        team_ID.IG_dimensions = 1;
        setArea(team_ID,Win_Width,16);
        team_ID.IG_canvas = document.createElement('canvas');
        team_ID.IG_canvas.width = team_ID.IG_width;
        team_ID.IG_canvas.height = team_ID.IG_height;
        team_ID.IG_ctx = team_ID.IG_canvas.getContext("2d");
    }
    c = message+"sans-serif014";
    if (team_ID.IG_font!=c){
        team_ID.IG_font = c;
        team_ID.IG_ctx.fillStyle = "#000000";
        team_ID.IG_ctx.fillRect(0,0,team_ID.IG_width,team_ID.IG_height);
        //c = "14px sans-serif";
        team_ID.IG_ctx.font = "14px sans-serif";
        team_ID.IG_ctx.fillStyle = "#ffffff";
        team_ID.IG_ctx.fillText(message,0,14);
        var_a = team_ID.IG_ctx.getImageData(0,0,team_ID.IG_width,team_ID.IG_height).data;
        for (var i=0; i<var_a.length; i+=4){
            if (var_a[i+0] >= 1)
                 team_ID.IG_pxl_color_index[i>>2] = 0xFFFFFF;
            else team_ID.IG_pxl_color_index[i>>2] = -1;
        }
        c = 0;
        team_ID.IG_cropped_width = 0;
        for (var h=0; h<team_ID.IG_height; h++){
            for (var w=0; w<team_ID.IG_width; w++,c++){
                if (team_ID.IG_pxl_color_index[c]==0xFFFFFF && team_ID.IG_cropped_width<=w)
                    team_ID.IG_cropped_width = w+1;
            }
        }
    }
}
