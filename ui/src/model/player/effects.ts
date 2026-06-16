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

const sliderEl = document.getElementById(
  'frame-range',
) as HTMLInputElement | null;
export const setSliderFrameMaxValueFx = createEffect({
  name: 'setSliderFrameMaxValueFx',
  domain,
  handler: (maxFrame: number) => {
    sliderEl!.max = String(maxFrame);
  },
});

export const setSliderValueFx = createEffect({
  name: 'setSliderValueFx',
  domain,
  handler: (frame: number) => {
    sliderEl!.value = String(frame);
  },
});
