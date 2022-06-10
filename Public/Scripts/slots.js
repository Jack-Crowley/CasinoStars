const ctx = canvas.getContext("2d");
const fruits = ['grape', 'watermelon', 'strawberry', 'cherry', 'orange', 'banana', 'apple', 'peach', 'blueberry', 'lemon', 'seven'];
let reel1;
let reel2;
let reel3;
const FRAME_LENGTH = 30;
let drawIntervalId;

let win = 0;
let betnum = 0;
let playerval = document.querySelector('p.playerval')
let playerbal = playerval.dataset.playerval;
draw();
function draw() {
    ctx.strokeStyle='fuchsia';
    ctx.lineWidth=3;
    ctx.strokeRect(20, 20, canvas.width-50, canvas.height-50);
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height-80, 50, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle='gold'
    ctx.fill();
    ctx.fillStyle='DarkMagenta'
    const spin = new Image();
    spin.onload = function() {
        ctx.drawImage(spin, canvas.width/2-50, canvas.height-130, 100, 100);
    };
    spin.src = 'images/spin.png';
    ctx.fillRect(canvas.width/2-285, canvas.height-115, 221, 80)
    ctx.fillRect(canvas.width/2-514, canvas.height-115, 221, 80)
    ctx.fillRect(25, canvas.height-115, 221, 80)
    ctx.fillRect(canvas.width/2+400, canvas.height-115, 332, 80)
    ctx.fillRect(canvas.width/2+58, canvas.height-115, 332, 80)
    ctx.fillStyle = 'white';
    ctx.font = '35px Arial'
    ctx.textAlign = 'center';
    ctx.fillText("$1", 125, canvas.height-40)
    ctx.fillText("$5", 355, canvas.height-40)
    ctx.fillText("Bet", 125, canvas.height-80)
    ctx.fillText("Bet", 355, canvas.height-80)
    ctx.fillText(`Total Bet:`, 590, canvas.height-80)
    ctx.fillText(`Win:`, 990, canvas.height-80)
    ctx.fillText('Balance:', 1340, canvas.height-80)
    ctx.fillText(`$${win}`, 990, canvas.height-40)
    ctx.fillText(`$${betnum}`, 600, canvas.height-40)
    ctx.fillText(`$${playerbal}`, 1340, canvas.height-40)
    ctx.fillRect(canvas.width/15+5, canvas.height/10+5, 430, 490)
    ctx.fillRect(canvas.width/15+447, canvas.height/10+5, 430, 490)
    ctx.fillRect(canvas.width/15+889, canvas.height/10+5, 429, 490)
    ctx.strokeRect(canvas.width/2-285, canvas.height-115, 221, 80)
    ctx.strokeRect(canvas.width/2-514, canvas.height-115, 221, 80)
    ctx.strokeRect(25, canvas.height-115, 221, 80)
    ctx.strokeRect(canvas.width/2+400, canvas.height-115, 332, 80)
    ctx.strokeRect(canvas.width/2+58, canvas.height-115, 332, 80)
    ctx.strokeRect(canvas.width/15, canvas.height/10, 1325, 500)
    ctx.strokeRect(canvas.width/15, canvas.height/10, 442, 500)
    ctx.strokeRect(canvas.width/15+442, canvas.height/10, 442, 500)
    ctx.strokeRect(canvas.width/15+884, canvas.height/10, 441, 500)
    ctx.strokeStyle = '#0078ff'
    ctx.lineWidth = 5;
    ctx.strokeRect(canvas.width/15+5, canvas.height/10+5, 430, 490)
    ctx.strokeRect(canvas.width/15+447, canvas.height/10+5, 430, 490)
    ctx.strokeRect(canvas.width/15+889, canvas.height/10+5, 429, 490)
}

function spin() {
    drawIntervalId = window.setInterval(getsymbol, FRAME_LENGTH)
}

function getsymbol() {
    reel1 = Math.floor(Math.random() * 11);
    reel2 = Math.floor(Math.random() * 11);
    reel3 = Math.floor(Math.random() * 11);
    let reel1img = new Image();
    reel1img.onload = function() {
        ctx.drawImage(reel1img, 120, 100, 400, 400);
    };
    reel1img.src = `images/Fruits/${fruits[reel1]}.png`;
    let reel2img = new Image();
    reel2img.onload = function() {
        ctx.drawImage(reel2img, 570, 100, 400, 400);
    };
    reel2img.src = `images/Fruits/${fruits[reel2]}.png`;
    let reel3img = new Image();
    reel3img.onload = function() {
        ctx.drawImage(reel3img, 1000, 100, 400, 400);
    };
    reel3img.src = `images/Fruits/${fruits[reel3]}.png`;
}

canvas.addEventListener('click', function(event)  {
    if (Math.sqrt( (event.offsetX-(canvas.width/2-50)) ** 2 + (event.offsetY-(canvas.height-130)) **2 ) < 100) {
        spin();
        window.setTimeout(setTimeout(() => {
            clearInterval(drawIntervalId)
            if (reel1 == reel2 && reel2 == reel3) {
                win = betnum * 1000
                playerbal += win;
            }else if (reel1 == reel2 || reel1 == reel3 || reel2 == reel3) {
                win = betnum * 2
                playerbal += win;
            }
            draw();
            betnum = 0;
            win = 0;
        }, 3000))
    }else if (event.offsetX > 25 && event.offsetX < 246 && event.offsetY > canvas.height-115 && event.offsetY < canvas.height-35) {
        if (playerbal >= 1) {
            playerbal -= 1;
            betnum += 1;
            draw();
        }
    }else if (event.offsetX > canvas.width/2-514 && event.offsetX < canvas.width/2-293 && event.offsetY > canvas.height-115 && event.offsetY < canvas.height-35) {
        if (playerbal >= 5) {
            playerbal -= 5;
            betnum += 5;
            draw();
        }
    }
})