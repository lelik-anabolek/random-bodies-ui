import { createEffect } from 'effector';
import { domain } from './domain';
import { BodyInput, integrate_wasm } from '../../pkg/wasm';

export type CalculateFXResult = {
  time: number[];
  positions: number[][];
};

export const calculateFx = createEffect({
  name: 'calculateFx',
  domain,
  handler: (bodies: BodyInput[]): CalculateFXResult => {
    const result = integrate_wasm(bodies);

    if (typeof result === 'string' && result.includes('error')) {
      throw Error(result);
    }

    return { time: result.x, positions: result.y };
  },
});
