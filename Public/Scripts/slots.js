let tr = 0
console.log(canvas.width)
console.log(canvas.height)
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
getsymbol();
function draw() {
    ctx.fillStyle='white'
    ctx.fillStyle = 'red'
    ctx.fillRect(window.innerWidth*0.9, window.innerHeight*0.9,window.innerWidth*0.1, window.innerHeight*0.1 )
    ctx.fillStyle='white'
    ctx.fillText(`Cashout`, window.innerWidth*0.9, window.innerHeight)
    ctx.strokeStyle='fuchsia';
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(canvas.width/50*25.6, canvas.height/50*44.5, canvas.width/15.36/2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle='gold'
    ctx.fill();
    ctx.fillStyle='DarkMagenta'
    const spin = new Image();
    spin.onload = function() {
        ctx.drawImage(spin, canvas.width/50*23.97, canvas.height/50*41, canvas.width/15.36, canvas.height/7.26);
    };
    spin.src = 'images/spin.png';
    ctx.fillRect(canvas.width/3.09, canvas.height/50*42, canvas.width/6.95, canvas.height/9.075)
    ctx.fillRect(canvas.width/5.75, canvas.height/50*42, canvas.width/6.95, canvas.height/9.075)
    ctx.fillRect(canvas.width/100*2.5, canvas.height/50*42, canvas.width/6.95, canvas.height/9.075)
    ctx.fillRect(canvas.width/50*38.9, canvas.height/50*42, canvas.width/4.626, canvas.height/9.075)
    ctx.fillRect(canvas.width/50*27.8, canvas.height/50*42, canvas.width/4.626, canvas.height/9.075)
    ctx.fillStyle = 'white';
    ctx.font = '35px Arial'
    ctx.textAlign = 'center';
    ctx.fillText("$1", canvas.width/12.288, canvas.height-canvas.height/18.15)
    ctx.fillText("$5", canvas.width/4.326, canvas.height-canvas.height/18.15)
    ctx.fillText("Bet", canvas.width/12.288, canvas.height-canvas.height/9.075)
    ctx.fillText("Bet", canvas.width/4.326, canvas.height-canvas.height/9.075)
    ctx.fillText(`Total Bet:`, canvas.width/2.603, canvas.height-canvas.height/9.075)
    ctx.fillText(`Win:`, canvas.width/1.551, canvas.height-canvas.height/9.075)
    ctx.fillText('Balance:', canvas.width/1.146, canvas.height-canvas.height/9.075)
    ctx.fillText(`$${win}`, canvas.width/1.551, canvas.height-canvas.height/18.15)
    ctx.fillText(`$${betnum}`, canvas.width/2.56, canvas.height-canvas.height/18.15)
    ctx.fillText(`$${playerbal}`, canvas.width/1.146, canvas.height-canvas.height/18.15)
    ctx.fillRect(canvas.width/12.4, canvas.height/9.355, canvas.width/3.572, canvas.height/1.481)
    ctx.fillRect(canvas.width/2.71, canvas.height/9.355, canvas.width/3.572, canvas.height/1.481)
    ctx.fillRect(canvas.width/1.523, canvas.height/9.355, canvas.width/3.58, canvas.height/1.481)
    ctx.strokeRect(canvas.width/3.09, canvas.height/50*42, canvas.width/6.95, canvas.height/9.075)
    ctx.strokeRect(canvas.width/5.75, canvas.height/50*42, canvas.width/6.95, canvas.height/9.075)
    ctx.strokeRect(canvas.width/100*2.5, canvas.height/50*42, canvas.width/6.95, canvas.height/9.075)
    ctx.strokeRect(canvas.width/50*38.9, canvas.height/50*42, canvas.width/4.626, canvas.height/9.075)
    ctx.strokeRect(canvas.width/50*27.8, canvas.height/50*42, canvas.width/4.626, canvas.height/9.075)

    ctx.strokeRect(canvas.width/13, canvas.height/10, canvas.width/1.159, canvas.height/1.452)
    ctx.strokeRect(canvas.width/13, canvas.height/10, canvas.width/3.475, canvas.height/1.452)
    ctx.strokeRect(canvas.width/2.742, canvas.height/10, canvas.width/3.475, canvas.height/1.452)
    ctx.strokeRect(canvas.width/1.5327, canvas.height/10, canvas.width/3.482, canvas.height/1.452)
    ctx.strokeStyle = '#0078ff'
    ctx.lineWidth = 5;
    ctx.strokeRect(canvas.width/12.4, canvas.height/9.355, canvas.width/3.572, canvas.height/1.481)
    ctx.strokeRect(canvas.width/2.71, canvas.height/9.355, canvas.width/3.572, canvas.height/1.481)
    ctx.strokeRect(canvas.width/1.523, canvas.height/9.355, canvas.width/3.58, canvas.height/1.481)
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
        ctx.drawImage(reel1img, canvas.width/11, canvas.height/7.26, canvas.width/3.84, canvas.height/1.815);
    };
    reel1img.src = `images/Fruits/${fruits[reel1]}.png`;
    let reel2img = new Image();
    reel2img.onload = function() {
        ctx.drawImage(reel2img, canvas.width/2.694, canvas.height/7.26, canvas.width/3.84, canvas.height/1.815);
    };
    reel2img.src = `images/Fruits/${fruits[reel2]}.png`;
    let reel3img = new Image();
    reel3img.onload = function() {
        ctx.drawImage(reel3img, canvas.width/1.49, canvas.height/7.26, canvas.width/3.84, canvas.height/1.815);
    };
    reel3img.src = `images/Fruits/${fruits[reel3]}.png`;
}

canvas.addEventListener('click', function(event)  {
    if (Math.sqrt( (event.offsetX-(canvas.width/50*25.6)) ** 2 + (event.offsetY-(canvas.height/50*44.5)) **2 ) < canvas.width/15.36) {
        spin();
        window.setTimeout(setTimeout(() => {
            clearInterval(drawIntervalId)
            if (reel1 == reel2 && reel2 == reel3) {
                win = betnum * 1000
                tr += win;
            }else if (reel1 == reel2 || reel1 == reel3 || reel2 == reel3) {
                win = betnum * 2
                tr+=win
            }
            else {
                tr -= betnum
            }
            draw();
            betnum = 0;
            win = 0;
        }, 3000))
    }else if (event.offsetX > canvas.width/100*2.5 && event.offsetX < canvas.width/100*2.5+canvas.width/6.95 && event.offsetY > canvas.height/50*42 && event.offsetY < canvas.height/50*42+canvas.height/9.075) {
        if (playerbal >= 1) {
            playerbal -= 1;
            betnum += 1;
            draw();
        }
    }else if (event.offsetX > canvas.width/5.75 && event.offsetX < canvas.width/5.75+canvas.width/6.95 && event.offsetY > canvas.height/50*42 && event.offsetY < canvas.height/50*42+canvas.height/9.075) {
        if (playerbal >= 5) {
            playerbal -= 5;
            betnum += 5;
            draw();
        }
    }
    else if (event.offsetX > window.innerWidth*0.9 && event.offsetY >  window.innerHeight*0.9) {
        let x = document.querySelector('.submit')
        let y = document.querySelector('.amount')
        y.value = tr
        x.click()
    }
})