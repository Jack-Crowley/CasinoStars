class Ball {
    x;
    y;
    r;
    angle;
    rand;

    constructor(x, y, r) {
        //set up properties
        this.x = x;
        this.y = y;
        this.r = r;
        this.continue = false;
        this.angle = 0;
        this.rand = Math.floor(Math.random() * 38);
        console.log(this.rand)
    }

    /**
     * Draw the actor on the canvas.
     */
    draw() {
        // Use ctx to draw. A sample (drawing a small circle):
        ctx.beginPath();
        // let x = this.x + Math.cos(this.angle/30)*300;
        // let y = this.y + Math.sin(this.angle/30)*300;
        let x = this.x + Math.cos(this.angle)*300;
        let y = this.y + Math.sin(this.angle)*300;
        ctx.arc(x, y-50, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    /**
     * Update this actor for the next frame.
     */
    update() {
        // Update properties or other Actors in the actorList.
        // while (this.angle < (4 * Math.PI)+((2*Math.PI)/38)*this.rand) {
        //     this.angle+= (2 * Math.PI)/190;
        // }
        if (this.angle <= (4 * Math.PI) + ((2*Math.PI)/38)*this.rand) {
            console.log(this.angle)
            this.angle += (2 * Math.PI)/76;
        }else if (this.continue == false){
            this.getwinner();
            setTimeout(() => {
                clearInterval(drawIntervalId)
                clearchips();
                draw();
            }, 3000);
            this.continue = true;
        }
    }

    getwinner() {
        if (this.rand == 0 || this.rand == 19) {
            if (bet == 'green') {
                playerbal += betnum * 2;
            }
        }else if (this.rand % 2 == 0) {
            if (bet == 'red') {
                playerbal += betnum * 2;
            }
        }else {
            if (bet == 'black') {
                playerbal += betnum * 2
            }
        }
        betnum = 0;
        bet = undefined;
    }

    //Add more methods as helpful:
}

const ctx = canvas.getContext("2d");

const FRAME_LENGTH = 30;

let bet;
let betnum = 0;
let playerval = document.querySelector('p.playerval')
let playerbal = playerval.dataset.playerval;
draw();
let ball;
function clearchips() {
    ctx.clearRect(canvas.width-400, 0, canvas.width, canvas.height)
}

function draw(){
    ctx.clearRect(0,0,canvas.width-400, canvas.height);
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
        ctx.moveTo(window.innerWidth/2, window.innerHeight/2-50);
        // Draw actual arc
        ctx.arc(window.innerWidth/2, window.innerHeight/2-50, 250, startAngle, endAngle, false);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(window.innerWidth/2, window.innerHeight/2-50, 250, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(window.innerWidth/2, window.innerHeight/2-50, 200, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.fillStyle = 'DarkGray';
    ctx.fill();
    ctx.fillStyle = 'gray';
    ctx.stroke();
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2-50, 40, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2-50, 30, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2-50, 15, 0, 2 * Math.PI, false)
    ctx.closePath();
    ctx.stroke();
    ctx.fillRect(canvas.width/4-300, canvas.height/4-120, 300, 200)
    ctx.font = "75px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Bet:`, canvas.width/4-220, canvas.height/4-50)
    ctx.fillText(`$${betnum}`, canvas.width/4-290, canvas.height/4+35)
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

    if (playerbal >= 1) {
        const one = new Image();
        one.onload = function() {
            ctx.drawImage(one, canvas.width/4*3, canvas.height/4-150, 150, 150);
        };
        one.src = 'images/PokerChips/one.png';
    }
    if (playerbal >= 5) {
        const five = new Image();
        five.onload = function() {
            ctx.drawImage(five, canvas.width/4*3+170, canvas.height/4-150, 150, 150);
        };
        five.src = 'images/PokerChips/five.png';
    }
    if (playerbal >= 10) {
        const ten = new Image();
        ten.onload = function() {
            ctx.drawImage(ten, canvas.width/4*3, canvas.height/4+20, 150, 150);
        };
        ten.src = 'images/PokerChips/ten.png';
    }
    if (playerbal >= 25) {
        const twentyfive = new Image();
        twentyfive.onload = function() {
            ctx.drawImage(twentyfive, canvas.width/4*3+170, canvas.height/4+20, 150, 150);
        };
        twentyfive.src = 'images/PokerChips/twentyfive.png';
    }
    if (playerbal >= 100) {
        const hundred = new Image();
        hundred.onload = function() {
            ctx.drawImage(hundred, canvas.width/4*3, canvas.height/4+190, 150, 150);
        };
        hundred.src = 'images/PokerChips/hundred.png';
    }
    if (playerbal >= 500) {
        const fivehundred = new Image();
        fivehundred.onload = function() {
            ctx.drawImage(fivehundred, canvas.width/4*3+170, canvas.height/4+190, 150, 150);
        };
        fivehundred.src = 'images/PokerChips/fivehundred.png';
    }
    if (playerbal >= 1000) {
        const thousand = new Image();
        thousand.onload = function() {
            ctx.drawImage(thousand, canvas.width/4*3, canvas.height/4+360, 150, 150);
        };
        thousand.src = 'images/PokerChips/thousand.png';
    }

    ctx.fillRect(canvas.width/4-300, canvas.height/4+400, 300, 100)
    ctx.fillStyle = 'black';
    ctx.fillText("Start", canvas.width/4-230, canvas.height/4+475)

    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width/2-300, canvas.height-100, 600, 100)
    ctx.fillStyle = 'white';
    ctx.fillText(`Bal: $${playerbal}`, canvas.width/2-270, canvas.height-25)
}

function start() {
    draw(); 
    ball.draw();
    ball.update();
}

canvas.addEventListener("click", function(event) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
    if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+85 && event.offsetY < canvas.height/4+185) {
        bet = 'red';
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+85, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+190, 300, 100)
        ctx.fillRect(canvas.width/4-300, canvas.height/4+295, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Black", canvas.width/4-240, canvas.height/4+270)
        ctx.fillText("Green", canvas.width/4-250, canvas.height/4+370)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+190 && event.offsetY < canvas.height/4+290) {
        bet = 'black';
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+190, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+85, 300, 100)  
        ctx.fillRect(canvas.width/4-300, canvas.height/4+295, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Red", canvas.width/4-220, canvas.height/4+160)
        ctx.fillText("Green", canvas.width/4-250, canvas.height/4+370)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+295 && event.offsetY < canvas.height/4+395) {
        bet = 'green';
        ctx.fillStyle = 'green';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+295, 300, 100)
        ctx.fillStyle = 'gray';
        ctx.fillRect(canvas.width/4-300, canvas.height/4+85, 300, 100)  
        ctx.fillRect(canvas.width/4-300, canvas.height/4+190, 300, 100)
        ctx.fillStyle = "white";
        ctx.fillText("Red", canvas.width/4-220, canvas.height/4+160)
        ctx.fillText("Black", canvas.width/4-240, canvas.height/4+270)
    }else if (event.offsetX > canvas.width/4-300 && event.offsetX < canvas.width/4 && event.offsetY > canvas.height/4+400 && event.offsetY < canvas.height/4+500) {
        if (typeof bet != "undefined" && betnum > 0) {
            ball = new Ball(window.innerWidth/2, window.innerHeight/2, 20);
            console.log(ball)
            drawIntervalId = window.setInterval(start, FRAME_LENGTH);
        }
    }else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4-50)) **2 ) < 150) {
        if (playerbal >= 1) {
            betnum += 1;
            playerbal-=1;
            clearchips();
            draw();
        }
    }else if (Math.sqrt( (event.offsetX-(canvas.width/4*3+170)) ** 2 + (event.offsetY-(canvas.height/4-50)) **2 ) < 150) {
        if (playerbal >= 5) {
            betnum += 5;
            playerbal-=5;
            clearchips();
            draw();
        } 
    }
    else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4+20)) **2 ) < 150) {
        if (playerbal >= 10) {
            betnum += 10;
            playerbal-=10;
            clearchips();
            draw();
        }   
    }
    else if (Math.sqrt( (event.offsetX-(canvas.width/4*3+170)) ** 2 + (event.offsetY-(canvas.height/4+20)) **2 ) < 150) {
        if (playerbal >= 25) {
            betnum += 25;
            playerbal-=25;
            clearchips();
            draw();
        }  
    }
    else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4+190)) **2 ) < 150) {
        if (playerbal >= 100) {
            betnum += 100;
            playerbal-=100;
            clearchips();
            draw();
        }
    }
    else if (Math.sqrt( (event.offsetX-(canvas.width/4*3+170)) ** 2 + (event.offsetY-(canvas.height/4+190)) **2 ) < 150) {
        if (playerbal >= 500) {
            betnum += 500;
            playerbal-=500;
            clearchips();
            draw();
        }
    }
    else if (Math.sqrt( (event.offsetX-canvas.width/4*3) ** 2 + (event.offsetY-(canvas.height/4+360)) **2 ) < 150) {
        if (playerbal >= 1000) {
            betnum += 1000;
            playerbal-=1000;
            clearchips();
            draw();
        };
    }
});