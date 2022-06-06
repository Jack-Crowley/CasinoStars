class Poker {
    numOfPlayers;
    playerlist;
    pot;
    dealerIndex;

    constructor(numOfPlayers) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.pot = new Pot;
        this.dealerIndex = 0;
        
        for (let i = 0; i < numOfPlayers; i++) {
            this.playerlist.addPlayer()
        }
    }

    addToPot(money) {
        this.pot.addMoney(money);
    }

    rotateDealer() {
        this.dealerIndex++;
        this.dealerIndex % (this.numOfPlayers-1);
    }

    drawCards() {
        for (let i = 0; i < this.numOfPlayers; i++) {
            this.playerlist[this.dealerIndex+1]
        }
    }
}