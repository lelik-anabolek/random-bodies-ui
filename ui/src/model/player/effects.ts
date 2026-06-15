import { createEffect } from 'effector';
import { domain } from './domain';

export const showPlayerFx = createEffect({
  name: 'showPlayerFx',
  domain,
  handler: () => {
    const playerBlock = document.getElementById('player-block');
    if (playerBlock) playerBlock.style.visibility = 'visible';
  },
});

export const hidePlayerFx = createEffect({
  name: 'hidePlayerFx',
  domain,
  handler: () => {
    const playerBlock = document.getElementById('player-block');
    if (playerBlock) playerBlock.style.visibility = 'hidden';
  },
});
