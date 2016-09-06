export const copy = (text) => {
  const input = document.createElement('input');
  input.id = 'hidden-copy-element';
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.setSelectionRange(0, text.length);
  document.execCommand('copy');
  document.body.removeChild(input);
};
