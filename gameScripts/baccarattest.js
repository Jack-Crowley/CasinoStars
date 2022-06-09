class Card {
    suit;
    value;
    numval;
    str;
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        switch (this.value) {
            case 'A':
                this.numval = 14;
                break;
            case 'K':
                this.numval = 13;
                break;
            case 'Q':
                this.numval = 12;
                break;
            case 'J':
                this.numval = 11;
                break;
            case 'T':
                this.numval = 10;
                break;
            default:
                this.numval = Number(this.value);
        }
        this.str = value + " of " + suit;
    }
}
class BaccaratCard extends Card {
    suit;
    value;
    numval;
    str;
    constructor(suit, value) {
        super(suit, value)
        this.suit = suit;
        this.value = value;
        switch (this.value) {
            case 'A':
                this.numval = 1;
                break;
            case 'K':
                this.numval = 0;
                break;
            case 'Q':
                this.numval = 0;
                break;
            case 'J':
                this.numval = 0;
                break;
            case 'T':
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
        let values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
        this.deck = [];
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new BaccaratCard(suits[i], values[n]));
            }
        }
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new BaccaratCard(suits[i], values[n]));
            }
        }
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new BaccaratCard(suits[i], values[n]));
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
    hasblackjack;
    bet;
    totalbet;
    middle;
    fold;
    check;

    constructor(money) {
        this.hand = [];
        this.money = money;
        this.hasblackjack = false;
        this.bet = 0;
        this.totalbet = 0;
        this.middle = [];
        this.fold = false;
        this.check = false;
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
class BaccaratPlayer extends Player {
    self;
    banker;
    tie;
    left;
    right;

    constructor(money) {
        super(money)
        this.self = false;
        this.banker = false;
        this.tie = false;
        this.left = false;
        this.right = false;
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
            this.playerlist.addPlayer(new BaccaratPlayer(100))
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

const {question} = require(`readline-sync`)

let run = 1;
while (run) {
    let game = new Baccarat(4);

    for (let i = 0; i < game.playerlist.players.length; i++) {
        console.log(`Player ${i+1}:`)
        let betOn = question(`Would you like to bet on your hand (1), the banker's hand (2), or a tie (3)? `)
        let bet = Number(question(`How much money would you like to bet? `))
        if (betOn == '1') {
            game.playerlist.players[i].self = true;
        }else if (betOn == '2') {
            game.playerlist.players[i].banker = true;
        }else {
            game.playerlist.players[i].tie = true;
        }
        game.bet(game.playerlist.players[i], bet)
    }

    game.playerhand.push(game.deck.draw())
    game.playertotal+= game.playerhand[0].numval
    game.dealerhand.push(game.deck.draw())
    game.dealertotal+= game.dealerhand[0].numval
    game.playerhand.push(game.deck.draw())
    game.playertotal+= game.playerhand[1].numval
    game.dealerhand.push(game.deck.draw())
    game.dealertotal+= game.dealerhand[1].numval
    game.dealertotal %= 10;
    game.playertotal %= 10;

    if (game.dealertotal == 8 || game.dealertotal == 9 || game.playertotal == 8 || game.playertotal == 9) {
        console.log(`There is a natural.`)
    }else if (game.playertotal <= 5) {
        console.log(`The player's cards are: `)
        for (const card of game.playerhand) {
            console.log(`\t${card.str}`)
        }
        console.log(`and has a total of ${game.playertotal}`)
        let card = game.deck.draw();
        console.log(`They drew the ${card.str}.`)
        game.playerhand.push(card)
        game.playertotal+= game.playerhand[2].numval
        game.playertotal %= 10;
    }else if (game.playertotal == 6 || game.playertotal == 7) {
        console.log(`The player's cards are: `)
        for (const card of game.playerhand) {
            console.log(`\t${card.str}`)
        }
        console.log(`and has a total of ${game.playertotal}`)
        console.log('They stand.')
    }
    if (game.dealertotal == 8 || game.dealertotal == 9 || game.playertotal == 8 || game.playertotal == 9) {
    }else {
        console.log(`The dealer's cards are: `)
        for (const card of game.dealerhand) {
            console.log(`\t${card.str}`)
        }
        console.log(`and has a total of ${game.dealertotal}`)
        if (game.dealertotal == 7) {
            console.log(`They stand.`)
        }else if (game.dealertotal == 6) {
            if (game.playertotal == 6 || game.playertotal == 7) {
                let card = game.deck.draw()
                game.dealerhand.push(card)
                console.log(`They drew the ${card.str}`)
                game.dealertotal += game.dealerhand[2].numval
                game.dealertotal %= 10;
            }else {
                console.log(`They stand.`)
            }
        }else if (game.dealertotal == 5) {
            if (game.playertotal == 4 || game.playertotal == 5 || game.playertotal == 6 || game.playertotal == 7) {
                let card = game.deck.draw()
                game.dealerhand.push(card)
                console.log(`They drew the ${card.str}`)
                game.dealertotal+= game.dealerhand[2].numval
                game.dealertotal %= 10;
            }else {
                console.log(`They stand.`)
            }
        }else if (game.dealertotal == 4) {
            if (game.playertotal == 2 || game.playertotal == 3 || game.playertotal == 4 || game.playertotal == 5 || game.playertotal == 6 || game.playertotal == 7) {
                let card = game.deck.draw()
                game.dealerhand.push(card)
                console.log(`They drew the ${card.str}`)
                game.dealertotal+= game.dealerhand[2].numval
                game.dealertotal %= 10;
            }else {
                console.log(`They stand.`)
            }
        }else if (game.dealertotal == 4) {
            if (game.playertotal == 0 || game.playertotal == 1 || game.playertotal == 2 || game.playertotal == 3 || game.playertotal == 4 || game.playertotal == 5 || game.playertotal == 6 || game.playertotal == 7 || game.playertotal == 9) {
                let card = game.deck.draw()
                game.dealerhand.push(card)
                console.log(`They drew the ${card.str}`)
                game.dealertotal+= game.dealerhand[2].numval
                game.dealertotal %= 10;
            }else {
                console.log(`They stand.`)
            }
        }else {
            let card = game.deck.draw()
            game.dealerhand.push(card)
            console.log(`They drew the ${card.str}`)
            game.dealertotal+= game.dealerhand[2].numval
            game.dealertotal %= 10;
        }
    }
    console.log(`Player cards are:`)
    for (const card of game.playerhand) {
        console.log(card.str)
    }
    console.log(`and has a total of ${game.playertotal}`)
    console.log(`Banker cards are:`)
    for (const card of game.dealerhand) {
        console.log(card.str)
    }
    console.log(`and has a total of ${game.dealertotal}`)
    if (game.dealertotal > game.playertotal) {
        console.log(`The Banker wins.`)
        for (let i = 0; i < game.playerlist.players.length; i++) {
            if (game.playerlist.players[i].banker) {
                console.log(`Player ${i+1} has won and has gotten ${game.playerlist.players[i].bet * 2}`)
                game.playerlist.players[i].receiveMoney(game.playerlist.players[i].bet * 2)
            }
        }
    }else if (game.dealertotal < game.playertotal) {
        console.log(`The Player wins.`)
        for (let i = 0; i < game.playerlist.players.length; i++) {
            if (game.playerlist.players[i].self) {
                console.log(`Player ${i+1} has won and has gotten ${game.playerlist.players[i].bet * 2}`)
                game.playerlist.players[i].receiveMoney(game.playerlist.players[i].bet * 2)
            }
        }
    }else {
        console.log(`It is a tie.`)
        for (let i = 0; i < game.playerlist.players.length; i++) {
            if (game.playerlist.players[i].tie) {
                console.log(`Player ${i+1} has won and has gotten ${game.playerlist.players[i].bet * 9}`)
                game.playerlist.players[i].receiveMoney(game.playerlist.players[i].bet * 9)
            }
        }
    }
    run = Number(question('You would like to play again. Yes (1) or No (0) '))
}