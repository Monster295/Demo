function collide() {    //人物碰撞到跳板的弹跳设置
    for (let i = 0; i < panelgroup.length; i++) {
        var panel = panelgroup[i];
        if(Player.condition == 0){
            if (Player.x <= panel.x + panel.plength/2-20 && Player.x >= panel.x - panel.plength-40) {
                if (Player.y + 60 <= panel.y + 1 && Player.y + 60 >= panel.y - 10) {
                    if(panel.status == 0){
                        panelgroup.splice(i,1);
                    }
                    Player.condition = 1;
                    Player.Yacceleration = GameData.jumpheight;     //y 方向加速度 等于 跳跃高度
                }
            }
        }
    }
}