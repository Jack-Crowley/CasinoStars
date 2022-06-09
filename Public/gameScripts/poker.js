class Poker {
    numOfPlayers;
    playerlist;
    pot;
    dealerIndex;
    deck;
    bb;

    constructor(numOfPlayers, bigblind) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.pot = new Pot;
        this.dealerIndex = 0;
        this.deck = new Deck;
        this.deck.shuffle();
        this.bb = bigblind;
        
        for (let i = 0; i < numOfPlayers; i++) {
            this.playerlist.addPlayer()
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
        for (const player of this.playerlist) {
            player.drawCard(this.deck.draw());
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
    }
}