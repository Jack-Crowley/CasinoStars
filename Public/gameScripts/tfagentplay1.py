import random
import tensorflow as tf
import numpy as np
from tf_agents.environments import py_environment
from tf_agents.environments import tf_py_environment
from tf_agents.specs import array_spec
from tf_agents.trajectories import time_step as ts

print('Modules Imported')
games = 0

class Hand:
    def __init__(self, nums):
        self.value = sum(nums)
        self.numOfAces = nums.count(11)
        while self.value > 21 & self.numOfAces > 0:
            self.value -= 10
            self.numOfAces -= 1

class BlackJack(py_environment.PyEnvironment):
    def __init__(self, hand, dealersHand):
        self.pc = 1
        self.hand = hand
        self.cards = []
        self.dealer = dealersHand
        self._action_spec = array_spec.BoundedArraySpec(
        shape=(), dtype=np.int32, minimum=0, maximum=1, name='play')
        self._observation_spec = array_spec.BoundedArraySpec(
            shape=(1,3), dtype=np.int32, minimum=0, maximum=30, name='board')
        self._episode_ended = False
        self.hitOrStay = 0
    
    def showDeck(self):
        print(len(self.deck.cards))
        for card in self.deck.cards:
            print(card, end=" ")
    
    def action_spec(self):
        return self._action_spec
    def observation_spec(self):
        return self._observation_spec
    def _reset(self):
        # state at the start of the game
        global games
        games += 1
        self._state = [self.hand.value, self.dealer.value, self.hand.numOfAces]
        self._episode_ended = False
        return ts.restart(np.array([self._state], dtype=np.int32))
        
    def _step(self, action):    
        if self._episode_ended:
            return self.reset()
        self._episode_ended = True
        self.hitOrStay = action
        return ts.termination(np.array([self._state], dtype=np.int32), action)
def hitOrStay(a,b,c):

    print(a,b,c)

    python_environment = BlackJack(Hand([a,b]), Hand([cards[c]]))
    env = tf_py_environment.TFPyEnvironment(python_environment)

    saved_policy = tf.saved_model.load(r'C:\\Users\\jack1\Documents\\Coding\\Final\\CasinoStars\\Policy')
    policy_state = saved_policy.get_initial_state(batch_size=3)

    time_step = env.reset()
    policy_step = saved_policy.action(time_step, policy_state)
    policy_state = policy_step.state
    time_step = env.step(policy_step.action)
    return python_environment.hitOrStay

f = open('scores.txt', 'w')

cards = [11,2,3,4,5,6,7,8,9,10,10,10,10]
for a in cards:
    for b in cards:
        oneOrZeros = []
        for c in cards:
            oneOrZeros.append(str(hitOrStay(a,b,c)))
        stringOfArray = ','.join(oneOrZeros)
        f.write(stringOfArray+'\n')