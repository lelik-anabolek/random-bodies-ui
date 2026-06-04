import { changeBodyParam } from '../../model/events';

function handler(event: Event){
  console.log('trigger');
  const { body, field } = event.target.dataset as any;
  const bodyIndex = parseInt(body, 10);
  const value = event?.target.value ?? '';
  changeBodyParam({ value, bodyIndex, field });
};

export function bindBodyInputEvent(node: HTMLInputElement) {
  node.addEventListener('input', handler);

  return () => {
    node.removeEventListener('input', handler);
  };
}
