import random
import tensorflow as tf
import numpy as np
from tf_agents.environments import py_environment
from tf_agents.environments import tf_py_environment
from tf_agents.specs import array_spec
from tf_agents.trajectories import time_step as ts
from tf_agents.networks import q_network
from tf_agents.agents.dqn import dqn_agent
from tf_agents.utils import common
from tf_agents.replay_buffers import tf_uniform_replay_buffer
from tf_agents.trajectories import trajectory
import matplotlib.pyplot as plt
import os
from tf_agents.policies import policy_saver

print('Modules Imported')
games = 0

class Hand:
    def __init__(self, cards, num):
        self.cards = cards
        self.aces = 0
        self.value=0
        for card in cards:
            if card.getNum() == 11:
                self.aces+=1
            self.value+=card.getNum()
        self.stay = False
        self.playerNum = num
        self.lose = False
        self.natural = (self.value == 21)

    def printHand(self):
        for i in self.cards:
            print(i, end=" ")

    def returnHand(self):
        cards = ''
        for i in self.cards:
            cards+=i.getCard()+' '
        return cards[:-1]

    def checkAce(self):
        while self.value > 21 and self.aces > 0:
            self.value -= 10
            self.aces -= 1
    
    def addCard(self, card):
        if card.getNum() == 11:
            self.aces+=1
        self.value+=card.getNum()
        self.cards.append(card)

class Card:
    def __init__(self, suit, num):
        self.suit = suit
        self.num = num
        self.card = self.suit+str(self.num)
    
    def __str__(self):
        return f'{self.suit}{self.num}'

    def getCard(self):
        return f'{self.suit}{self.num}'

    def getNum(self):
        if self.num == 'A':
                return 11
        return self.num

class Deck:
    def __init__(self, numOfDecks):
        self.nums = ['A',2,3,4,5,6,7,8,9,10,10,10,10]
        self.suits = ['D','H','C','S']
        self.cards=[]
        self.numOfDecks = 8
        self.genDeck()
        self.shuffle()

    def genDeck(self):
        for i in range(self.numOfDecks):
            for suit in self.suits:
                for num in self.nums:
                    self.cards.append(Card(suit, num))
    
    def shuffle(self):
        random.shuffle(self.cards)

    def drawCard(self):
        card = self.cards[random.randint(0,len(self.cards)-1)]
        self.cards.remove(card)
        return card

class BlackJack(py_environment.PyEnvironment):
    def __init__(self):
        self.deck = Deck(8)
        self.pc = 1
        self.hand = 0
        self.cards = []
        self.dealer = []
        self._action_spec = array_spec.BoundedArraySpec(
        shape=(), dtype=np.int32, minimum=0, maximum=1, name='play')
        self._observation_spec = array_spec.BoundedArraySpec(
            shape=(1,3), dtype=np.int32, minimum=0, maximum=30, name='board')
        self._episode_ended = False
    
    def showDeck(self):
        print(len(self.deck.cards))
        for card in self.deck.cards:
            print(card, end=" ")
    
    def Dealer(self):
        while self.dealer.value < 17:
            dealerCard = self.deck.drawCard()
            self.cards.append(dealerCard)
            self.dealer.addCard(dealerCard)
        if self.dealer.value > 21:
            self.dealer.lose = True

    def StartGame(self):
        self.deck = Deck(8)
        self.counter = self.pc
        for i in range(self.pc):
            card1 = self.deck.drawCard()
            self.cards.append(card1)
            card2 = self.deck.drawCard()
            self.cards.append(card2)
            self.hand = Hand([card1, card2], i)
        dealerOpenCard = self.deck.drawCard()
        self.cards.append(dealerOpenCard)
        dealerSecondCard = self.deck.drawCard()
        self.dealer = Hand([dealerOpenCard, dealerSecondCard], 'Dealer')

    def gameLoop(self):
        while self.counter > 0:
            for i in self.hands:
                if not (i.stay or i.lose):

                    a = int(input(f'Player {i.playerNum}\'s Turn ({i.returnHand()}, {i.value})\n0 - Stay; 1 - Hit: '))
                    if a == 0:
                        i.stay = True
                        self.counter-=1
                    else:
                        card = self.deck.drawCard()
                        self.cards.append(card)
                        i.addCard(card)
                        if i.value > 21:
                            i.checkAce()
                            if i.value > 21:
                                i.lose = True
                                self.counter -=1
                    print('\n')
        self.Dealer()
        self.CheckWin()
    
    def CheckWin(self):
        for i in self.hands:
            if not (i.lose):
                if not(i.value == self.dealer.value):
                        if i.natural:
                            print(f'Player {i.playerNum} ({i.value}) Won with ratio 3:2')
                        elif self.dealer.value < i.value or self.dealer.lose:
                            print(f'Player {i.playerNum} ({i.value}) Won with ration 1:1')
                else:
                    print(f'Player {i.playerNum} ({i.value}) pushed')
            else:
                    print(f'Player {i.playerNum} ({i.value}) lost with ratio 0:1')
    
    def action_spec(self):
        return self._action_spec
    def observation_spec(self):
        return self._observation_spec
    def __isBusting(self):
        return self.hand.value > 21
    def _reset(self):
        # state at the start of the game
        global games
        games += 1
        print(f'Game: {games}')
        self.StartGame()
        self._state = [self.hand.value, self.dealer.value, self.hand.aces]
        self._episode_ended = False
        return ts.restart(np.array([self._state], dtype=np.int32))
        
    def _step(self, action):    
        if self._episode_ended:
            return self.reset()
        # if len(self.hand.cards) == 2 and self.hand.value:
        if not self.__isBusting():
            if not (self.hand.value == 21 and len(self.hand.cards) == 2):
                if action == 0:
                    self.Dealer()
                    if self.dealer.value > 21:
                        self._episode_ended = True
                        return ts.termination(np.array([self._state], dtype=np.int32), 2)
                    elif self.dealer.value == self.hand.value:
                        self._episode_ended = True
                        return ts.termination(np.array([self._state], dtype=np.int32), 1)
                    elif self.dealer.value < self.hand.value:
                        self._episode_ended = True
                        return ts.termination(np.array([self._state], dtype=np.int32), 2)
                    else:
                        self._episode_ended = True
                        return ts.termination(np.array([self._state], dtype=np.int32), 0)
                else:
                    card = self.deck.drawCard()   
                    self.hand.addCard(card)
                    self._state[0] = self.hand.value
                    return ts.transition(np.array([self._state], dtype=np.int32), reward=0.05, discount=1.0)
            else:
                self._episode_ended = True
                return ts.termination(np.array([self._state], dtype=np.int32), 2.5)
        else:
                self._episode_ended = True
                return ts.termination(np.array([self._state], dtype=np.int32), -1)
    
