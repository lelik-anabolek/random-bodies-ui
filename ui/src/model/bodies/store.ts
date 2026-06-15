import { createStore, sample } from 'effector';
import { domain } from './domain';
import { changeBodyParam, startCalculate } from './events';
import { calculateFx } from './effects';
import { BodyInput } from '../../../pkg/wasm';

interface Body {
  x: number;
  y: number;
  z: number;
  vel_x: number;
  vel_y: number;
  vel_z: number;
  mass: number;
  radius: number;
  color: string;
}

export type AppStore = {
  bodies: Body[];
};

const INITIAL_STATE_APP_STORE: AppStore = {
  bodies: [
    {
      x: -4,
      y: 0,
      z: 0,
      vel_x: 0,
      vel_y: 0,
      vel_z: 0,
      mass: 10,
      radius: 1,
      color: '#ff0000',
    },
    {
      x: 0,
      y: 0,
      z: 0,
      vel_x: 0,
      vel_y: 0,
      vel_z: 0,
      mass: 10,
      radius: 1,
      color: '#00ff00',
    },
    {
      x: 4,
      y: 0,
      z: 0,
      vel_x: 0,
      vel_y: 0,
      vel_z: 0,
      mass: 10,
      radius: 1,
      color: '#0000ff',
    },
  ],
};

export const $appStore = createStore<AppStore>(INITIAL_STATE_APP_STORE, {
  domain,
}).on(changeBodyParam, (state, { field, bodyIndex, value }) => {
  const parsedValue = field !== 'color' ? parseFloat(value) : value;

  return {
    ...state,
    bodies: state.bodies.map((b, i) =>
      i === bodyIndex ? { ...b, [field]: parsedValue } : b,
    ),
  };
});

sample({
  clock: startCalculate,
  source: $appStore,
  fn: ({ bodies }) => {
    return bodies.map(
      ({ x, y, z, vel_x, vel_y, vel_z, mass, radius }) =>
        new BodyInput(x, y, z, vel_x, vel_y, vel_z, mass, radius),
    );
  },
  target: calculateFx,
});

calculateFx.failData.watch((err) => {
  console.error(err);
});
