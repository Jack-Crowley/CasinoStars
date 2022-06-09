const ctx = canvas.getContext("2d");

const FRAME_LENGTH = 30;

draw();
bettingDraw();
let bet;
let betnum = 0;
let ball = new Ball(window.innerWidth/2, window.innerHeight/2, 20);
let stop = false;

function draw(){
    ctx.clearRect(400,0,canvas.width/4*3-450, canvas.height);
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
}

function bettingDraw() {
    ctx.fillRect(canvas.width/4-300, canvas.height/4-120, 300, 200)
    ctx.font = "75px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Bet:`, canvas.width/4-220, canvas.height/4-50)
    ctx.fillText(`$`, canvas.width/4-290, canvas.height/4+35)
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/4-300, canvas.height/4+85, 300, 100)
    ctx.fillStyle = "white";
    ctx.fillText("Red", canvas.width/4-220, canvas.height/4+160)
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/4-300, canvas.height/4+190, 300, 100)
    ctx.fillStyle = "white";
    ctx.fillText("Black", canvas.width/4-240, canvas.height/4+270)
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/4-300, canvas.height/4+295, 300, 100)
    ctx.fillStyle = "white";
    ctx.fillText("Green", canvas.width/4-250, canvas.height/4+370)

    const one = new Image();
    one.onload = function() {
        ctx.drawImage(one, canvas.width/4*3, canvas.height/4-150, 150, 150);
    };
    one.src = 'Public/images/PokerChips/one.png';
    const five = new Image();
    five.onload = function() {
        ctx.drawImage(five, canvas.width/4*3+170, canvas.height/4-150, 150, 150);
    };
    five.src = 'Public/images/PokerChips/five.png';
    const ten = new Image();
    ten.onload = function() {
        ctx.drawImage(ten, canvas.width/4*3, canvas.height/4+20, 150, 150);
    };
    ten.src = 'Public/images/PokerChips/ten.png';
    const twentyfive = new Image();
    twentyfive.onload = function() {
        ctx.drawImage(twentyfive, canvas.width/4*3+170, canvas.height/4+20, 150, 150);
    };
    twentyfive.src = 'Public/images/PokerChips/twentyfive.png';
    const hundred = new Image();
    hundred.onload = function() {
        ctx.drawImage(hundred, canvas.width/4*3, canvas.height/4+190, 150, 150);
    };
    hundred.src = 'Public/images/PokerChips/hundred.png';
    const fivehundred = new Image();
    fivehundred.onload = function() {
        ctx.drawImage(fivehundred, canvas.width/4*3+170, canvas.height/4+190, 150, 150);
    };
    fivehundred.src = 'Public/images/PokerChips/fivehundred.png';
    const thousand = new Image();
    thousand.onload = function() {
        ctx.drawImage(thousand, canvas.width/4*3, canvas.height/4+360, 150, 150);
    };
    thousand.src = 'Public/images/PokerChips/thousand.png';

    ctx.fillRect(canvas.width/4-300, canvas.height/4+400, 300, 100)
    ctx.fillStyle = 'black';
    ctx.fillText("Start", canvas.width/4-230, canvas.height/4+475)

    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/2-300, canvas.height-100, 600, 100)
    ctx.fillStyle = 'white';
    ctx.fillText("Bal:", canvas.width/2-270, canvas.height-25)
}

function start() {
    draw(); 
    ball.draw();
    ball.update();
}

canvas.addEventListener("click", function(event) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
    if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+35 && event.offsetY < canvas.height/4+135) {
        bet = 'red';
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
        ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Black", canvas.width/4-240, canvas.height/4+220)
        ctx.fillText("Green", canvas.width/4-250, canvas.height/4+320)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+140 && event.offsetY < canvas.height/4+240) {
        bet = 'black';
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)  
        ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Red", canvas.width/4-220, canvas.height/4+110)
        ctx.fillText("Green", canvas.width/4-250, canvas.height/4+320)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+255 && event.offsetY < canvas.height/4+345) {
        bet = 'green';
        ctx.fillStyle = 'green';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+245, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+35, 300, 100)  
        ctx.fillRect(canvas.width/4-300, canvas.height/4+140, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Red", canvas.width/4-220, canvas.height/4+110)
        ctx.fillText("Black", canvas.width/4-240, canvas.height/4+220)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+350 && event.offsetY < canvas.height/4+450) {
        if (typeof bet != "undefined" && betnum > 0) {
            let drawIntervalId = window.setInterval(start, FRAME_LENGTH);;
        }
        console.log(begin)
    }else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4-50)) **2 ) < 150) {
        betnum += 1;
    }else if (Math.sqrt( (event.offsetX-(canvas.width/4*3+170)) ** 2 + (event.offsetY-(canvas.height/4-50)) **2 ) < 150) {
        betnum += 5;
        console.log(5)
    }
    else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4+20)) **2 ) < 150) {
        betnum += 10;
        console.log(10)
    }
    else if (Math.sqrt( (event.offsetX-(canvas.width/4*3+170)) ** 2 + (event.offsetY-(canvas.height/4+20)) **2 ) < 150) {
        betnum += 25;
        console.log(25)
    }
    else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4+190)) **2 ) < 150) {
        betnum += 100;
        console.log(100)
    }
    else if (Math.sqrt( (event.offsetX-(canvas.width/4*3+170)) ** 2 + (event.offsetY-(canvas.height/4+190)) **2 ) < 150) {
        betnum += 500;
        console.log(500)
    }
    else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4+360)) **2 ) < 150) {
        betnum += 1000;
        console.log(1000)
    }
});