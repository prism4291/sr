// gets the first stickman on the team (PvE team or PvP team)
function getLeader(stickman_ID,team){
    var leader;
    if (team==0) // if looking for friendly team leader
        leader = floor(stickman_ID/Stickmen_Slots)*Stickmen_Slots;
    if (team==1) // if looking for opponent team leader
        leader = (1-floor(stickman_ID/Stickmen_Slots))*Stickmen_Slots;

    return leader;
}
