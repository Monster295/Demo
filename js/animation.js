if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            var self = this, start, finish;
            return window.setTimeout(function () {
                start = +new Date();
                callback(start);
                finish = +new Date();
                self.timeout = 1000 / 60 - (finish - start);
            }, self.timeout);
        });
}
function jump() {
    Player.y = Player.y - Player.Yacceleration;
    Player.Yacceleration -= 0.5;
    if (Player.Yacceleration < 0) {
        Player.condition = 0;
    }
    if (Player.Yacceleration < -10) {
        Player.Yacceleration = -10;
    }
}
function move(context) {
    for (let i = 0; i < panelgroup.length; i++) {
        var PanelX = panelgroup[i].x;
        var PanelY = panelgroup[i].y;
        var status = panelgroup[i].status;
        var pcolor = panelgroup[i].pcolor;
        var plength = panelgroup[i].plength;
        context.beginPath();
        context.moveTo(PanelX - plength / 2, PanelY);
        context.lineTo(PanelX + plength / 2, PanelY);
        if (status) {
            context.strokeStyle = pcolor;
        }
         else {     //status是0，颜色为灰色
            context.strokeStyle = "#c4c4c4";
        }

        context.stroke();   //画线
    }
    if (mouseX == null) {
        context.drawImage(Rdoodle, Player.x, Player.y);
    }


    if (mouseX < Player.x - 5 && mouseX >= Player.x - 15) {
        Player.direction = 0;
        Player.x = Player.x - 5;
    }
    if (mouseX < Player.x - 15) {
        Player.direction = 0;
        Player.x = Player.x - 10;
    }


    if (mouseX > Player.x + 5 && mouseX <= Player.x + 15) {
        Player.direction = 1;
        Player.x = Player.x + 5;
    }
    if (mouseX > Player.x + 15) {
        Player.direction = 1;
        Player.x = Player.x + 10;
    }
    if (Player.direction == 1) {        //右移

        if (chara == 1) {
            context.drawImage(Rdoodle, Player.x, Player.y);
        }
        else if (chara == 2) {
            context.drawImage(Rfrog, Player.x, Player.y);
        }
    }
    if (Player.direction == 0) {           //左移
        if (chara == 1) {
            context.drawImage(Ldoodle, Player.x, Player.y);
        }
        else if (chara == 2) {
            context.drawImage(Lfrog, Player.x, Player.y);
        }
    }
}
function changeposition() {             //改变跳板位置
    for (let i = 0; i < panelgroup.length; i++) {

        var panel = panelgroup[i];
        if (panel.status == 2) {
            panel.x += Width / ChangeBasis;
            if (panel.x >= Width - 40) {
                panelgroup[i].status = 3;
            }
        }
        else if (panel.status == 3) {
            panel.x -= Width / ChangeBasis;
            if (panel.x <= 40) {
                panelgroup[i].status = 2;
            }
        }
    }
}
function gamescroll() {         //游戏滚动，计算玩家得分
    if (Player.y <= Height / 2) {
        var distance = Height / 2 - Player.y;
        for (let i = 0; i < panelgroup.length; i++) {

            var panel = panelgroup[i];
            panel.y += distance / 2;
        }
        Player.y += distance / 2;
        GameData.score += distance / 20;
    }
    if (GameData.score >= 150) {
        ChangeBasis = 150;
        GameData.level = 50;
        GameData.probability = 25;
    }
    if (GameData.score >= 300) {
        ChangeBasis = 150;
        GameData.level = 50;
        GameData.probability = 40;
    }
    if (GameData.score >= 500) {
        ChangeBasis = 130;
        GameData.level = 60;
        GameData.probability = 50;
        
        Ldoodle.src = "img/Ldoodlenew.png";
        Rdoodle.src = "img/Rdoodlenew.png";
        Lfrog.src = "img/Lfrognew.png";
        Rfrog.src = "img/Rfrognew.png";

    }
    if (GameData.score >= 700) {
        ChangeBasis = 110;
        GameData.level = 75;
        GameData.probability = 60;
    }
    if (GameData.score >= 1000) {
        ChangeBasis = 90;
        GameData.level = 100;
        GameData.probability = 75;
        
    }
    if (GameData.score >= 1300) {
        ChangeBasis = 80;
        GameData.level = 120;
        GameData.probability = 90;
    }

    if (panelgroup[0].y > Height) {
        panelgroup.shift(); //从数组中删除第一个元素，并返回该元素的值。
    }
}
