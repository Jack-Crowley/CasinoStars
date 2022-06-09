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
<<<<<<< HEAD:gameScripts/pokertest.js
                }
                else if (pair) {
=======
                }else if (pair) {
>>>>>>> 6e6ebc9b94cd3e410f74712258096c712ae95e3a:Public/gameScripts/pokertest.js
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
class Pot {
    money;
    
    constructor() {
        this.money = 0;
    }

    addMoney(money) {
        this.money += money;
    }
}
class Poker {
    numOfPlayers;
    playerlist;
    pot;
    dealerIndex;
    deck;
    bb;
    middle;

    constructor(numOfPlayers, bigblind) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.pot = new Pot;
        this.dealerIndex = 0;
        this.deck = new Deck;
        this.deck.shuffle();
        this.bb = bigblind;
        this.middle = [];
        
        for (let i = 0; i < numOfPlayers; i++) {
            this.playerlist.addPlayer(new Player(100))
        }
    }

    addToPot(money) {
        this.pot.addMoney(money);
    }

    rotateDealer() {
        this.dealerIndex++;
        this.dealerIndex %= (this.numOfPlayers-1);
    }

    drawCards() {
        for (let i = 0; i < this.playerlist.players.length; i++) {
            this.playerlist.players[i].drawCard(this.deck.draw());
        }
    }

    bet(player, amount) {
        player.bet += amount;
        player.totalbet += amount;
        if (amount > player.money) {
            amount = player.money;
            player.money = 0;
        }else {
            player.money -= amount;
        }
        this.pot.addMoney(amount);
    }
}

const {question} = require(`readline-sync`)

