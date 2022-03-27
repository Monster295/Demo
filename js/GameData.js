var GameData = {        //存放游戏数据，得分、高度等
    score: 0,
    jumpheight: 15,
    level: 30,
    speed: 0,           //速度
    probability: 0      //机率
};
var Player = {          //存放当前人物的坐标，加速度
    x:0,
    y:0,
    direction:1,        //1是右，0是左
    condition:0,
    Yacceleration:0
};
var mouseX ;
var mouseY ;