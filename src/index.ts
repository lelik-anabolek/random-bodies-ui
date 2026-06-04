import 'reset.css';

import { createScene } from './scene/createScene';
import { animateControls } from './scene/animateControls';
import { bodiesControl } from './bodiesControl';

const container = document.getElementById('scene')!;

const { scene, controls, bodies, renderer, camera } = createScene(container);

animateControls({ controls, scene, renderer, camera });

bodiesControl({ bodies });
