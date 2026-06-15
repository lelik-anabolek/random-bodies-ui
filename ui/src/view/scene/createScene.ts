import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { $appStore, type AppStore } from '../../model/bodies/store';

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

const createBodies = (bodies: AppStore['bodies']) => {
  return bodies.map(
    (b) =>
      new THREE.Mesh(
        new THREE.SphereGeometry(b.radius, 32, 32),
        new THREE.MeshBasicMaterial({ color: b.color }),
      ),
  );
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
  camera.position.set(120, 120, 120);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const size = 100;
  const divisions = 20;

  const gridHelperXY = new THREE.GridHelper(size, divisions);
  gridHelperXY.rotation.x = Math.PI / 2;
  scene.add(gridHelperXY);

  const gridHelperXZ = new THREE.GridHelper(size, divisions);
  scene.add(gridHelperXZ);

  const gridHelperYZ = new THREE.GridHelper(size, divisions);
  gridHelperYZ.rotation.z = Math.PI / 2;
  scene.add(gridHelperYZ);

  const initState = $appStore.getState();
  const spheres = createBodies(initState.bodies);

  spheres.forEach((s, i) => {
    const { x, y, z } = initState.bodies[i];
    s.position.add(new THREE.Vector3(x, y, z));
    scene.add(s);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return {
    scene,
    bodies: spheres,
    controls,
    camera,
    renderer,
  };
}
