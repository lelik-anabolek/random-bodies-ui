import { createStore } from 'effector';
import { domain } from './domain';
import { changeBodyParam } from './events';

interface Body {
  x: number;
  y: number;
  z: number;
  velX: number;
  velY: number;
  velZ: number;
  mass: number;
  radius: number;
  color: string;
}

export type AppState = {
  bodies: Body[];
};

const INITIAL_STATE: AppState = {
  bodies: [
    {
      x: -4,
      y: 0,
      z: 0,
      velX: 0,
      velY: 0,
      velZ: 0,
      mass: 10,
      radius: 1,
      color: 'rgb(255, 0, 0)',
    },
    {
      x: 0,
      y: 0,
      z: 0,
      velX: 0,
      velY: 0,
      velZ: 0,
      mass: 10,
      radius: 1,
      color: 'rgb(0, 255, 0)',
    },
    {
      x: 4,
      y: 0,
      z: 0,
      velX: 0,
      velY: 0,
      velZ: 0,
      mass: 10,
      radius: 1,
      color: 'rgb(0, 0, 255)',
    },
  ],
};

export const $appState = createStore<AppState>(INITIAL_STATE, { domain }).on(
  changeBodyParam,
  (state, { field, bodyIndex, value }) => {
    const parsedValue = field !== 'color' ? parseFloat(value) : value;

    return {
      ...state,
      bodies: state.bodies.map((b, i) =>
        i === bodyIndex ? { ...b, [field]: parsedValue } : b,
      ),
    };
  },
);