python_environment = BlackJack()
env = tf_py_environment.TFPyEnvironment(python_environment)

q_net = q_network.QNetwork(env.observation_spec(), env.action_spec())
optimizer = tf.compat.v1.train.AdamOptimizer(learning_rate=0.001)

train_step_counter = tf.Variable(0)
agent = dqn_agent.DqnAgent(env.time_step_spec(),
                           env.action_spec(),
                           q_network=q_net,
                           optimizer=optimizer,
                           td_errors_loss_fn= 
                                  common.element_wise_squared_loss,
                           train_step_counter=train_step_counter)
agent.initialize()

def compute_avg_return(environment, policy, num_episodes=10):
    total_return = 0.0
    for _ in range(num_episodes):
        time_step = environment.reset()
        episode_return = 0.0
        while not time_step.is_last():
            action_step = policy.action(time_step)
            time_step = environment.step(action_step.action)
            episode_return += time_step.reward
        total_return += episode_return
    avg_return = total_return / num_episodes
    return avg_return.numpy()[0]
# Evaluate the agent's policy once before training.
avg_return = compute_avg_return(env, agent.policy, 5)
returns = [avg_return]

replay_buffer = tf_uniform_replay_buffer.TFUniformReplayBuffer(
                                data_spec=agent.collect_data_spec,                                                                
                                batch_size=env.batch_size,                                                              
                                max_length=100000)
def collect_step(environment, policy, buffer):
    time_step = environment.current_time_step()
    action_step = policy.action(time_step)
    next_time_step = environment.step(action_step.action)
    traj = trajectory.from_transition(time_step, 
                                      action_step, 
                                      next_time_step)
    buffer.add_batch(traj)

collect_steps_per_iteration = 1
batch_size = 64
dataset = replay_buffer.as_dataset(num_parallel_calls=3, 
                                   sample_batch_size=batch_size, 
                                   num_steps=2).prefetch(3)
iterator = iter(dataset)
num_iterations = 1000000
checkpoint_dir = r'C:\\Users\\jack1\Documents\\Coding\\Final\\CasinoStars\\Checkpoints'
train_checkpointer = common.Checkpointer(
    ckpt_dir=checkpoint_dir,
    max_to_keep=1,
    agent=agent,
    policy=agent.policy,
    replay_buffer=replay_buffer
)

policy_dir = r'C:\\Users\\jack1\Documents\\Coding\\Final\\CasinoStars\\Policy'
tf_policy_saver = policy_saver.PolicySaver(agent.policy)

env.reset()
for _ in range(batch_size):
    collect_step(env, agent.policy, replay_buffer)
for _ in range(num_iterations):
    for _ in range(collect_steps_per_iteration):
        collect_step(env, agent.collect_policy, replay_buffer)

    experience, unused_info = next(iterator)
    train_loss = agent.train(experience).loss
    step = agent.train_step_counter.numpy()

    if step % 10 == 0:
        avg_return = compute_avg_return(env, agent.policy, 5)
        returns.append(avg_return)

print(returns)
print(np.mean(returns))

tf_policy_saver.save(policy_dir)

