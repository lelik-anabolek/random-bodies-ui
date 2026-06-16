import { createEvent } from 'effector';
import { domain } from './domain';

export const nextFrame = createEvent({
  name: 'nextFrame',
  domain,
});

export const setFrame = createEvent<number>({
  name: 'setFrame',
  domain,
});

export const resetAnimation = createEvent<number>({
  name: 'resetAnimation',
  domain,
});
