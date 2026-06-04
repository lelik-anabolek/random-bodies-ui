import { $appState } from '../../model/state';

export function hydrateDOMFromState() {
  const state = $appState.getState();

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
