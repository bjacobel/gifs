export const copy = (text) => {
  const handler = (e) => {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', text);
    }
  };


  document.addEventListener('copy', handler);
  document.execCommand('copy');
  document.removeEventListener('copy', handler);
};
