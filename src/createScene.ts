import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function createScene(container: HTMLElement): void {
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


  const trajectory1: THREE.Vector3[] = [];
  const trajectory2: THREE.Vector3[] = [];
  const trajectory3: THREE.Vector3[] = [];

  const totalPoints = 200;

  for (let i = 0; i < totalPoints; i++) {
    const t = i / 10;
    trajectory1.push(
      new THREE.Vector3(Math.sin(t) * 5, Math.cos(t) * 5, t * 0.1),
    );
    trajectory2.push(
      new THREE.Vector3(Math.sin(t + 1) * 4, Math.cos(t + 2) * 4, t * 0.2),
    );
    trajectory3.push(
      new THREE.Vector3(Math.sin(t + 2) * 3, Math.cos(t + 1) * 3, t * 0.3),
    );
  }

  function createTrajectoryLine(points: THREE.Vector3[], color = 0xff0000) {
    const material = new THREE.LineBasicMaterial({ color });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
  }

  scene.add(createTrajectoryLine(trajectory1, 0xff0000));
  scene.add(createTrajectoryLine(trajectory2, 0x00ff00));
  scene.add(createTrajectoryLine(trajectory3, 0x0000ff));


  const spheres = [
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

  spheres.forEach((s) => scene.add(s));

  let step = 0;

  function animate() {
    requestAnimationFrame(animate);

    if (step < totalPoints) {
      spheres[0].position.copy(trajectory1[step]);
      spheres[1].position.copy(trajectory2[step]);
      spheres[2].position.copy(trajectory3[step]);
      step++;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
