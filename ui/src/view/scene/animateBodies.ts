import { setFrame } from '../../model/animation/events';
import { $animationStore } from '../../model/animation/store';
import { setSliderValueFx } from '../../model/player/effects';
import { pause, play } from '../../model/player/events';

import type { CreateSceneT } from './createScene';

let rafId: number | null = null;
let startRealTime = 0;
let startSimTime = 0;

export const animateBodiesControls = ({
  renderer,
  bodies,
  scene,
  camera,
}: Omit<CreateSceneT, 'controls'>) => {
  const animate = () => {
    rafId = requestAnimationFrame(animate);
    const { frame, positions, time } = $animationStore.getState();
    if (positions === null || time === null) {
      pause();
      return;
    }

    if (startRealTime === 0) {
      startRealTime = performance.now();
      startSimTime = time[frame];
    }

    const realElapsed = (performance.now() - startRealTime) / 1000;

    const targetSimTime = startSimTime + realElapsed * 1; // 1 is playbackSpeed, will be added later

    let f = frame;
    while (f < time.length - 1 && time[f] < targetSimTime) {
      f++;
    }

    if (f >= positions.length - 1) {
      f = positions.length - 1;
    }

    const p = positions[f];

    for (let i = 0; i < bodies.length; i++) {
      const i3 = i * 3;
      bodies[i].position.set(p[i3], p[i3 + 1], p[i3 + 2]);
    }

    renderer.render(scene, camera);
    setSliderValueFx(f);
    setFrame(f);

    if (f === positions.length - 1) {
      pause();
    }
  };

  play.watch(() => {
    if (!rafId) animate();
  });

  pause.watch(() => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      startRealTime = 0;
      rafId = null;
    }
  });
};
