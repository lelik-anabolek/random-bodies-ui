import { createEvent } from 'effector';
import { domain } from './domain';

export const changeBodyParam = createEvent<{
  bodyIndex: number;
  value: string;
  field: string;
}>({
  name: 'changeBodyParam',
  domain,
});

export const setRandomBodies = createEvent({
  name: 'setRandomBodies',
  domain,
});

export const startCalculate = createEvent({
  name: 'startCalculate',
  domain,
});

export const startAnimation = createEvent({
  name: 'startAnimation',
  domain,
});

export const stopAnimation = createEvent({
  name: 'stopAnimation',
  domain,
});

export const nextFrame = createEvent({
  name: 'nextFrame',
  domain,
});