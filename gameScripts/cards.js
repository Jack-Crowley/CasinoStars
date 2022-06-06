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

class Blackjackecks extends Deck {
    constructor() {
        super()
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
        for (let i = 0; i < suits.length; i++) {
            for (let n = 0; n < values.length; n++) {
                this.deck.push(new Card(suits[i], values[n]));
            }
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.str = value + " of " + suit;
    }
}
