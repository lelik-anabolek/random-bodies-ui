import type { CreateSceneT } from './createScene';

export function animateControls({
  controls,
  scene,
  camera,
  renderer,
}: Omit<CreateSceneT, 'bodies'>): void {
  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
