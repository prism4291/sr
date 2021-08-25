// lower force = limp and droopy (zombie) higher force makes them jittery
// create force between 2 joints
function pullJoints(joint_A,joint_B,distance,B_pull_on_A,A_pull_on_B){ // original name: Y()
    var vector1 = new Vector2D;
    vector1.Vdistance(joint_A,joint_B);
    distance -= normalize(vector1);
    B_pull_on_A *= distance;
    A_pull_on_B *= distance;
    joint_A.x += vector1.x*B_pull_on_A;
    joint_A.y += vector1.y*B_pull_on_A;
    joint_B.x -= vector1.x*A_pull_on_B;
    joint_B.y -= vector1.y*A_pull_on_B;
}
