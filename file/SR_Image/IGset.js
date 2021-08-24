SR_Image.prototype.IGset = function(name){ // wa.prototype.j
    if (this.IG_file!=name){
        Tile_Counter1++;
        this.IG_file = name;
        this.IG_image = new Image;
        this.IG_image.src = "./data/"+name+"?18.9";
        delete this.IG_pxl_color_index;
        this.IG_dimensions = 0;
        this.IG_pxl_color_index = 0;
    }
};
