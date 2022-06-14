class Card {
    suit;
    value;
    numval;
    str;
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        switch (this.value) {
            case 'ace':
                this.numval = 1;
                break;
            case 'king':
                this.numval = 0;
                break;
            case 'queen':
                this.numval = 0;
                break;
            case 'jack':
                this.numval = 0;
                break;
            case '10':
                this.numval = 0;
                break;
            default:
                this.numval = Number(this.value);
        }
        this.str = value + " of " + suit;
    }
}
class Deck {
    constructor() {
        let suits = ['clubs', 'spades', 'hearts', 'diamonds']
        let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
        this.deck = [];
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new Card(suits[i], values[n]));
            }
        }
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new Card(suits[i], values[n]));
            }
        }
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new Card(suits[i], values[n]));
            }
        }
    }

    draw() {
        let card = this.deck[0];
        this.deck.splice(0, 1);
        return card;
    }

    shuffle() {
        // Fisher-Yates algorithm
        for (let i = this.deck.length - 1; i > 0; i--) {
            // randomly choose a remaining element
            let j = Math.floor(Math.random() * (i + 1))
            let temp = this.deck[i]

            // swap the positions of the chosen element with the current element
            this.deck[i] = this.deck[j]
            this.deck[j] = temp;
        }
    }
}
class Player {
    hand;
    money;
    bet;
    middle;
    self;
    banker;
    tie;

    constructor(money) {
        this.hand = [];
        this.money = money;
        this.bet = 0;
        this.middle = [];
        this.self = false;
        this.banker = false;
        this.tie = false;
    }

    getScore () {
        let score = 0;
        let hasAce = false;
        for (let i = 0; i < this.hand.length; i++) {
            let value = this.hand[i].value;
            if (value == 'A') {
                value = 11;
                hasAce = true;
            } else if (value == "K" || value == "Q" || value == "J" || value == 'T') {
                value = 10;
            }
            value = Number(value)
            score += value;
        }
        if (score > 21 && hasAce) {
            if (score > 31) {
                return score-10;
            }
            return score-10;
        }else if (score > 21) {
            return score;
        }else {
            return score;
        }
    }

    getpokerscore(player) {
        let suits = [0, 0, 0, 0]
        let values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let flush = false;
        let straight = false;
        let royal = false;
        let three = false;
        let pair = false;
        let twopair = false;
        let highest = 0;
        let cards = [];
        for (const card of player.hand) {
            cards.push(card)
        }
        for (const card of player.middle) {
            cards.push(card)
        }
        for (const card of cards) {
            if (card.suit == 'diamonds') {
                suits[0]++;
            }else if (card.suit == 'hearts') {
                suits[1]++;
            }else if (card.suit == 'clubs') {
                suits[2]++;
            }else if (card.suit == 'spades') {
                suits[3]++;
            }
            if (card.value == 'A') {
                values[12]++;
            }else if (card.value == 'K') {
                values[11]++;
            }else if (card.value == 'Q') {
                values[10]++;
            }else if (card.value == 'J') {
                values[9]++;
            }else if (card.value == 'T') {
                values[8]++;
            }else {
                values[card.value-2]++;
            }
        }
        for (const suit of suits) {
            if (suit >= 5) {
                flush = true;
            }
        }
        if (values[12] && values[11] && values[10] && values[9] && values[8]) {
            royal = true;
        }
        if (royal && flush) {
            return [1, 14]
        }
        for (let i = 0; i < values.length-5; i++) {
            if (values[i] && values[i+1] && values[i+2] && values[i+3] && values[i+4]) {
                straight = true;
                highest = i+6
            }
        }
        if (straight && flush) {
            return [2, highest]
        }
        for (let i = 0; i < values.length; i++) {
            if (values[i] >= 4) {
                return [3, i+2]
            }else if (values[i] == 3) {
                three = true;
                highest = i+2
            }else if (values[i] == 2) {
                if (twopair) {
                    highest = i+2
                }
                if (pair) {
                    twopair = true;
                    highest = i+2
                }else {
                    pair = true;
                    if (!three) {
                        highest = i+2
                    }
                }
            }else if (!three && !pair &&  !flush && !straight) {
                highest = i+2;
            }
        }
        if (three && pair) {
            return [4, highest]
        } else if (flush) {
            return [5, highest]
        }else if (straight) {
            return [6, highest]
        }else if (three) {
            return [7, highest]
        }else if (twopair) {
            return [8, highest]
        }else if (pair) {
            return [9, highest]
        }else {
            return [10, highest]
        }
    }

