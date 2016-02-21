export const INCREMENT_PAGE_BOUNDARY = 'INCREMENT_PAGE_BOUNDARY';
export const DECREMENT_PAGE_BOUNDARY = 'DECREMENT_PAGE_BOUNDARY';

export function incrementPageBoundary() {
  return { type: INCREMENT_PAGE_BOUNDARY };
}

export function decrementPageBoundary() {
  return { type: DECREMENT_PAGE_BOUNDARY };
}
