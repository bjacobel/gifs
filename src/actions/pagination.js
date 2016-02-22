export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';

export function incrementPage() {
  return { type: INCREMENT_PAGE };
}

export function decrementPage() {
  return { type: DECREMENT_PAGE };
}
