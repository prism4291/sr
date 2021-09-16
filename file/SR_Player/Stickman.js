// empty class (class with weapons unequipped)
window.fff = SR_Player.prototype.Stickman_pl;
SR_Player.prototype.Stickman_pl = function(current_char){ // (new prototype)
    /**#/
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6,0.5,0.5); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,3.6,0.5,0.5); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,4.8,0.5,0.5); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,4.8,0.5,0.5); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,4.8,0.5,0.5); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,4.8,0.5,0.5); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,4.8,0.5,0.5); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,4.8,0.5,0.5); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,4.8,0.5,0.5); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],4.8,0.5,0.5); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1,0.1); // left knee to right knee
    //*/
    /*
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,36,0.01,0.01); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,36,0.01,0.01); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,48,0.01,0.01); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,48,0.01,0.01); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,48,0.01,0.01); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,48,0.01,0.01); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,48,0.01,0.01); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,48,0.01,0.01); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,48,0.01,0.01); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],48,0.01,0.01); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,60,0.001,0.001); // left knee to right knee
    //*/
  //pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] , 6,4  ,0.1); // makes them fly (ish)
    /*add*#/
    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,0.1,0.5,0.5); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,0.1,0.5,0.5); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,0.1,0.5,0.5); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,0.1,0.5,0.5); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,0.1,0.5,0.5); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,0.1,0.5,0.5); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,0.1,0.5,0.5); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,0.1,0.5,0.5); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,0.1,0.5,0.5); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],0.1,0.5,0.5); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1,0.1); // left knee to right knee
    //*/
    for (var j=11; j<=20; j++){
        moveJoint(this.PL_joint[current_char][j],this.PL_joint_destination[current_char][j],0.05,0.95);
    }

    this.PL_joint[current_char][11].x-=0.1;
    this.PL_joint[current_char][11].y+=0.1;
    this.PL_joint[current_char][12].x-=0.1;
    this.PL_joint[current_char][12].y-=0.2;
    this.PL_joint[current_char][13].x-=0.1;
    this.PL_joint[current_char][13].y+=0.3;
    this.PL_joint[current_char][14].x-=0.1;
    this.PL_joint[current_char][14].y-=0.3;
    this.PL_joint[current_char][15].x-=0.1;
    //this.PL_joint[current_char][15].y+=0.1;

    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][11],3.6,0  ,0.1); // neck to left wing (shoulder)
    pullJoints(this.PL_joint[current_char][11],this.PL_joint[current_char][12],9.6,0.5,0.5); // left wing (shoulder) to left wing (tip)
    pullJoints(this.PL_joint[current_char][12],this.PL_joint[current_char][13],9.6,0.5,0.5);
    pullJoints(this.PL_joint[current_char][13],this.PL_joint[current_char][14],9.6,0.5,0.5);
    pullJoints(this.PL_joint[current_char][14],this.PL_joint[current_char][15],9.6,0.5,0.5);
    //pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][15],12 ,0  ,0.1); // neck to left wing (tip)

    pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][16],3.6,0  ,0.1); // neck to right wing (shoulder)
    pullJoints(this.PL_joint[current_char][16],this.PL_joint[current_char][17],9.6,0.5,0.5);
    pullJoints(this.PL_joint[current_char][17],this.PL_joint[current_char][18],9.6,0.5,0.5);
    pullJoints(this.PL_joint[current_char][18],this.PL_joint[current_char][19],9.6,0.5,0.5);
    pullJoints(this.PL_joint[current_char][19],this.PL_joint[current_char][20],9.6,0.5,0.5);
    //pullJoints(this.PL_joint[current_char][1] ,this.PL_joint[current_char][20],12 ,0  ,0.1); // neck to right wing (tip)
     // right wing (shoulder) to right wing (tip)


    pullJoints(this.PL_joint[current_char][0],this.PL_joint[current_char][1] ,3.6,0.5,0.5); // top of head to neck
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][2] ,7.2,0.5,0.5); // neck to crotch
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][3] ,9.6,0.5,0.5); // neck to left elbow
    pullJoints(this.PL_joint[current_char][1],this.PL_joint[current_char][4] ,9.6,0.5,0.5); // neck to right elbow
    pullJoints(this.PL_joint[current_char][3],this.PL_joint[current_char][5] ,9.6,0.5,0.5); // left elbow to left hand
    pullJoints(this.PL_joint[current_char][4],this.PL_joint[current_char][6] ,9.6,0.5,0.5); // right elbow to right hand
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][7] ,9.6,0.5,0.5); // crotch to left knee
    pullJoints(this.PL_joint[current_char][2],this.PL_joint[current_char][8] ,9.6,0.5,0.5); // crotch to right knee
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][9] ,9.6,0.5,0.5); // left knee to left foot
    pullJoints(this.PL_joint[current_char][8],this.PL_joint[current_char][10],9.6,0.5,0.5); // right knee to right foot
    pullJoints(this.PL_joint[current_char][7],this.PL_joint[current_char][8] ,6  ,0.1,0.1); // left knee to right knee
};
