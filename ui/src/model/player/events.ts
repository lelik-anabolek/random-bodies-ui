import { createEvent } from 'effector';
import { domain } from './domain';

export const play = createEvent({ name: 'play', domain });
export const pause = createEvent({ name: 'pause', domain });

export const setMs = createEvent<number>({ name: 'setMs', domain });
