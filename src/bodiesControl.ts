import { type CreateSceneT } from './scene/createScene';
export function bodiesControl({ bodies }: Pick<CreateSceneT, 'bodies'>): void {
  window.addEventListener('change', (event) => {
    const { body, field } = event.target.dataset as any;
    const bodyIndex = parseInt(body, 10);
    // scene.add(bodies)

    switch (field) {
      case 'x':
        bodies[bodyIndex].position.setX(event.target.valueAsNumber);
        break;
      case 'y':
        bodies[bodyIndex].position.setY(event.target.valueAsNumber);
        break;
      case 'z':
        bodies[bodyIndex].position.setZ(event.target.valueAsNumber);
        break;

/*       case 'velX':
        break;
      case 'velY':
        break;
      case 'velZ':
        break; */

      case 'mass':
        break;
      case 'radius':
        break;
      case 'color':
        break;
      default:
        break;
    }

    // renderer.render(scene, camera);
  });
}
