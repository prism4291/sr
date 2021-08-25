window.fff = putImageData;
function putImageData(image_data,dx,dy){ // original name: Ah()
    try {
        cv = document.getElementById("cv");
        ctx = cv.getContext("2d");
        ctx.putImageData(image_data,dx,dy);
    } catch(d){}
}
