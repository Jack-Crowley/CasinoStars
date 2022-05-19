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

    constructor(money) {
        this.hand = [];
        this.money = money;
    }

    isBankrupt () {
        let score = 0;
        let hasAce = false;
        for (let i = 0; i < this.hand.length; i++) {
            let value = this.hand[i].value;
            if (value == 'A') {
                value = 11;
                hasAce = true;
            }
            if (value == "K" || value == "Q" || value == "J" || value == 'T') value = 10;
            score += value;
        }
        if (score > 21 && hasAce) {
            if (score > 31) {
                return true;
            }
            return false;
        }else if (score > 21) {
            return true;
        }else {
            return false;
        }
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

class Pot {
    money;
    
    constructor() {
        this.money = 0;
    }

    addMoney(money) {
        this.money += money;
    }
}
