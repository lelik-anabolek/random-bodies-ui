import 'reset.css';

import { createScene } from './scene/createScene';
import { animateControls } from './scene/animateControls';
const container = document.getElementById('scene')!;

const { scene, controls, bodies, renderer, camera } = createScene(container);

animateControls({ controls, scene, renderer, camera });
