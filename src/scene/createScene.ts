import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export type CreateSceneT = {
  scene: THREE.Scene;
  controls: OrbitControls;
  bodies: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshBasicMaterial,
    THREE.Object3DEventMap
  >[];
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
};
export function createScene(container: HTMLElement): CreateSceneT {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(20, 20, 20);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const size = 20;
  const divisions = 20;

  const gridHelperXY = new THREE.GridHelper(size, divisions);
  gridHelperXY.rotation.x = Math.PI / 2;
  scene.add(gridHelperXY);

  const gridHelperXZ = new THREE.GridHelper(size, divisions);
  scene.add(gridHelperXZ);

  const gridHelperYZ = new THREE.GridHelper(size, divisions);
  gridHelperYZ.rotation.z = Math.PI / 2;
  scene.add(gridHelperYZ);

  const bodies = [
    new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    ),
    new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    ),
    new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    ),
  ];

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return {
    scene,
    bodies,
    controls,
    camera,
    renderer,
  };
}
