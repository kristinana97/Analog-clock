function displayCanvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
// расчет координат центра и радиусы часов
    var radiusClock = canvas.width/2 - 10;
    var xCenterClock = canvas.width/2;
    var yCenterClock = canvas.width/2;
// очитска экрана
    ctx.fillStyle = '#F6F6F6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
// рисования контура часов
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.stroke();
    ctx.closePath();

    // рисование рисочек часов
    var radiusNum = radiusClock - 10;// расдиус расположения рисочек
    var radiusPoint;
    for (var tm = 0; tm < 60; tm++) {
        ctx.beginPath();
        if(tm % 5 == 0) {radiusPoint = 5}else{radiusPoint = 2;}
        var xPointM = xCenterClock + radiusNum * Math.cos( -6*tm*(Math.PI/180) + Math.PI/2);
        var yPointM = xCenterClock + radiusNum * Math.sin( -6*tm*(Math.PI/180) + Math.PI/2);
        ctx.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
    }
    // Оцифровка циферблата часов
    for(var th = 1; th <= 12; th++){
        ctx.beginPath();
        ctx.font = '28px Georgia';
        var xText = xCenterClock + (radiusNum - 30) * Math.cos( -30*th*(Math.PI/180) + Math.PI/2);
        var yText = yCenterClock - (radiusNum - 30) * Math.sin( -30*th*(Math.PI/180) + Math.PI/2);
        if(th <= 9){
            ctx.strokeText(th, xText - 5 , yText + 10);
        }else{
            ctx.strokeText(th, xText - 15 , yText + 10);
        }
            ctx.stroke();
            ctx.closePath();
    }

    // рисуем стрелки
    var lenghtSec = radiusNum - 10;
    var lenghtMin = radiusNum - 15;
    var lenghtHour = lenghtMin / 1.5;
    var d = new Date();
    var t_sec = 6*d.getSeconds();
    var t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds());
    var t_hour = 30*(d.getHours() + (1/60)*d.getMinutes());

    // рисуем секунды
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.lineTo(xCenterClock + lenghtSec*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)), yCenterClock - lenghtSec*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    ctx.stroke();
    ctx.closePath();

    // рисуем минуты
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.lineTo(xCenterClock + lenghtMin*Math.cos(Math.PI/2 - t_min*(Math.PI/180)), yCenterClock - lenghtMin*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    ctx.stroke();
    ctx.closePath();

    // рисуем часы
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.lineTo(xCenterClock + lenghtHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)), yCenterClock - lenghtHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    ctx.stroke();
    ctx.closePath();

    //Рисуем центр часов
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    return;
}

window.onload = function () {
    window.setInterval(
        function(){
            var d = new Date();
            document.getElementById("clock").innerHTML = d.toLocaleTimeString();
            displayCanvas();
        }, 1000
    );
}