import { createStore } from 'effector';
import { domain } from './domain';

import { nextFrame, setFrame, resetAnimation } from './events';
import { calculateFx } from '../bodies/effects';

type AnimationStore = {
  time: number[] | null;
  positions: number[][] | null;
  frame: number;
};

const INITIAL_STATE_ANIMATION_STORE: AnimationStore = {
  time: null,
  positions: null,
  frame: 0,
};

export const $animationStore = createStore<AnimationStore>(
  INITIAL_STATE_ANIMATION_STORE,
  { domain },
)
  .on(nextFrame, (state) => ({ ...state, frame: state.frame + 1 }))
  .on(setFrame, (state, frame) => ({ ...state, frame }))
  .on(calculateFx.doneData, (state, payload) => ({ ...state, ...payload }))
  .reset(resetAnimation);
