import { $appStore } from '../../model/store';

export function hydrateDOMFromState() {
  const state = $appStore.getState();

  state.bodies.forEach((body, bodyIndex) => {
    Object.entries(body).forEach(([field, value]) => {
      const input = document.querySelector<HTMLInputElement>(
        `input[data-body="${bodyIndex}"][data-field="${field}"]`,
      );

      if (!input) return;

      input.value = String(value);
    });
  });
}
