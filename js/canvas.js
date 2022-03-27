var chara = 1;
var canvas = document.getElementById("canvas");         //设置画布的长 宽
var Height = window.screen.height * 0.8;
var Width = Math.min(window.screen.height * 0.6, window.screen.width) * 0.8;
canvas.height = Height;
canvas.width = Width;

var context = canvas.getContext("2d");
var backgroundimg = new Image();
var Ldoodle = new Image();
var Rdoodle = new Image();
var Lfrog = new Image();
var Rfrog = new Image();
var Mouse = new Image();
                                                    //导入需要的图片
Ldoodle.src = "img/Ldoodle.png";
Rdoodle.src = "img/Rdoodle.png";
Lfrog.src = "img/Lfrog.png";
Rfrog.src = "img/Rfrog.png";
Mouse.src = "img/mouse.png";
backgroundimg.src = "img/bg.jpg";
backgroundimg.onload = function (ev) {
    var pattern = context.createPattern(backgroundimg, "repeat");
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(canvas.width / 2 - 30, canvas.height - 60);
    context.lineTo(canvas.width / 2 + 30, canvas.height - 60);
    context.lineWidth = 10;         //开始游戏按钮的样式为 绿色 圆角
    context.strokeStyle = "green";
    context.lineCap = "round";
    Player.x = canvas.width / 2 - 30;
    Player.y = canvas.height - 125;
    context.drawImage(Rdoodle, canvas.width / 2 - 30, canvas.height-290);   //选择人物，显示两个人物图片
    context.drawImage(Rfrog, canvas.width / 2 - 30,canvas.height-170);

    alert("您好，欢迎来到跳跳游戏！快来挑战吧！");      //欢迎提示
    
    function startanimation() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        CreatePanel(context);
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 20px Arial";   //显示分数
        context.textAlign = "left";
        context.fillStyle = "#a0522d";
        context.fillText("得分: " + parseInt(GameData.score), 20, 30);

        jump();
        collide();
        gamescroll();
        move(context);
        if (Player.y > canvas.height) {         //y坐标值 大于 画布高度 ，即掉出画布
            window.cancelAnimationFrame(startanimation);
            var userName = prompt("游戏结束!\n你的得分是: " + parseInt(GameData.score) + "\n请留下尊姓大名!", "尊姓大名");
            alert(userName+", 你的得分是: " + parseInt(GameData.score)+"\n太棒了! 再来一局吧?");      
            location.reload();
        } else {            //游戏继续
            requestAnimationFrame(startanimation);
            changeposition();   //换位置
        }

    }
    var start1 = document.getElementById("startBTN");       //游戏人物1
    var start2 = document.getElementById("startBTN2");      //游戏人物2
    start1.addEventListener("click", function () {          //设置事件监听器，监听鼠标单击事件
                
        chara = 1;
        window.requestAnimationFrame(startanimation);
        start1.style.display = "none";
        start2.style.display = "none";  
        Player.x = canvas.width / 2 - 30;           //设置游戏开始时，人物的坐标
        Player.y = canvas.height - 220;
        
        panelgroup.push({
            x: Player.x+30,
            y: Player.y+90,
            status: 1,
            pcolor: "green",
            plength: 60
        });

    })
    start2.addEventListener("click", function () {
        
        chara = 2;
        window.requestAnimationFrame(startanimation);
        start1.style.display = "none";
        start2.style.display = "none";
        Player.x = canvas.width / 2 - 30;
        Player.y = canvas.height - 170;
        panelgroup.push({
            x: Player.x+30,
            y: Player.y+90,
            status: 1,
            pcolor: "green",
            plength: 60
        });
    })

};


function getLocation(x, y) {                    //获取坐标
    var bbox = canvas.getBoundingClientRect();
    return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
    };
}

canvas.onmousemove = function (e) {             //鼠标移动

    var location = getLocation(e.clientX, e.clientY);
    mouseX = parseInt(location.x) - 31;
    mouseY = parseInt(location.y);
};


