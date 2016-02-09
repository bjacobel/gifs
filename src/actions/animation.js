export const ANIMATE_GIF = 'ANIMATE_GIF';
export const FREEZE_GIF = 'FREEZE_GIF';

export function animateGif(id) {
  return { type: ANIMATE_GIF, payload: { id } };
}

export function freezeGif(id) {
  return { type: FREEZE_GIF, payload: { id } };
}
