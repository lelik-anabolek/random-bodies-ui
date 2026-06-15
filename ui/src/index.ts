import 'reset.css';

import { createScene } from './view/scene/createScene';
import { animateControls } from './view/scene/animateControls';
import { animateBodiesControls } from './view/scene/animateBodies';

import { bindBodyInputEvent } from './view/bodiesCockpit/bindBodyInputEvent';
import { hydrateDOMFromState } from './view/bodiesCockpit/hydrate';
import { changeBodyParam, startCalculate } from './model/bodies/events';
import { play, pause } from './model/player/events';

import './model/bodies/store';
import './model/animation/store';
import './model/player/store';

import runWASM from '../pkg/wasm';

const container = document.getElementById('scene')!;

runWASM();

hydrateDOMFromState();

const { scene, controls, bodies, renderer, camera } = createScene(container);

animateControls({ controls, scene, renderer, camera });
animateBodiesControls({ scene, bodies, renderer, camera });

const bodyInputs =
  document.querySelectorAll<HTMLInputElement>('input[data-body]');

Array.from(bodyInputs).map(bindBodyInputEvent);

changeBodyParam.watch(({ bodyIndex, value, field }) => {
  const body = bodies[bodyIndex];

  if (!body) return;

  switch (field) {
    case 'x':
      body.position.setX(parseFloat(value));
      break;
    case 'y':
      body.position.setY(parseFloat(value));
      break;
    case 'z':
      body.position.setZ(parseFloat(value));
      break;

    case 'radius': {
      const oldR = body.geometry.parameters.radius;
      const newR = parseFloat(value);
      const scaleAt = newR / oldR;
      body.scale.set(scaleAt, scaleAt, scaleAt);
      break;
    }
    case 'color': {
      body.material.setValues({ color: value });
      break;
    }
    default:
      break;
  }
});

const calcButton = document.getElementById('calculate');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');

calcButton?.addEventListener('click', () => {
  startCalculate();
});

playButton?.addEventListener('click', () => {
  play();
});

pauseButton?.addEventListener('click', () => {
  pause();
});
