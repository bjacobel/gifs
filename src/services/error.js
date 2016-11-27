export const redirectToError = (err) => {  // eslint-disable-line import/prefer-default-export
  window.location = `/error#${err.message}`;
};
