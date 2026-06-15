import { setFrame } from '../../model/animation/events';
import { $animationStore } from '../../model/animation/store';
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
      startRealTime = 0;
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

    if (f >= positions.length) {
      pause();
      startRealTime = 0;
      return;
    }

    const p = positions[f];

    for (let i = 0; i < bodies.length; i++) {
      const i3 = i * 3;
      bodies[i].position.set(p[i3], p[i3 + 1], p[i3 + 2]);
    }

    renderer.render(scene, camera);
    setFrame(f);
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
