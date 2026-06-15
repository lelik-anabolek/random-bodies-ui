import { stopAnimation, nextFrame } from '../../model/events';
import { $animationStore } from '../../model/store';

import type { CreateSceneT } from './createScene';

let rafId: number | null = null;

export const animateBodiesControls = ({
  renderer,
  bodies,
  scene,
  camera,
}: Omit<CreateSceneT, 'controls'>) => {
  const animate = () => {
    rafId = requestAnimationFrame(animate);
    const { playing, frame, positions } = $animationStore.getState();

    if (!playing || positions === null) return;
    if (frame >= positions.length) {
      stopAnimation();
      return;
    }
    const p = positions[frame];

    for (let i = 0; i < bodies.length; i++) {
      const i3 = i * 3;
      bodies[i].position.set(p[i3], p[i3 + 1], p[i3 + 2]);
    }



    renderer.render(scene, camera);
    nextFrame();
  };

  return {
    play() {
      if (!rafId) animate();
    },
    stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
  };
};
