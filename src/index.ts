import 'reset.css';

import { createScene } from './view/scene/createScene';
import { animateControls } from './view/scene/animateControls';
import { bindBodyInputEvent } from './view/bodiesCockpit/bindBodyInputEvent';
import { hydrateDOMFromState } from './view/bodiesCockpit/hydrate';

const container = document.getElementById('scene')!;

hydrateDOMFromState();

const { scene, controls, bodies, renderer, camera } = createScene(container);

animateControls({ controls, scene, renderer, camera });

const bodyInputs =
  document.querySelectorAll<HTMLInputElement>('input[data-body]');

Array.from(bodyInputs).map(bindBodyInputEvent);
