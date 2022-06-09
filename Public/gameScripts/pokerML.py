
import random

class Card:

    def __init__(self, suit, value):
        self.suit = suit
        self.value = value
        if self.value == 'A':
            self.numval = 14
        elif self.value == 'K':
            self.numval = 13
        elif self.value == 'Q':
            self.numval = 12
        elif self.value == 'J':
            self.numval = 11
        elif self.value == 'T':
            self.numval = 10
        else:
            self.numval = int(self.value)
    
    def __str__(self):
        return self.value + ' of ' + self.suit

class Deck:

    def __init__(self):
        suits = ['clubs', 'spades', 'hearts', 'diamonds']
        values  =['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
        self.deck = []
        for i in range(len(suits)):
            for n in range(len(values)):
                self.deck.append(Card(suits[i], values[n]))
    
    def draw(self):
        card = self.deck[0]
        del self.deck[0]
        return card
    
    def shuffle(self):
        for i in range(len(self.deck) - 1, 0, -1):
            j = random.randint(0, i)
            temp = self.deck[i]
            self.deck[i] = self.deck[j]
            self.deck[j] = temp

class Player:

    def __init__(self, money):
        self.hand = []
        self.money = money
        self.bet = 0
        self.totalbet = 0
        self.middle = []
        self.fold = False
        self.check = False
    
    def getScore(self):
        score = 0
        hasAce = False
        for i in range(len(self.hand)):
            value = self.hand[i].value
            if value == 'A':
                value = 11
                hasAce = True
            elif value in ('KQJT'):
                value = 10
            value = int(value)
            score += value
        if score > 21 and hasAce:
            if score > 31:
                return score-10
            return score - 10
        else:
            return score

    def getPokerScore(self, player):
        suits = [0, 0, 0, 0]
        values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        flush = False
        straight = False
        royal = False
        three = False
        pair = False
        twoPair = False
        highest = 0
        cards = []
        for card in player.jhand:
            cards.append(card)
        for card in player.middle:
            cards.append(card)
        for card in cards:
            suitNames = ('diamonds', 'hearts', 'clubs', 'spades')
            suits[suitNames.index(card.suit)] += 1
            
            if card.value == 'A':
                values[12] += 1
            elif card.value == 'K':
                values[11] += 1
            elif card.value == 'Q':
                values[10] += 1
            elif card.value == 'J':
                values[9] += 1
            elif card.value == 'T':
                values[8] += 1
            else:
                values[card.value-2] += 1
        for suit in suits:
            if suit >= 5:
                flush = True
        if values[12] and values[11] and values[10] and values[9] and values[8]:
            royal = True
        if royal and flush:
            return [1, 14]
        for i in range(len(values) - 5):
            if values[i] and values[i+1] and values[i+2] and values[i+3] and values[i+4]:
                straight = True
                highest = i + 6
        if straight and flush:
            return [2, highest]
        for i in range(len(values)):
            if values[i] >= 4:
                return [3, i+2]
            elif values[i] == 3:
                three = True
                highest = i + 2
            elif values[i] == 2:
                if twoPair:
                    highest = i + 2
                elif pair:
                    twoPair = True
                    highest = i + 2
                else:
                    pair = True
                    if not three:
                        highest = i + 2
            elif not three and not pair and not flush and not straight:
                highest = i + 2
        if three and pair:
            return [4, highest]
        elif flush:
            return [5, highest]
        elif straight:
            return [6, highest]
        elif three:
            return [7, highest]
        elif twoPair:
            return [8, highest]
        elif pair:
            return [9, highest]
        else:
            return [10, highest]
    
    def receiveMoney(self, amount):
        self.money += amount
    
    def placeBet(self, amount):
        if amount > self.money:
            amount = self.money
            self.money = 0
        else:
            self.money -= amount
        self.bet = amount
    
    def drawCard(self, card):
        self.hand.append(card)

class PlayerList:

    def __init__(self):
        self.players = []
    
    def addPlayer(self, player):
        if player not in self.players:
            self.players.append(player)
    
    def removePlayer(self, player):
        if player in self.players:
            self.players.remove(player)

class Pot:

    def __init__(self):
        self.money = 0
    
    def addMoney(self, money):
        self.money += money

class Poker(py_environment.PyEnvironment):

    def __init__(self):#, numOfPlayers, bigBlind):
        self.numOfPlayers = 4 #numOfPlayers
        self.playerList = PlayerList()
        self.pot = Pot()
        self.dealerIndex = 0
        self.deck = Deck()
        self.deck.shuffle()
        self.bb = 10 #bigBlind
        self.middle = []

        for i in range(self.numOfPlayers):
            self.playerList.addPlayer(Player(100))
    
    def addToPot(self, money):
        self.pot.addMoney(money)
    
    def rotateDealer(self):
        self.dealerIndex += 1
        self.dealerIndex %= (self.numOfPlayers-1)
    
    def drawCards(self):
        for i in range(len(self.playerList.players)):
            self.playerList.players[i].drawCard(self.deck.draw())
    
    def bet(self, player, amount):
        player.bet += amount
        player.totalbet += amount
        if amount > player.money:
            amount = player.money
            player.money = 0
        else:
            player.money -= amount
        self.pot.addMoney(amount)

    def gameLoop(self):
        self.drawCards()

        highest = self.playerList.players[0].hand[0].numval
        highest_player = 0
        for i in range(len(self.playerList.players)):
            print(f'Player {i+1} has the {str(self.playerList.players[i].hand[0])}')
            if self.playerList.players[i].hand[0].numval > highest:
                highest = self.playerList.players[i].hand[0].numval
                highest_player = i
        self.dealerIndex = highest_player
        print(f'\nPlayer {self.dealerIndex + 1} is the dealer')

        for player in self.playerList.players:
            player.hand = []
        
        self.drawCards()
        self.drawCards()
        playerNum = 0
        if self.dealerIndex+2 > 4:
            playerNum = (self.dealerIndex+2) % 4
        else:
            playerNum = self.dealerIndex + 2
        # playerNum = (self.dealerIndex+2) % 4

        print(f'Player {playerNum} has the small blind and bets ${self.bb/2}')
        self.bet(self.playerList.players[(self.dealerIndex+1)%4], int(self.bb/2))
        if self.dealerIndex+3 > 4:
            playerNum = (self.dealerIndex+3) % 4
        else:
            playerNum = self.dealerIndex + 3
        print(f'Player {playerNum} has the:')
        for card in self.playerList.players[playerNum-1].hand:
            print(f'\t{str(card)}')
        print(f'and bets ${self.bb} for the big blind\n')
        self.bet(self.playerList.players[(self.dealerIndex+2) % 4], int(self.bb))

        bid = self.bb
        i = (self.dealerIndex+3) % (len(self.playerList.players))
        while self.playerList.players[i].bet != bid:
            if self.playerList.players[i].fold:
                print(f'Player {i+1} has folded.')
            else:
                print(f'Player {i+1} has the:')
                for card in self.playerList.players[i].hand:
                    print(f'\t{str(card)}')
                print(f'The current bid is: ${bid}')
                action = int(input('Would you like to call (1) raise (2) or fold (3): '))
                if action == 1:
                    self.bet(self.playerList.players[i], bid-self.playerList.players[i].bet)
                elif action == 2:
                    raiseVal = int(input('How much would you like to raise? '))
                    bid += raiseVal
                    self.bet(self.playerList.players[i], bid-self.playerList.players[i].bet)
                elif action == 3:
                    self.plyaerList.players[i].fold = True
            i += 1
            i %= len(self.playerList.players)
        burn = self.deck.draw()
        for j in range(3): self.middle.append(self.deck.draw())
        print(f'The three face up cards are:')
        for card in self.middle:
            print(f'\t{str(card)}')
        i = 0
        bid2 = 0
        for player in self.playerList.players:
            player.bet = 0
        turn = 1
        endBetting = False
        while not endBetting:
            if self.playerList.players[i].fold:
                print(f'Player {i+1} has folded.')
            else:
                print(f'Player {i+1} has the:')
                for card in self.playerList.players[i].hand:
                    print(f'\t{str(card)}')
                if i == 0 and turn == 1:
                    action = int(input('Would you like to check (0) bid (1) raise (2) or fold (3): '))
                    if action == 0:
                        self.playerList.players[i].check = True
                        print(f'Player {i+1} has checked.')
                    elif action == 1:
                        bid2 = int(input('How much would you like to bid? $'))
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid2 += raiseVal
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
                elif self.playerList.players[len(self.playerList.players)-i-1].check or bid2 == 0:
                    action = int(input('Would you like to check (0) bid (1) raise (2) or fold (3): '))
                    if action == 0:
                        print(f'Player {i+1} has checked.')
                    elif action == 1:
                        if bid2 == 0:
                            bid2 = int(input('How much would you like to bid? $'))
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid2 += raiseVal
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
                else:
                    print(f'The current bid is ${bid2}')
                    action = int(input('Would you like to call (1) raise (2) or fold (3): '))
                    if action == 1:
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid2 += raiseVal
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
            turn += 1
            i += 1
            i %= len(self.playerList.players)
            if bid2 != 0:
                if self.playerList.players[i].totalbet == bid+bid2:
                    endBetting = True
            else:
                if self.playerList.players[i].check:
                    endBetting = True
        burn = self.deck.draw()
        self.middle.append(self.deck.draw())
        print('The 4 cards in the middle are the:')
        for card in self.middle:
            print(f'\t{str(card)}')
        
        bid3 = 0
        endBetting = False
        while not endBetting:
            if self.playerList.players[i].fold:
                print(f'Player {i+1} has folded.')
            else:
                print(f'Player {i+1} has the:')
                for card in self.playerList.players[i].hand:
                    print(f'\t{str(card)}')
                if i == 0 and turn == 1:
                    action = int(input('Would you like to check (0) bid (1) raise (2) or fold (3): '))
                    if action == 0:
                        self.playerList.players[i].check = True
                        print(f'Player {i+1} has checked.')
                    elif action == 1:
                        bid3 = int(input('How much would you like to bid? $'))
                        self.bet(self.playerList.players[i], bid3-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid3 += raiseVal
                        self.bet(self.playerList.players[i], bid3-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
                elif self.playerList.players[len(self.playerList.players)-i-1].check or bid3 == 0:
                    action = int(input('Would you like to check (0) bid (1) raise (2) or fold (3): '))
                    if action == 0:
                        print(f'Player {i+1} has checked.')
                    elif action == 1:
                        if bid3 == 0:
                            bid3 = int(input('How much would you like to bid? $'))
                        self.bet(self.playerList.players[i], bid3-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid3 += raiseVal
                        self.bet(self.playerList.players[i], bid3-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
                else:
                    print(f'The current bid is ${bid3}')
                    action = int(input('Would you like to call (1) raise (2) or fold (3): '))
                    if action == 1:
                        self.bet(self.playerList.players[i], bid2-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid3 += raiseVal
                        self.bet(self.playerList.players[i], bid3-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
            turn += 1
            i += 1
            i %= len(self.playerList.players)
            if bid2 != 0:
                if self.playerList.players[i].totalbet == bid+bid2:
                    endBetting = True
            else:
                if self.playerList.players[i].check:
                    endBetting = True
        burn = self.deck.draw()
        self.middle.append(self.deck.draw())
        print('The 4 cards in the middle are the:')
        for card in self.middle:
            print(f'\t{str(card)}')
        
        bid4 = 0
        endBetting = False
        while not endBetting:
            if self.playerList.players[i].fold:
                print(f'Player {i+1} has folded.')
            else:
                print(f'Player {i+1} has the:')
                for card in self.playerList.players[i].hand:
                    print(f'\t{str(card)}')
                if i == 0 and turn == 1:
                    action = int(input('Would you like to check (0) bid (1) raise (2) or fold (3): '))
                    if action == 0:
                        self.playerList.players[i].check = True
                        print(f'Player {i+1} has checked.')
                    elif action == 1:
                        bid4 = int(input('How much would you like to bid? $'))
                        self.bet(self.playerList.players[i], bid4-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid4 += raiseVal
                        self.bet(self.playerList.players[i], bid4-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
                elif self.playerList.players[len(self.playerList.players)-i-1].check or bid4 == 0:
                    action = int(input('Would you like to check (0) bid (1) raise (2) or fold (3): '))
                    if action == 0:
                        print(f'Player {i+1} has checked.')
                    elif action == 1:
                        if bid4 == 0:
                            bid4 = int(input('How much would you like to bid? $'))
                        self.bet(self.playerList.players[i], bid4-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid4 += raiseVal
                        self.bet(self.playerList.players[i], bid4-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
                else:
                    print(f'The current bid is ${bid4}')
                    action = int(input('Would you like to call (1) raise (2) or fold (3): '))
                    if action == 1:
                        self.bet(self.playerList.players[i], bid4-self.playerList.players[i].bet)
                    elif action == 2:
                        raiseVal = int(input('How much would you like to raise? '))
                        bid4 += raiseVal
                        self.bet(self.playerList.players[i], bid4-self.playerList.players[i].bet)
                    elif action == 3:
                        self.playerList.players[i].fold = True
            turn += 1
            i += 1
            i %= len(self.playerList.players)
            if bid2 != 0:
                if self.playerList.players[i].totalbet == bid+bid2:
                    endBetting = True
            else:
                if self.playerList.players[i].check:
                    endBetting = True
        highest_scores = []
        highest_values = []
        ties = []
        people = []
        for player in self.playerList.players:
            bestHand = player.getPokerScore(player)
            score = bestHand[0]
            value = bestHand[1]
            highest_scores.append(score)
            highest_values.append(value)
        minim = min(highest_scores)
        for i in range(len(highest_scores)):
            if highest_scores[i] == minim:
                ties.append(highest_values[i])
        maxim = max(ties)
        counter = 0
        for i in range(len(ties)):
            if ties[i] == maxim:
                counter += 1
                people.append(i)
        for i in range(len(highest_values)):
            if highest_values[i] == maxim:
                print(f'Player {i+1} has won and received {self.pot.money/len(people)}.')
