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
class Player {
    hand;
    money;
    hasblackjack;
    bet;
    stand;

    constructor(money=0) {
        this.hand = [];
        this.money = money;
        this.hasblackjack = false;
        this.bet = 0;
        this.stand = false
    }

    getScore () {
        let score = 0;
        let hasAce = false;
        for (let i = 0; i < this.hand.length; i++) {
            let value = this.hand[i].value;
            if (value == 'ace') {
                value = 11;
                hasAce++;
            }
            if (value == "king" || value == "queen" || value == "jack" || value == '10') value = 10;
            value = Number(value)
            score += value;
        }
        while (score > 21 && hasAce > 0) {
            hasAce--; score-=10;
        }
        return score
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
        return amount;
    }

    drawCard(card) {
        this.hand.push(card);
    }
}

class Dealer {
    hand;
    hasblackjack;
    bet;
    openhand;

    constructor() {
        this.hand = [];
        let backcard = new Card('spades', 0)
        this.openhand = [backcard];
        this.hasblackjack = false;
        this.bet = 0;
    }

    getScore () {
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
        for (const card of this.centerCards) {
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
            if (card.value == 'ace') {
                values[12]++;
            }else if (card.value == 'king') {
                values[11]++;
            }else if (card.value == 'queen') {
                values[10]++;
            }else if (card.value == 'jack') {
                values[9]++;
            }else if (card.value == 'ten') {
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
                }else if (pair) {
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
        return amount;
    }

    drawCard(card) {
        this.hand.push(card);
    }

    hasBlackJack() {
        this.hasblackjack = true;
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.suit = suit;
        this.value = value;
        switch (this.value) {
            case 'ace':
                this.numval = 14;
                break;
            case 'king':
                this.numval = 13;
                break;
            case 'queen':
                this.numval = 12;
                break;
            case 'jack':
                this.numval = 11;
                break;
            case '10':
                this.numval = 10;
                break;
            default:
                this.numval = Number(this.value);
        }
        this.str = value + " of " + suit;
    }
}
class Deck {
    constructor(numOfDecks) {
        let suits = ['clubs', 'spades', 'hearts', 'diamonds']
        let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
        this.deck = [];
        for (let i = 0; i < numOfDecks; i++) {
            for (let i = 0; i < suits.length; i++) {
                for (let n = 0; n < values.length; n++) {
                    this.deck.push(new Card(suits[i], values[n]));
                }
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

class poker {
    numOfPlayers;
    playerlist;
    deck;

    constructor(numOfPlayers) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.dealerIndex = 0;
        this.deck = new Deck(1);
        this.deck.shuffle();
        this.middle = [];
        

        for (let i = 0; i < numOfPlayers; i++) {
            let player = new Player(100)
            this.playerlist.addPlayer(player)
        }
    }

    rotateDealer() {
        this.dealerIndex++;
        this.dealerIndex %= (this.numOfPlayers-1);
    }

    drawCards() {
        for (const player of this.playerlist) {
            player.drawCard(this.deck.draw());
        }
        for (const player of this.playerlist) {
            player.drawCard(this.deck.draw());
        }
    }
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

class pokerGUI {
    constructor(numOfPlayers) {
        this.ctx = canvas.getContext('2d');
        this.drawboard();
        this.bets = [1,5,10,25,100,500,1000]
        this.pot = 0
        this.chips = ['images\\PokerChips\\one.png', 'images\\PokerChips\\five.png', 'images\\PokerChips\\ten.png', 'images\\PokerChips\\twentyfive.png', 'images\\PokerChips\\hundred.png', 'images\\PokerChips\\fivehundred.png', 'images\\PokerChips\\thousand.png']
        this.betchips = []
        this.betstacks = []
        this.stage = 'game'
        this.startBal = playerBal
        this.resetButton = ''
        this.blackjackgame = new poker(2)
        this.deck = this.blackjackgame.deck
        this.buttons = []
        this.betAmount = 0
        this.player1 = new Player(playerBal)
        this.players = []
        this.activePlayer=50
        this.tempActivePlayer=0
        this.minbet = 0
        this.ge = false
        this.lastRaise = 0
        this.active = false
        this.turnOver = false
        this.nextP = false
        this.centerCards = []
        this.positions = [[100, window.innerHeight*0.5], [100, window.innerHeight*0.2],[window.innerWidth*0.8, window.innerHeight*0.2],[window.innerWidth*0.8, window.innerHeight*0.5]]
        for (let i = 0; i < numOfPlayers; i++) {
            this.players.push(new Player(Math.floor(Math.random()*10000)))
        }
        this.rotatePlayers = [this.player1]
        this.players.forEach((player) => {
            this.rotatePlayers.push(player)
        }) 
        
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

        if (this.stage == 'bet') {
            this.bet()
        }
        else if (this.stage == 'game') {
            this.game()
        }
    }

    drawChip(number, xPos) {
        let image = new Image()
        if (number == 'r') {
            
            image.src = 'images\\PokerChips\\reset.png'
            image.onload = () => {
                this.ctx.drawImage(image, xPos, window.innerHeight*0.85, 100, 100)
                let betship = new reset(xPos)
                this.resetButton =  betship
            }
        }
        else {let image = new Image()
            image.src = this.chips[number]
            image.onload = () => {
                this.ctx.drawImage(image, xPos, window.innerHeight*0.85, 100, 100)
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
        image.src = `images\\C@gards\\card_back_red.png`
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

    emptyCard (card, x, y) {
        let image = new Image()
        image.src = `images\\Cards\\card_back_red.png`
        image.onload = () => {
            this.ctx.drawImage(image, x, y, 130, 130*1.5)
        }
    }

    emptyHand (player, startX, startY) {
        let x = startX
        player.hand.forEach((card) => {
            this.emptyCard(card,x,startY)
            x+=150
        })
        if (player.stand) {
            this.ctx.fillStyle='gray'
        }
        else if (this.activePlayer == this.rotatePlayers.indexOf(player)) {
            this.ctx.fillStyle='yellow'
        }
        else {
            this.ctx.fillStyle='white'
        }
        let text = `Computer: ${player.money}`
        this.ctx.fillText(text, startX, startY+120+150)
    }

    computerCard (card, x, y) {
        let image = new Image()
        image.src = `images\\Cards\\${card.value}_of_${card.suit}.png`
        image.onload = () => {
            this.ctx.drawImage(image, x, y, 130, 130*1.5)
        }
    }

    computerHand (player, startX, startY) {
        let x = startX
        player.hand.forEach((card) => {
            this.computerCard(card,x,startY)
            x+=150
        })
        if (player.stand) {
            this.ctx.fillStyle='gray'
        }
        else if (this.activePlayer == this.rotatePlayers.indexOf(player)) {
            this.ctx.fillStyle='yellow'
        }
        else {
            this.ctx.fillStyle='white'
        }
        let text = `Computer: ${player.money}`
        this.ctx.fillText(text, startX, startY+120+150)
    }

    async startGame() {
        ctx.font = "40px Lato";
        let timeBetweenCards = 500
        this.stage = 'game'
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].hand.push(this.deck.draw())
            this.clearBoard()
            await this.sleep(timeBetweenCards)
        }
        this.player1.hand.push(this.deck.draw())
        this.clearBoard()
        await this.sleep(timeBetweenCards)
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].hand.push(this.deck.draw())
            this.clearBoard()
            await this.sleep(timeBetweenCards)
        }
        this.player1.hand.push(this.deck.draw())
        this.clearBoard()
        await this.sleep(timeBetweenCards)
        this.activePlayer = 0
        await this.start()
        this.turnOver = true
        this.clearBoard()
    }

    rotPlayers() {
        this.activePlayer++
        if (this.activePlayer > this.rotatePlayers.length-1) {
            this.activePlayer=0
        }
    }

    everyoneBet() {
        let peoples = 0
        for (let i = 0; i < this.rotatePlayers.length; i++) {
            if (this.rotatePlayers[i].stand) {
                peoples++
            }
            else if (this.rotatePlayers[i].bet >= this.minbet) {
                peoples++
            }
        }
        return !(peoples == this.rotatePlayers.length)
    }

    async start() {
        this.clearBoard()
        await this.sleep(1000)
        this.rotatePlayers[this.activePlayer].money -= 50/2
        this.rotatePlayers[this.activePlayer].bet = 25
        this.rotPlayers()
        this.minbet = 25
        this.clearBoard()
        await this.sleep(1000)
        this.rotatePlayers[this.activePlayer].money -= 50
        this.rotatePlayers[this.activePlayer].bet = 50
        this.rotPlayers()
        this.minbet = 50
        this.clearBoard()
    }

    async computer(i) {
        let action = Math.floor(Math.random()*3)
        if (action == 0) {
            this.rotatePlayers[i].stand = true
        }
        else if (action == 1) {
            this.pot += this.minbet-this.rotatePlayers[i].bet
            this.rotatePlayers[i].money -= this.minbet-this.rotatePlayers[i].bet
            this.rotatePlayers[i].bet = this.minbet
        }
        else {
            this.lastRaise = i
            this.pot += this.minbet-this.rotatePlayers[i].bet
            this.rotatePlayers[i].money -= this.minbet-this.rotatePlayers[i].bet
            this.rotatePlayers[i].bet = this.minbet
        }
    }

    drawButtons() {
        this.buttons = []
        if (!this.minbet) {
            let check = new Image()
            check.src = `images\\check.png`, 
            check.onload = () => {
                this.ctx.drawImage(check, window.innerWidth-480, window.innerHeight*0.87, 100, 100)
                for (let i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i].action == 'check') {
                        this.buttons.splice(i, 1)
                    }
                }
                let cc = new button(window.innerWidth-480, 'check')
                this.buttons.push(cc)
            }
        }
        let raise = new Image()
        raise.src = `images\\raise.png`, 
        raise.onload = () => {
            this.ctx.drawImage(raise, window.innerWidth-135, window.innerHeight*0.87, 100, 100)
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].action == 'raise') {
                    this.buttons.splice(i, 1)
                }
            }
            let rc = new button(window.innerWidth-135, 'raise')
            this.buttons.push(rc)
        }
        let call = new Image()
        call.src = `images\\call.png`, 
        call.onload = () => {
            this.ctx.drawImage(call, window.innerWidth-365, window.innerHeight*0.87, 100, 100)
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].action == 'call') {
                    this.buttons.splice(i, 1)
                }
            }
            let cc = new button(window.innerWidth-365, 'call')
            this.buttons.push(cc)
        }
        let fold = new Image()
        fold.src = `images\\fold.png`, 
        fold.onload = () => {
            this.ctx.drawImage(fold, window.innerWidth-250, window.innerHeight*0.87, 100, 100)
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].action == 'fold') {
                    this.buttons.splice(i, 1)
                }
            }
            let fc = new button(window.innerWidth-250, 'fold')
            this.buttons.push(fc)
        }
    }


    async gameLoop() {
        if (this.turnOver && !this.active && this.activePlayer != 50) {
            this.active = true
            if (this.rotatePlayers[this.activePlayer].stand) {
                this.rotPlayers()
                this.active = false
                this.clearBoard()
            }
            else if (this.activePlayer != 0) {
                this.computer(this.activePlayer)
                await this.sleep(1000)
                this.rotPlayers()
                this.active = false
                this.clearBoard()
            }
            else {
                this.active = false
            }
        }
    }

    async nextPhase() {
        await this.sleep (500)
        if (this.centerCards.length == 0) {
            for (let i = 0; i < 3; i++) {
                this.centerCards.push(this.deck.draw())
                this.clearBoard()
                await this.sleep(1000)
            }
        }
        else if (this.centerCards.length == 5 && !this.ge) {
            this.centerCards.splice(5, 1)
            this.endGame()
        }
        else {
            this.centerCards.push(this.deck.draw())
            this.clearBoard()
            await this.sleep(1000)
        }
        
        this.activePlayer = this.tempActivePlayer
        this.minbet = 1
        this.rotatePlayers.forEach((player) => {
            player.bet = 0
        })
        this.nextP = false
        this.clearBoard()
    }

    async game() {
        
        if ( this.turnOver && this.everyoneBet()) {
            this.gameLoop()
        }
        if (!this.everyoneBet() && this.turnOver && !this.nextP) {
            this.nextP = true
            this.tempActivePlayer = this.activePlayer
            this.activePlayer = 50
            this.nextPhase()
        }
        this.buttons = []
        this.imageHand(this.player1.hand, window.innerWidth/2-150, window.innerHeight*0.7)
        this.imageHand(this.centerCards, window.innerWidth/2-450, window.innerHeight*0.4)
        let text = `$${this.rotatePlayers[0].money}`
        if (this.rotatePlayers[0].stand) {
            this.ctx.fillStyle='gray'
        }
        else if (this.activePlayer == 0) {
            this.ctx.fillStyle='yellow'
            this.drawButtons()
        }
        else {
            this.ctx.fillStyle='white'
        }
        this.ctx.fillText(text, window.innerWidth/2-150, window.innerHeight*0.7+240)
        if (this.ge) {
            for (let i = 0; i < this.players.length; i++) {
                this.computerHand(this.players[i], this.positions[i][0], this.positions[i][1])
            }
        }
        else {
            for (let i = 0; i < this.players.length; i++) {
                this.emptyHand(this.players[i], this.positions[i][0], this.positions[i][1])
            }
        }
        ctx.fillStyle='#fff'
        let potText = `Pot: ${this.pot}`
        let betText = `Bet: ${this.minbet}`
        ctx.fillText(potText, window.innerWidth/2-100, window.innerHeight*0.2)
        ctx.fillText(betText, window.innerWidth/2-100, window.innerHeight*0.15)
     
        let fold = 0
        this.rotatePlayers.forEach((player) => {
            if (player.stand) {
                fold++
            }
        }) 
        if (fold >= this.rotatePlayers.length-1 && !this.ge) {
            this.endGame()
        }
    }

    

    getScore(player) {
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
        let start = 0;
        for (const card of player.hand) {
            cards.push(card)
        }
        for (const card of this.centerCards) {
            cards.push(card)
        }
        console.log(cards)
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
            if (card.value == 'ace') {
                values[12]++;
            }else if (card.value == 'king') {
                values[11]++;
            }else if (card.value == 'queen') {
                values[10]++;
            }else if (card.value == 'jack') {
                values[9]++;
            }else if (card.value == '10') {
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
            let counter = 0;
            if (suits[0] >= 5) {
                for (const card of cards) {
                    if (card.value == '10' || card.value == 'jack' || card.value == 'queen' || card.value == 'king' || card.value == 'ace') {
                        if (card.suit == 'diamonds') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[1] >= 5) {
                console.log('hi')
                for (const card of cards) {
                    console.log('hi2')
                    if (card.value == '10' || card.value == 'jack' || card.value == 'queen' || card.value == 'king' || card.value == 'ace') {
                        console.log(card)
                        if (card.suit == 'hearts') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[2] >= 5) {
                for (const card of cards) {
                    if (card.value == '10' || card.value == 'jack' || card.value == 'queen' || card.value == 'king' || card.value == 'ace') {
                        if (card.suit == 'clubs') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[3] >= 5) {
                for (const card of cards) {
                    if (card.value == '10' || card.value == 'jack' || card.value == 'queen' || card.value == 'king' || card.value == 'ace') {
                        if (card.suit == 'spades') {
                            counter++;
                        }
                    }
                }
            }
            if (counter >= 5) {
                return [1, 14]
            }
        }
        for (let i = 0; i < values.length-4; i++) {
            if (values[i] && values[i+1] && values[i+2] && values[i+3] && values[i+4]) {
                straight = true;
                start = 1;
                highest = i+6
            }
        }
        if (values[12] && values[0] && values[1] && values[2] && values[3]) {
            straight = true;
            highest = 14;
        }
        if (straight && flush) {
            let counter = 0;
            if (suits[0] >= 5) {
                for (const card of cards) {
                    if (card.value == values[start] || card.value == values[start+1] || card.value == values[start+2] || card.value == values[start+3] || card.value == values[start+4]) {
                        if (card.suit == 'diamonds') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[1] >= 5) {
                for (const card of cards) {
                    if (card.value == values[start] || card.value == values[start+1] || card.value == values[start+2] || card.value == values[start+3] || card.value == values[start+4]) {
                        if (card.suit == 'hearts') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[2] >= 5) {
                for (const card of cards) {
                    if (card.value == values[start] || card.value == values[start+1] || card.value == values[start+2] || card.value == values[start+3] || card.value == values[start+4]) {
                        if (card.suit == 'clubs') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[3] >= 5) {
                for (const card of cards) {
                    if (card.value == values[start] || card.value == values[start+1] || card.value == values[start+2] || card.value == values[start+3] || card.value == values[start+4]) {
                        if (card.suit == 'spades') {
                            counter++;
                        }
                    }
                }
            }
            if (counter >= 5) {
                return [2, (values[start+4])+2]
            }
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
                }else if (pair) {
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

    getWinner() {
        console.log('Get Winner')
        
    }

    move(action) {
        if (action == 'call') {
            this.pot += this.minbet-this.rotatePlayers[0].bet
            this.rotatePlayers[0].money -= this.minbet-this.rotatePlayers[0].bet
            this.rotatePlayers[0].bet = this.minbet
        }
        else if (action == 'fold') {
            this.rotatePlayers[0].stand=true
        }
        else if (action == 'raise') {
            this.pot += this.minbet-this.rotatePlayers[0].bet
            this.rotatePlayers[0].money -= this.minbet-this.rotatePlayers[0].bet
            this.rotatePlayers[0].bet = this.minbet
            let x = 'bad'
            while (Number(x) != x && x != '') {
                x = prompt('How much do you want to raise')
            }
            this.minbet += Number(x)
            this.rotatePlayers[0].money -= this.minbet-this.rotatePlayers[0].bet
            this.rotatePlayers[0].bet = this.minbet
            this.clearBoard()
        }
        else if (action == 'r') {
            
        }
        this.rotPlayers()
        this.clearBoard()
    }

    bet() {
        this.betchips = []
        let maxChip = 0
        for (let i = this.bets.length; i >= 0; i--) {
            if (this.bets[i] <= this.rotatePlayers[0].money) {
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
            this.drawChip(i, x)
            x+=112.5
        }
        this.drawChip('r', x)
        var txt = '$'+this.rotatePlayers[0].money
        ctx.fillStyle='#e98647'
        ctx.fillRect(window.innerWidth/2-ctx.measureText(txt).width-10, window.innerHeight*0.83-60, ctx.measureText(txt).width*3, 60)
        ctx.strokeStyle  = '#86391a'
        ctx.lineWidth = 12;
        ctx.strokeRect(window.innerWidth/2-ctx.measureText(txt).width-10, window.innerHeight*0.83-60, ctx.measureText(txt).width*3, 60)
        ctx.fillStyle='#fff'
        ctx.fillText(txt, window.innerWidth/2-10, window.innerHeight*0.83-15)
    }

    endGame() {
        this.ge = true
        this.getWinner()
        let a = document.querySelector('a')
        let gameended = document.querySelector('.GameEnded')
        let amount = document.querySelector('.amount')
        console.log('gameended')
        setTimeout(() => {
            console.log('gameENDED')
            let highest_scores = [];
            let highest_values = [];
            let ties = [];
            let people = [];
            for (const player of this.rotatePlayers) {
                if (!player.stand) {
                    let besthand = this.getScore(player)
                    console.log(besthand)
                    let score = besthand[0]
                    let value = besthand[1]
                    highest_scores.push(score)
                    highest_values.push(value)
                }
            }
            let min = highest_scores.reduce(function(a, b) {
                return Math.min(a, b);
            }, Infinity);
            console.log(min)
            for (let i = 0; i < highest_scores.length; i++) {
                if (highest_scores[i] == min) {
                    ties.push(highest_values[i])
                }
            }
            console.log(ties)
            let max = ties.reduce(function(a, b) {
                return Math.max(a, b);
            }, -Infinity);
            console.log(max)
            let counter = 0;
            for (let i = 0; i < ties.length; i++) {
                if (ties[i] == max) {
                    counter++;
                    people.push(i)
                }
            }
            console.log(people)
            let x = 0
            if (highest_values[0] == max) {
                x = highest_values[0]
            }
            else {
                x = 0
            }
            for (let i = 0; i < highest_values.length; i++) {
                
                if (highest_values[i] == max) {
                    let li = document.createElement('li');
                    li.setAttribute('class','item');
                    gameended.appendChild(li);
                    li.innerHTML=`Player ${i+1} has won and received ${this.pot/people.length}`;
                }
            }
            amount.textContent = x
            a.click()
        },1000)
    }

    clearBoard() {
        ctx.fillStyle = '#86391a'
        ctx.fillRect(0,0,window.innerWidth, window.innerHeight)
        this.drawboard()
    }

    addBet(amount) {
        this.betAmount+=amount
    }

    getBetAmount() {
        return this.betAmount
    }
}

let playerCount = document.querySelector('.numPlayers').textContent
let ctx = canvas.getContext('2d');
let bjgame = new pokerGUI(playerCount)
bjgame.startGame()
bjgame.clearBoard()

window.onresize = function() {
    ctx.fillStyle = '#86391a'
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
    bjgame.clearBoard()
}

function checkIfButtonClicked(x,y) {
    if (window.innerHeight*0.87 < y && window.innerHeight*0.87+100 > y)
    bjgame.buttons.forEach((but) => {
        if (but.click(x)) {
            bjgame.move(but.action)
        }
    })
}

canvas.addEventListener('click', (event) => {
    if (bjgame.stage == 'bet') {
        if (event.offsetY > window.innerHeight*0.83 && event.offsetY < window.innerHeight*0.83+100) {
            bjgame.betchips.forEach((elm) => {
                if (elm.click(event.offsetX)) {
                    bjgame.rotatePlayers[0].money-=elm.amount
                    bjgame.addBet(elm.amount)
                    bjgame.clearBoard()
                }
            })
            if (bjgame.resetButton.click(event.offsetX)) {
                bjgame.rotatePlayers[0].money=bjgame.startBal
                bjgame.betAmount = 0
                bjgame.clearBoard()
            }
            bjgame.clearBoard()
        }
    }
    else if (bjgame.stage == 'game') {
        checkIfButtonClicked(event.offsetX, event.offsetY)
    }
    if ((event.offsetX < 50 && event.offsetX > 0) && (event.offsetY < 50 && event.offsetY > 0))
    {
        window.location.href = '/'
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key == ' ') {
        
    }
})