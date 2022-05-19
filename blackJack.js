class BlackJack {
    numOfPlayers;
    playerlist;
    pot;
    deck;
    center;

    constructor() {
        this.numOfPlayers = numOfPlayers;
        this.playerlist = new PlayerList;
        this.pot = new Pot;
        this.deck = new Deck;
        this.center = [];
        this.deck.shuffle();

        for (let i = 0; i < numOfPlayers; i++) {
            player = new Player(100)
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