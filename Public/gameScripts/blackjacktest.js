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

    constructor(money) {
        this.hand = [];
        this.money = money;
        this.hasblackjack = false;
        this.bet = 0;
    }

    getScore () {
        let score = 0;
        let hasAce = false;
        for (let i = 0; i < this.hand.length; i++) {
            let value = this.hand[i].value;
            if (value == 'A') {
                value = 11;
                hasAce = true;
            }
            if (value == "K" || value == "Q" || value == "J" || value == 'T') value = 10;
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
class Pot {
    money;
    
    constructor() {
        this.money = 0;
    }

    addMoney(money) {
        this.money += money;
    }
}
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
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
                this.deck.push(new Card(suits[i], values[n]));
            }
        }
        this.str = function() {
            'TO DO LATER';
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
class BlackJack {
    numOfPlayers;
    playerlist;
    pot;
    deck;
    center;

    constructor(numOfPlayers) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.pot = new Pot;
        this.deck = new Deck;
        this.center = [];
        this.deck.shuffle();

        for (let i = 0; i < numOfPlayers; i++) {
            let player = new Player(100)
            this.playerlist.addPlayer(player)
        }
    }
    
    bet(player, amount) {
        if (amount > player.money) {
            amount = player.money;
            player.money = 0;
        }else {
            player.money -= amount;
        }
        this.pot += amount;
        player.bet = amount;
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

const {question} = require('readline-sync')

let run = true;
while (run) {
    let game = new BlackJack(4);
    
    for (const player of game.playerlist.players) {
        player.drawCard(game.deck.draw())
    }
    for (const player of game.playerlist.players) {
        player.drawCard(game.deck.draw())
    }

    console.log(`The dealer has the: ${game.playerlist.players[game.playerlist.players.length-1].hand[0].str} face up`)

    for (let i = 0; i < game.playerlist.players.length-1; i++) {
        console.log(`Player ${i+1} has: `)
        for (const card of game.playerlist.players[i].hand) {
            console.log(card.str)
        }
        let bet = question(`How much would you like to bid? `)
        game.bet(game.playerlist.players[i], Number(bet))

        if (game.playerlist.players[i].getScore() == 21) {
            console.log('You got blackjack!')
            game.playerlist.players[i].hasBlackJack();
        }else {
            let input = question(`Would you like to hit (1) or stay (2) ? `)
            while (input != '2') {
                game.playerlist.players[i].drawCard(game.deck.draw())
                console.log(`Player ${i+1} has: `)
                for (const card of game.playerlist.players[i].hand) {
                    console.log(card.str)
                }
                if (game.playerlist.players[i].getScore() <= 21) {
                    input = question(`Would you like to hit (1) or stay (2) ? `)
                } else {
                    console.log("You have more than 21. You bust. \n")
                    input = '2';
                }
            }
        }
    }
    if (game.playerlist.players[(game.playerlist.players.length)-1].getScore()) {
        while (game.playerlist.players[game.playerlist.players.length-1].getScore() < 17) {
            game.playerlist.players[game.playerlist.players.length-1].drawCard(game.deck.draw())
            console.log(`The dealer has the:`)
            for (const card of game.playerlist.players[game.playerlist.players.length-1].hand) {
                console.log(card.str)
            }
        }
    } else {
        console.log(`The dealer has the:`)
            for (const card of game.playerlist.players[game.playerlist.players.length-1].hand) {
                console.log(card)
            }
    }
    
    for (let i = 0; i < game.playerlist.players.length-1; i++) {
        let player = game.playerlist.players[i]
        if (player.hasblackjack) {
            player.receiveMoney(Number((player.bet * 2.5).toFixed(2)))
            console.log(`Player ${i+1} won $${Number((player.bet * 2.5).toFixed(2))}`)
            console.log(`Player ${i+1} now has $${player.money}`)
        } else if (player.getScore() > 21) {
        } else if (player.getScore() > game.playerlist.players[game.playerlist.players.length-1].getScore()) {
            player.receiveMoney(Number((player.bet * 2).toFixed(2)))
            console.log(`Player ${i+1} won $${Number((player.bet * 2).toFixed(2))}`)
            console.log(`Player ${i+1} now has $${player.money}`)
        } else if (game.playerlist.players[game.playerlist.players.length-1].getScore() > 21) {
            player.receiveMoney(Number((player.bet * 2).toFixed(2)))
        } else if (player.getScore() == game.playerlist.players[game.playerlist.players.length-1].getScore()) {
            player.receiveMoney(player.bet)
            console.log(`Player ${i+1} tied and got $${Number((player.bet).toFixed(2))} back`)
            console.log(`Player ${i+1} now has $${player.money}`)
        }
    }

    run = Boolean(question(`Do you want to continue (true/false) ? `))
}
