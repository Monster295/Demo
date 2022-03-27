var panelgroup = [];
function getRamNumber(){
    var result='';
    for(var i=0;i<2;i++){
    result+=Math.floor(Math.random()*16).toString(16);//获取0-15并通过toString转16进制
    }
     
    return '#'+result.toLowerCase()+"aa66";             //生成随机颜色
}
function CreatePanel(context) {
    if(panelgroup[panelgroup.length-1].y >=0){
        
        var minHeight = panelgroup[panelgroup.length-1].y;
        if(GameData.probability >= Random(0,100)){      //根据机率 随机生成跳板状态
            var status = 0;
            if(30 >= Random(0,100)){
                var status = 2;
            }
            else if(30 >= Random(0,100)){
                var status = 3;
            }
        }
        else{
            var status = 1;
        }

        var PanelX = Random(40,canvas.width - 80);
        var PanelY = minHeight - Random(GameData.level,140);
        var PanelColor = getRamNumber();    //跳板颜色，使用上面的函数随机生成
        var PanelLength = Random(40,60);    //跳板长度，40~60间的随机数

        panelgroup.push({
            x:PanelX,
            y:PanelY,
            status:status,
            pcolor:PanelColor,
            plength:PanelLength
        });
    }
}