    receiveMoney(amount) {
        this.money += amount;
    }

    placeBet(amount) {
        if (amount > this.money) {
            amount = this.money;
            this.money = 0;
        } else {
            this.money -= amount;
        }
        this.bet = amount;
    }

    drawCard(card) {
        this.hand.push(card);
    }

    hasBlackJack() {
        this.hasBlackJack = true;
    }
}
class PlayerList {
    players;

    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        if (! this.players.includes(player)){
            this.players.push(player);
        }
    }

    removePlayer(player){
        let index = this.players.indexOf(player);
        if (index > -1)
            this.players.splice(index, 1);
    }
}
class Baccarat {
    numOfPlayers;
    playerlist;
    deck;
    playerhand;
    dealerhand;

    constructor(numOfPlayers) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.deck = new Deck;
        this.deck.shuffle();
        this.playerhand = [];
        this.dealerhand = [];
        this.playertotal = 0;
        this.dealertotal = 0;

        for (let i = 0; i < numOfPlayers; i++) {
            this.playerlist.addPlayer(new Player(100))
        }
    }

    bet(player, amount) {
        if (amount > player.money) {
            amount = player.money;
            player.money = 0;
        }else {
            player.money -= amount;
        }
        player.bet += amount;
    }
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}
class betchip {
    constructor(amount,x) {
        this.amount = amount
        this.x = x
    }

    click(x) {
        if (this.x < x && this.x+100 > x) {
            return true
        }
        return false
    }
}

class reset {
    constructor(x) {
        this.x = x
    }

    click(x) {
        if (this.x < x && this.x+100 > x) {
            return true
        }
        return false
    }
}

class button {
    constructor(x, job) {
        this.x = x
        this.action = job
    }

