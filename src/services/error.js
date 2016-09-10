export const redirectToError = (err) => {
  window.location = `/error#${err.message}`;
};
