const ctx = canvas.getContext("2d");

const FRAME_LENGTH = 30;

draw();
begin = false;
if (begin) {
    let drawIntervalId = window.setInterval(start, FRAME_LENGTH);
}
let bet;
let betnum;
let ball = new Ball(window.innerWidth/2, window.innerHeight/2, 20);
let stop = false;

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0; i < 38; i++) {
        if (i % 19 == 0) {
            ctx.fillStyle = 'green';
        }else if (i % 2 == 0) {
            ctx.fillStyle = 'red';
        }else {
            ctx.fillStyle = 'black';
        }
        let startAngle = i * ((2 * Math.PI) / 38);
        let endAngle = startAngle + (2 * Math.PI) / 38;
        ctx.beginPath();
        ctx.moveTo(window.innerWidth/2, window.innerHeight/2);
        // Draw actual arc
        ctx.arc(window.innerWidth/2, window.innerHeight/2, 250, startAngle, endAngle, false);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(window.innerWidth/2, window.innerHeight/2, 250, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(window.innerWidth/2, window.innerHeight/2, 200, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.fillStyle = 'DarkGray';
    ctx.fill();
    ctx.fillStyle = 'gray';
    ctx.stroke();
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 40, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 30, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 15, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.stroke();
    ctx.fillRect(canvas.width/4-300, canvas.height/4-70, 300, 100)
    ctx.font = "75px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Bet:", canvas.width/4-220, canvas.height/4+10)
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)
    ctx.fillStyle = "white";
    ctx.fillText("Red", canvas.width/4-220, canvas.height/4+110)
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
    ctx.fillStyle = "white";
    ctx.fillText("Black", canvas.width/4-240, canvas.height/4+220)
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
    ctx.fillStyle = "white";
    ctx.fillText("Green", canvas.width/4-250, canvas.height/4+320)
}

function start() {
    draw()
    ball.draw();
    ball.update();
}

canvas.addEventListener("click", function(event) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
    if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+5 && event.offsetY < canvas.height/4+105) {
        bet = 'red';
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
        ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Black", canvas.width/4-240, canvas.height/4+220)
        ctx.fillText("Green", canvas.width/4-250, canvas.height/4+320)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+110 && event.offsetY < canvas.height/4+210) {
        bet = 'black';
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)  
        ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Red", canvas.width/4-220, canvas.height/4+110)
        ctx.fillText("Green", canvas.width/4-250, canvas.height/4+320)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+215 && event.offsetY < canvas.height/4+315) {
        bet = 'green';
        ctx.fillStyle = 'green';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)  
        ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Red", canvas.width/4-220, canvas.height/4+110)
        ctx.fillText("Black", canvas.width/4-240, canvas.height/4+220)
    }
});