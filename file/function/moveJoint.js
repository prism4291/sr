// move joint to its next position
function moveJoint(current_pos,next_pos,gravity,resistance){ // original name: W()
    var next_next_pos = new Vector2D;
    next_next_pos.Vdistance(current_pos,next_pos);
    next_pos.Vset(current_pos);
    next_next_pos.y += gravity;
    scaleVector2D(next_next_pos,resistance);
    current_pos.Vadd(next_next_pos);
}
