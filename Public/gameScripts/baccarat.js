class Baccarat {
    numOfPlayers;
    playerlist;
    deck;

    constructor(numOfPlayers) {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.deck = new Deck;
        this.deck.shuffle();
        for (let i = 0; i < numOfPlayers; i++) {
            this.playerlist.addPlayer()
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