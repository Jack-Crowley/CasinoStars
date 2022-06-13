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
        let start = 0;
        for (const card of player.hand) {
            cards.push(card)
        }
        for (const card of player.middle) {
            cards.push(card)
        }
        console.log('cards')
        for (const card of cards) {
            console.log(cards)
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
            let counter = 0;
            if (suits[0] >= 5) {
                for (const card of cards) {
                    if (card.value == 'T' || card.value == 'J' || card.value == 'Q' || card.value == 'K' || card.value == 'A') {
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
                    if (card.value == 'T' || card.value == 'J' || card.value == 'Q' || card.value == 'K' || card.value == 'A') {
                        console.log(card)
                        if (card.suit == 'hearts') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[2] >= 5) {
                for (const card of cards) {
                    if (card.value == 'T' || card.value == 'J' || card.value == 'Q' || card.value == 'K' || card.value == 'A') {
                        if (card.suit == 'clubs') {
                            counter++;
                        }
                    }
                }
            }
            if (suits[3] >= 5) {
                for (const card of cards) {
                    if (card.value == 'T' || card.value == 'J' || card.value == 'Q' || card.value == 'K' || card.value == 'A') {
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
        if (values[12] && values[0], values[1], values[2], values[3]) {
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

let player = new Player(100);
player.hand.push(new Card("hearts", 'A'))
player.hand.push(new Card("hearts", 'K'))
player.middle.push(new Card("hearts", 'Q'))
player.middle.push(new Card("hearts", 'J'))
player.middle.push(new Card("hearts", 'T'))
player.middle.push(new Card("spades", '3'))
player.middle.push(new Card("spades", '7'))
console.log(player.getpokerscore(player))