    click(x) {
        if (this.x < x && this.x+100 > x) {
            return true
        }
        return false
    }
}
class bc {
    constructor(numOfPlayers) {
        this.ctx = canvas.getContext('2d');
        this.bets = [1,5,10,25,100,500,1000]
        this.chips = ['images\\PokerChips\\one.png', 'images\\PokerChips\\five.png', 'images\\PokerChips\\ten.png', 'images\\PokerChips\\twentyfive.png', 'images\\PokerChips\\hundred.png', 'images\\PokerChips\\fivehundred.png', 'images\\PokerChips\\thousand.png']
        this.betchips = []
        this.betstacks = []
        this.stage = 'bet'
        this.startBal = playerBal
        this.resetButton = ''
        this.baccaratgame = new Baccarat(2)
        this.deck = this.baccaratgame.deck
        this.buttons = []
        this.betAmount = 0
        this.player1 = new Player();
        this.player0 = new Player();
        this.players = []
        this.positions = [[100, window.innerHeight*0.3],[window.innerWidth*.6, window.innerHeight*0.3],[100, window.innerHeight*0.5],[window.innerWidth*0.7, window.innerHeight*0.5]]
        this.tiepositions = [[window.innerWidth/2.27, window.innerHeight*.25], [window.innerWidth/1.95, window.innerHeight*.25], [window.innerWidth/2.27, window.innerHeight*.39], [window.innerWidth/1.95, window.innerHeight*.39], [window.innerWidth/2.27, window.innerHeight*.53]];
        this.playerpositions = [[window.innerWidth/9, window.innerHeight*.15+340], [window.innerWidth/9+102, window.innerHeight*.15+340], [window.innerWidth/9+204, window.innerHeight*.15+340], [window.innerWidth/9+306, window.innerHeight*.15+340], [window.innerWidth/9+408, window.innerHeight*.15+340]];
        this.dealerpositions = [[window.innerWidth*0.58+408, window.innerHeight*.15+340], [window.innerWidth*0.58+306, window.innerHeight*.15+340], [window.innerWidth*0.58+204, window.innerHeight*.15+340], [window.innerWidth*0.58+102, window.innerHeight*.15+340], [window.innerWidth*0.58, window.innerHeight*.15+340]];
        this.positionnums = [0, 0, 0]
        this.betlocations = []
        this.drawboard();
        console.log(numOfPlayers)
        for (let i = 0; i < numOfPlayers; i++) {
            console.log('Player Added')
            this.players.push(new Player())
        }
        console.log(this.players)
        
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    drawboard() {
        this.exitButton = new Image()
        this.exitButton.src='images\\exit.png'
        this.exitButton.onload = () => {
            this.ctx.drawImage(this.exitButton, 0, 0, 50, 50)
        }
        this.ctx.fillStyle = '#e98647'
        this.ctx.beginPath();
        this.ctx.ellipse(window.innerWidth/2, 0, innerWidth/1.3, innerHeight/1, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = '#86391a'
        this.ctx.beginPath();
        this.ctx.ellipse(window.innerWidth/2, 0, innerWidth/1.35, innerHeight/1.05, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = '#e98647'
        this.ctx.beginPath();
        this.ctx.ellipse(window.innerWidth/2, 0, innerWidth/1.36, innerHeight/1.06, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = '#1f7e4a'
        this.ctx.beginPath();
        this.ctx.ellipse(window.innerWidth/2, 0, innerWidth/1.37, innerHeight/1.07, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = 'DarkRed';
        this.ctx.roundRect(window.innerWidth/9, window.innerHeight*.15, 500, 335, 20).fill();
        this.ctx.roundRect(window.innerWidth*.58, window.innerHeight*.15, 500, 335, 20).fill();
        this.ctx.fillStyle = 'black';
        this.ctx.font = '70px Arial';
        this.ctx.fillText("Player's Hand:", window.innerWidth/8, window.innerHeight*0.25)
        this.ctx.fillText("Dealer's Hand:", window.innerWidth*0.59, window.innerHeight*0.25)
        this.ctx.fillText("Tie:", window.innerWidth*.475, window.innerHeight*0.24)

        console.log(this.betlocations)
        for (let i = 0; i < this.betlocations.length; i++) {
            console.log(this.betlocations[i])
            this.drawChip(this.betlocations[i][0], this.betlocations[i][1], this.betlocations[i][2])
        }

        if (this.stage == 'bet') {
            this.bet()
        }
        else if (this.stage == 'game') {
            this.game()
        }
    }

    drawChip(number, xPos, yPos) {
        let image = new Image()
        if (number == 'reset' || number == 'p1' || number == 'p2' || number == 'p3' || number == 'p4' || number == 'p5') {
            
            image.src = `images\\PokerChips\\${number}.png`
            image.onload = () => {
                this.ctx.drawImage(image, xPos, yPos, 100, 100)
                let betship = new reset(xPos)
                this.resetButton =  betship
            }
        }
        else {let image = new Image()
            image.src = this.chips[number]
            image.onload = () => {
                this.ctx.drawImage(image, xPos, yPos, 100, 100)
                let betship = new betchip(this.bets[number], xPos)
                this.betchips.push(betship)
            }
        }
    }

    imageCard (card, x, y) {
        let image = new Image()
        if (card.value)
            image.src = `images\\Cards\\${card.value}_of_${card.suit}.png` 
        else
            image.src = `images\\Cards\\card_back_red.png`
        image.onload = () => {
            this.ctx.drawImage(image, x, y, 130, 130*1.5)
        }
    }

    imageHand (cards, startX, startY) {
        let x = startX
        cards.forEach((card) => {
            this.imageCard(card,x,startY)
            x+=150
        })
    }

    async startGame() {
        let timeBetweenCards = 500
        this.stage = 'game'
        let card = this.deck.draw()
        this.player1.hand.push(card)
        this.baccaratgame.playertotal += card.numval;
        this.baccaratgame.playertotal %= 10;
        this.clearBoard()
        await this.sleep(timeBetweenCards)
        card = this.deck.draw()
        this.player0.hand.push(card)
        this.baccaratgame.dealertotal += card.numval;
        this.baccaratgame.dealertotal %= 10;
        this.clearBoard()
        await this.sleep(timeBetweenCards)
        card = this.deck.draw()
        this.player1.hand.push(card)
        this.baccaratgame.playertotal += card.numval;
        this.baccaratgame.playertotal %= 10;
        this.clearBoard()
        await this.sleep(timeBetweenCards)
        card = this.deck.draw()
        this.player0.hand.push(card)
        this.baccaratgame.dealertotal += card.numval;
        this.baccaratgame.dealertotal %= 10;
        this.clearBoard()
        await this.sleep(timeBetweenCards*3)
        if (this.baccaratgame.playertotal == 8 || this.baccaratgame.playertotal == 9 || this.baccaratgame.dealertotal == 9|| this.baccaratgame.dealertotal == 8) {

        }else if (this.baccaratgame.playertotal == 6 || this.baccaratgame.playertotal == 7) {
            
        }else {
            let card = this.deck.draw()
            this.player1.hand.push(card)
            this.baccaratgame.playertotal += card.numval;
            this.baccaratgame.playertotal %= 10;
        }
        this.clearBoard()
        await this.sleep(timeBetweenCards)
        if (this.baccaratgame.playertotal == 8 || this.baccaratgame.playertotal == 9 || this.baccaratgame.dealertotal == 9|| this.baccaratgame.dealertotal == 8) {
        }else if (this.baccaratgame.dealertotal == 7) {
        }else if (this.baccaratgame.dealertotal == 6) {
            if (this.baccaratgame.playertotal == 6 || this.baccaratgame.playertotal == 7) {
                let card = this.deck.draw()
                this.player0.hand.push(card)
                this.baccaratgame.dealertotal += card.numval;
                this.baccaratgame.dealertotal %= 10;
            }
        }else if (this.baccaratgame.dealertotal == 5) {
            if (this.baccaratgame.playertotal == 4 || this.baccaratgame.playertotal == 5 || this.baccaratgame.playertotal == 6 || this.baccaratgame.playertotal == 7) {
                let card = this.deck.draw()
                this.player0.hand.push(card)
                this.baccaratgame.dealertotal += card.numval;
                this.baccaratgame.dealertotal %= 10;
            }
        }else if (this.baccaratgame.dealertotal == 4) {
            if (this.baccaratgame.playertotal != 0 && this.baccaratgame.playertotal != 1 && this.baccaratgame.playertotal != 8 && this.baccaratgame.playertotal != 9) {
                let card = this.deck.draw()
                this.player0.hand.push(card)
                this.baccaratgame.dealertotal += card.numval;
                this.baccaratgame.dealertotal %= 10;
            }
        }else if (this.baccaratgame.dealertotal == 3) {
            if (this.baccaratgame.playertotal != 8) {
                let card = this.deck.draw()
                this.player0.hand.push(card)
                this.baccaratgame.dealertotal += card.numval;
                this.baccaratgame.dealertotal %= 10;
            }
        }else {
            let card = this.deck.draw()
            this.player0.hand.push(card)
            this.baccaratgame.dealertotal += card.numval;
            this.baccaratgame.dealertotal %= 10;
        }
    }

    game() {
        this.buttons = []
        this.imageHand(this.player1.hand, window.innerWidth/8, this.positions[0][1])
        this.imageHand(this.player0.hand, this.positions[1][0], this.positions[1][1])
        let baccaratRule = new Image()
        baccaratRule.onload = function() {
            ctx.drawImage(baccaratRule, canvas.width*.42, canvas.height*.65, 275, 275);
        };
        baccaratRule.src = 'images/baccarat_rules.png';
        ctx.fillStyle='#fff'
        let betText = `Player Bet: ${this.getBetAmount()}`
        ctx.fillText(betText, 0, window.innerHeight*0.95)
        this.endGame();
    }

    bet() {
        this.betchips = []
        let maxChip = 0
        for (let i = this.bets.length; i >= 0; i--) {
            if (this.bets[i] <= playerBal) {
                maxChip = i+1
                break
            }
        }
        maxChip++
        ctx.fillStyle = "#86391a"
        ctx.fillRect(window.innerWidth/2-maxChip/2*100-25, window.innerHeight*0.83, 112.5*(maxChip)+50, 150)
        ctx.fillStyle = "#e98647"
        ctx.fillRect(window.innerWidth/2-maxChip/2*100-12, window.innerHeight*0.83+12, 112.5*(maxChip)+26, 126)
        let x = window.innerWidth/2-maxChip/2*100
        maxChip--
        for (let i = 0; i < maxChip; i++) {
            this.drawChip(i, x, window.innerHeight*0.85)
            x+=112.5
        }
        this.drawChip('reset', x, window.innerHeight*0.85)
        ctx.font = "40px Lato";
        var txt = '$'+playerBal
        ctx.fillStyle='#e98647'
        ctx.fillRect(window.innerWidth/2-ctx.measureText(txt).width-10, window.innerHeight*0.83-60, ctx.measureText(txt).width*3, 60)
        ctx.strokeStyle  = '#86391a'
        ctx.lineWidth = 12;
        ctx.strokeRect(window.innerWidth/2-ctx.measureText(txt).width-10, window.innerHeight*0.83-60, ctx.measureText(txt).width*3, 60)
        ctx.fillStyle='#fff'
        ctx.fillText(txt, window.innerWidth/2-10, window.innerHeight*0.83-15,)
        let betText = `Player Bet: ${this.getBetAmount()}`
        ctx.fillText(betText, 0, window.innerHeight*0.95)
        this.buttons = []
        let betplayer = new Image()
        betplayer.src = `images\\hit.png`, 
        betplayer.onload = () => {
            this.ctx.drawImage(betplayer, window.innerWidth*.235, window.innerHeight*0.35, 100, 100)
        }
        let betdealer = new Image();
        betdealer.src = `images\\hit.png`,
        betdealer.onload = () => {
            this.ctx.drawImage(betdealer, window.innerWidth*.715, window.innerHeight*0.35, 100, 100)
        }
        let bettie = new Image();
        bettie.src = `images\\hit.png`,
        bettie.onload = () => {
            this.ctx.drawImage(bettie, window.innerWidth*.475, window.innerHeight*0.35, 100, 100)
        }
    }

    endGame() {
        console.log('Game ended')
        let a = document.querySelector('a')
        let gameended = document.querySelector('.GameEnded')
        let profit = document.querySelector('.profit')
        let player = document.querySelector('.player')
        let amount = document.querySelector('.amount')

        player.textContent = `Player total: ${this.baccaratgame.playertotal}`

        if (this.baccaratgame.playertotal > this.baccaratgame.dealertotal) {
            if (this.player1.self) {
                gameended.textContent = 'You won'
                gameended.classList.add('green-text')
                profit.textContent = `Profit: ` + (this.betAmount*(2)-this.betAmount)
                amount.value = this.betAmount*(2)-this.betAmount
            }else {
                gameended.textContent = 'You lost'
                if (gameended.classList.contains('green-text')) {
                    gameended.classList.remove('green-text')
                }
                gameended.classList.add('red-text')
                profit.textContent = `Profit: ` + (-this.betAmount)
                amount.value = -this.betAmount
            }
        }
        else if (this.baccaratgame.playertotal < this.baccaratgame.dealertotal) {
            if (this.player1.banker) {
                gameended.textContent = 'You won'
                gameended.classList.add('green-text')
                let winnings = this.betAmount*(2)-this.betAmount
                winnings -= winnings/100*5
                profit.textContent = `Profit: ` + (winnings)
                amount.value = winnings
            }else {
                gameended.textContent = 'You lost'
                if (gameended.classList.contains('green-text')) {
                    gameended.classList.remove('green-text')
                }
                gameended.classList.add('red-text')
                profit.textContent = `Profit: ` + (-this.betAmount)
                amount.value = -this.betAmount
            }
        }
        else {
            if (this.player1.tie) {
                gameended.textContent = 'You won'
                gameended.classList.add('green-text')
                profit.textContent = `Profit: ` + (this.betAmount*(8)-this.betAmount)
                amount.value = this.betAmount*(9)-this.betAmount
            }else {
                gameended.textContent = 'You lost'
                if (gameended.classList.contains('green-text')) {
                    gameended.classList.remove('green-text')
                }
                gameended.classList.add('red-text')
                profit.textContent = `Profit: ` + (-this.betAmount)
                amount.value = -this.betAmount
            }
        }
        setTimeout(() => {
            a.click()
        }, 5000) 
    }

    clearBoard() {
        ctx.fillStyle = '#86391a'
        ctx.fillRect(0,0,window.innerWidth, window.innerHeight)
        this.drawboard()
    }

    addBet(amount) {
        this.betAmount+=amount
        console.log(this.betAmount, 'added', this.getBetAmount())
    }

    getBetAmount() {
        return this.betAmount
    }
}

let playerCount = Number(document.querySelector('.playercount').dataset.playercount)
let ctx = canvas.getContext('2d');
let bcgame = new bc(playerCount)
bcgame.bet()

window.onresize = function() {
    ctx.fillStyle = '#86391a'
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
    bcgame.clearBoard()
}

canvas.addEventListener('click', (event) => {
    console.log(Math.sqrt( (event.offsetX-(window.innerWidth*.475)) ** 2 + (event.offsetY-(window.innerHeight*0.35)) **2 ))
    if (bcgame.stage == 'bet') {
        if (event.offsetY > window.innerHeight*0.83 && event.offsetY < window.innerHeight*0.83+100) {
            bcgame.betchips.forEach((elm) => {
                if (elm.click(event.offsetX)) {
                    playerBal-=elm.amount
                    bcgame.addBet(elm.amount)
                    bcgame.clearBoard()
                }
            })
            if (bcgame.resetButton.click(event.offsetX)) {
                playerBal=bcgame.startBal
                bcgame.betAmount = 0
                bcgame.clearBoard()
            }
            
        }
        if (Math.sqrt( (event.offsetX-(window.innerWidth*.235)) ** 2 + (event.offsetY-(window.innerHeight*0.35)) **2 ) < 100) {
            bcgame.player1.self = true;
            bcgame.player1.banker = false;
            bcgame.player1.tie = false;
            bcgame.drawChip('p1', bcgame.playerpositions[0][0], bcgame.playerpositions[0][1])
            bcgame.betlocations.push(['p1', bcgame.playerpositions[0][0], bcgame.playerpositions[0][1]])
            bcgame.positionnums[0] =1;
            bcgame.positionnums[1] = 0;
            bcgame.positionnums[2] = 0;
            bcgame.clearBoard();
        }else if (Math.sqrt( (event.offsetX-(window.innerWidth*.715)) ** 2 + (event.offsetY-(window.innerHeight*0.35)) **2 ) < 100) {
            bcgame.player1.banker = true;
            bcgame.player1.self = false;
            bcgame.player1.tie = false;
            bcgame.drawChip('p1', bcgame.dealerpositions[0][0], bcgame.dealerpositions[0][1])
            bcgame.betlocations.push(['p1', bcgame.dealerpositions[0][0], bcgame.dealerpositions[0][1]])
            bcgame.positionnums[0] = 0;
            bcgame.positionnums[1] = 1;
            bcgame.positionnums[2] = 0;
            bcgame.clearBoard();
        }else if (Math.sqrt( (event.offsetX-(window.innerWidth*.475)) ** 2 + (event.offsetY-(window.innerHeight*0.35)) **2 ) < 100) {
            bcgame.player1.tie = true;
            bcgame.player1.self = false;
            bcgame.player1.banker = false;
            bcgame.betlocations.push(['p1', bcgame.tiepositions[0][0], bcgame.tiepositions[0][1]])
            bcgame.positionnums[0] = 0;
            bcgame.positionnums[1] = 0;
            bcgame.positionnums[2] = 1;
            bcgame.clearBoard();
        }
    }
    if ((event.offsetX < 50 && event.offsetX > 0) && (event.offsetY < 50 && event.offsetY > 0))
    {
        console.log('true')
        window.location.href = '/'
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key == ' ') {
        if (bcgame.stage == 'bet') {
            if (bcgame.player1.self || bcgame.player1.banker || bcgame.player1.tie) {
                if (bcgame.betAmount > 0) {
                    console.log(bcgame.players.length)
                    for (let i = 0; i < bcgame.players.length; i++) {
                        let rand = Math.floor(Math.random() * 3)
                        if (rand == 0) {
                            bcgame.positionnums[0]+=1;
                            bcgame.betlocations.push([`p${i+2}`, bcgame.playerpositions[bcgame.positionnums[0]-1][0], bcgame.playerpositions[bcgame.positionnums[0]][1]])
                        }else if (rand == 1) {
                            bcgame.positionnums[1]+=1;
                            bcgame.betlocations.push([`p${i+2}`, bcgame.dealerpositions[bcgame.positionnums[1]-1][0], bcgame.dealerpositions[bcgame.positionnums[1]][1]])
                        }else {
                            bcgame.positionnums[2]+=1;
                            bcgame.betlocations.push([`p${i+2}`, bcgame.tiepositions[bcgame.positionnums[2]-1][0], bcgame.tiepositions[bcgame.positionnums[2]-1][1]])
                        }
                        
                    }
                    bcgame.startGame()
                }
            }
        }
    }
})