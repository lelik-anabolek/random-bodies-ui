import { createStore, sample } from 'effector';
import { domain } from './domain';
import { play, pause, setMs } from './events';
import { calculateFx } from '../bodies/effects';
import { showPlayerFx } from './effects';

type PlayerStore = {
  playing: boolean;
  allMs: number;
  currentMs: number;
};

const INIT_STORE: PlayerStore = {
  playing: false,
  allMs: 0,
  currentMs: 0,
};

export const $playerStore = createStore<PlayerStore>(INIT_STORE, { domain })
  .on(play, (state) => ({ ...state, playing: true }))
  .on(pause, (state) => ({ ...state, playing: false }))
  .on(setMs, (state, ms) => ({ ...state, currentMs: ms }));

sample({ clock: calculateFx.done, target: showPlayerFx });
