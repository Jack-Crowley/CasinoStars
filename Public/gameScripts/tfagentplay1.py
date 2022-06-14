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
    def __init__(self, value):
        self.value = value

class BlackJack(py_environment.PyEnvironment):
    def __init__(self, hand, dealersHand, numOfAces):
        self.aces = numOfAces
        self.pc = 1
        self.hand = hand
        self.dealer = dealersHand
        self._action_spec = array_spec.BoundedArraySpec(
        shape=(), dtype=np.int32, minimum=0, maximum=1, name='play')
        self._observation_spec = array_spec.BoundedArraySpec(
            shape=(1,3), dtype=np.int32, minimum=0, maximum=30, name='board')
        self._episode_ended = False
        self.hitOrStay = 0

    def action_spec(self):
        return self._action_spec

    def observation_spec(self):
        return self._observation_spec

    def _reset(self):
        # state at the start of the game
        global games
        games += 1
        self._state = [self.hand.value, self.dealer.value]
        self._episode_ended = False
        return ts.restart(np.array([self._state], dtype=np.int32))
        
    def _step(self, action):    
        if self._episode_ended:
            return self.reset()
        self._episode_ended = True
        self.hitOrStay = action
        return ts.termination(np.array([self._state], dtype=np.int32), action)

def hitOrStay(a,b,c):

    python_environment = BlackJack(Hand(b), Hand(c), a)
    env = tf_py_environment.TFPyEnvironment(python_environment)

    saved_policy = tf.saved_model.load(r'.\\Public\\gameScripts\\Policy')
    policy_state = saved_policy.get_initial_state(batch_size=64)

    time_step = env.reset()
    policy_step = saved_policy.action(time_step, policy_state)
    policy_state = policy_step.state
    time_step = env.step(policy_step.action)
    return python_environment.hitOrStay

print(hitOrStay(10, 4, 0))