let run = true;
while (run) {
    let game = new Poker(4, 10);

    game.drawCards();

    let highest = game.playerlist.players[0].hand[0].numval;
    let highest_player = 0;
    for (let i = 0; i < game.playerlist.players.length; i++) {
        console.log(`Player ${i+1} has the ${game.playerlist.players[i].hand[0].str}`)
        if (game.playerlist.players[i].hand[0].numval > highest) {
            highest = game.playerlist.players[i].hand[0].numval;
            highest_player = i;
        }
    }
    game.dealerIndex = highest_player;
    console.log(`\nPlayer ${game.dealerIndex+1} is the dealer`)

    for (const player of game.playerlist.players) {
        player.hand = []
    }

    game.drawCards();
    game.drawCards();
    let playernum;
    if (game.dealerIndex+2 > 4) {
        playernum = (game.dealerIndex+2) % 4
    } else (
        playernum = game.dealerIndex+2
    )
    console.log(`Player ${playernum} has the small blind and bets $${game.bb/2}`)
    game.bet(game.playerlist.players[(game.dealerIndex+1) % 4], Number(game.bb/2))
    if (game.dealerIndex+3 > 4) {
        playernum = (game.dealerIndex+3) % 4
    } else (
        playernum = game.dealerIndex+3
    )
    console.log(`Player ${playernum} has the: `)
    for (const card of game.playerlist.players[playernum-1].hand) {
        console.log(`\t${card.str}`)
    }
    console.log(`and bets $${game.bb} for the big blind\n`)
    game.bet(game.playerlist.players[(game.dealerIndex+2) % 4], Number(game.bb))

    let bid = game.bb;
    let i = (game.dealerIndex+3) % game.playerlist.players.length;
    while (game.playerlist.players[i].bet != bid) {
        if (game.playerlist.players[i].fold) {
            console.log(`Player ${i+1} has folded.`)
        }else {
            console.log(`Player ${i+1} has the:`)
            for (const card of game.playerlist.players[i].hand) {
                console.log(`\t ${card.str}`)
            }
            console.log(`The current bid is: $${bid}`)
            let action = question(`Would you like to call (1) raise (2) or fold (3): `)
            action = Number(action)
            if (action == 1) {
                game.bet(game.playerlist.players[i], bid-game.playerlist.players[i].bet)
            }else if (action == 2) {
                let raise = Number(question(`How much would you like to raise? `))
                bid += raise;
                console.log(raise)
                game.bet(game.playerlist.players[i], bid-game.playerlist.players[i].bet)
            }else if (action == 3) {
                game.playerlist.players[i].fold = true;
            }
        }
        console.log(game.playerlist.players[i].bet)
        console.log(bid)
        i++;
        i %= game.playerlist.players.length;
    }
    let burn = game.deck.draw();
    game.middle.push(game.deck.draw()); game.middle.push(game.deck.draw()); game.middle.push(game.deck.draw());
    console.log(`The three face-up cards are:`);
    for (const card of game.middle) {
        console.log('\t'+card.str)
    }
    i = 0;
    let bid2 = 0;
    for (const player of game.playerlist.players) {
        player.bet = 0;
    }
    let turn = 1;
    let endbetting = false;
    // game.playerlist.players[i].totalbet != bid+bid2 || !(game.playerlist.players[i].check && bid2 == 0)
    while (endbetting == false) {
        if (game.playerlist.players[i].fold) {
            console.log(`Player ${i+1} has folded.`)
        }else {
            console.log(endbetting)
            console.log(game.playerlist.players[i].check)
            console.log(`Player ${i+1} has the:`)
            for (const card of game.playerlist.players[i].hand) {
                console.log(`\t ${card.str}`)
            }
            if (i == 0 && turn == 1) {
                let action = question(`Would you like to check (0) bid (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 0) {
                    game.playerlist.players[i].check = true;
                    console.log(`Player ${i+1} has checked.`)
                }else if (action == 1) {
                    bid2 = Number(question(`How much would you like to bid? $`))
                    game.bet(game.playerlist.players[i], bid2-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid2 += raise;
                    game.bet(game.playerlist.players[i], bid2-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }else if (game.playerlist.players[game.playerlist.players.length-i-1].check == true || bid2 == 0) {
                let action = question(`Would you like to check (0) bid (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 0) {
                    console.log(`Player ${i+1} has checked.`)
                }else if (action == 1) {
                    if (bid2 == 0) {
                        bid2 = Number(question(`How much would you like to bid? $`))
                    }
                    game.bet(game.playerlist.players[i], bid2-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid2 += raise;
                    game.bet(game.playerlist.players[i], bid2-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }else {
                console.log(`The current bid is $${bid2}`)
                let action = question(`Would you like to call (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 1) {
                    game.bet(game.playerlist.players[i], bid2-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid2 += raise;
                    game.bet(game.playerlist.players[i], bid2-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }
        }
        turn++;
        i++;
        i %= game.playerlist.players.length;
        if (bid2 != 0) {
            if (game.playerlist.players[i].totalbet == bid+bid2) {
                endbetting = true;
            }
        }else {
            if (game.playerlist.players[i].check) {
                endbetting = true;
            }
        }
    }
    burn = game.deck.draw();
    game.middle.push(game.deck.draw());
    console.log('The 4 cards in the middle are the: ')
    for (const card of game.middle) {
        console.log('\t'+card.str)
    }
    let bid3 = 0;
    endbetting = false;
    for (const player of game.playerlist.players) {
        player.bet = 0;
        player.check = false;
    }
    turn = 1;
    while (!endbetting) {
        if (game.playerlist.players[i].fold) {
            console.log(`Player ${i+1} has folded.`)
        }else {
            console.log(`Player ${i+1} has the:`)
            for (const card of game.playerlist.players[i].hand) {
                console.log(`\t ${card.str}`)
            }
            if (i == 0 && turn == 1) {
                let action = question(`Would you like to check (0) bid (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 0) {
                    game.playerlist.players[i].check = true;
                    console.log(`Player ${i+1} has checked.`)
                }else if (action == 1) {
                    bid3 = Number(question(`How much would you like to bid? $`))
                    game.bet(game.playerlist.players[i], bid3-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid3 += raise;
                    game.bet(game.playerlist.players[i], bid3-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
                
            }else if (game.playerlist.players[game.playerlist.players.length-i-1].check == true || bid3 == 0) {
                let action = question(`Would you like to check (0) bid (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 0) {
                    game.playerlist.players[i].check = true;
                    console.log(`Player ${i+1} has checked.`)
                }else if (action == 1) {
                    if (bid3 == 0) {
                        bid3 = Number(question(`How much would you like to bid? $`))
                    }
                    game.bet(game.playerlist.players[i], bid3-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid3 += raise;
                    game.bet(game.playerlist.players[i], bid3-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }else {
                console.log(`The current bid is $${bid3}`)
                let action = question(`Would you like to call (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 1) {
                    game.bet(game.playerlist.players[i], bid3-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid3 += raise;
                    game.bet(game.playerlist.players[i], bid3-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }
        }
        turn++;
        i++;
        i %= game.playerlist.players.length;
        if (bid2 != 0) {
            if (game.playerlist.players[i].totalbet == bid+bid2) {
                endbetting = true;
            }
        }else {
            if (game.playerlist.players[i].check) {
                endbetting = true;
            }
        }
    }
    burn = game.deck.draw();
    game.middle.push(game.deck.draw());
    console.log('The 5 cards in the middle are the: ')
    for (const card of game.middle) {
        for (const player of game.playerlist.players) {
            player.middle.push(card)
        }
        console.log('\t'+card.str)
    }
    let bid4 = 0;
    endbetting = false;
    for (const player of game.playerlist.players) {
        player.bet = 0;
        player.check = false;
    }
    turn = 1;
    while (!endbetting) {
        if (game.playerlist.players[i].fold) {
            console.log(`Player ${i+1} has folded.`)
        }else {
            console.log(`Player ${i+1} has the:`)
            for (const card of game.playerlist.players[i].hand) {
                console.log(`\t ${card.str}`)
            }
            if (i == 0 && turn == 1) {
                let action = question(`Would you like to check (0) bid (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 0) {
                    game.playerlist.players[i].check = true;
                    console.log(`Player ${i+1} has checked.`)
                }else if (action == 1) {
                    bid4 = Number(question(`How much would you like to bid? $`))
                    game.bet(game.playerlist.players[i], bid4-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid4 += raise;
                    game.bet(game.playerlist.players[i], bid4-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }else if (game.playerlist.players[game.playerlist.players.length-i-1].check == true || bid4 == 0) {
                let action = question(`Would you like to check (0) bid (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 0) {
                    game.playerlist.players[i].check = true;
                    console.log(`Player ${i+1} has checked.`)
                }else if (action == 1) {
                    if (bid4 == 0) {
                        bid4 = Number(question(`How much would you like to bid? $`))
                    }
                    game.bet(game.playerlist.players[i], bid4-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid4 += raise;
                    game.bet(game.playerlist.players[i], bid4-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }else {
                console.log(`The current bid is $${bid4}`)
                let action = question(`Would you like to call (1) raise (2) or fold (3): `)
                action = Number(action)
                if (action == 1) {
                    game.bet(game.playerlist.players[i], bid4-game.playerlist.players[i].bet)
                }else if (action == 2) {
                    let raise = Number(question(`How much would you like to raise? `))
                    bid4 += raise;
                    game.bet(game.playerlist.players[i], bid4-game.playerlist.players[i].bet)
                }else if (action == 3) {
                    game.playerlist.players[i].fold = true;
                }
            }
        }
        turn++;
        i++;
        i %= game.playerlist.players.length;
        if (bid2 != 0) {
            if (game.playerlist.players[i].totalbet == bid+bid2) {
                endbetting = true;
            }
        }else {
            if (game.playerlist.players[i].check) {
                endbetting = true;
            }
        }
    }
    let highest_scores = [];
    let highest_values = [];
    let ties = [];
    let people = [];
    for (const player of game.playerlist.players) {
        let besthand = player.getpokerscore(player)
        console.log(besthand)
        let score = besthand[0]
        let value = besthand[1]
        highest_scores.push(score)
        highest_values.push(value)
    }
    console.log(highest_scores)
    console.log(highest_values)
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
    for (let i = 0; i < highest_values.length; i++) {
        if (highest_values[i] == max) {
            console.log(`Player ${i+1} has won and received ${game.pot.money/people.length}`)
        }
    }
    run = Boolean(question(`You want to play another hand. (true/false) `))
}