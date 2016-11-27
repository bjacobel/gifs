export const copy = () => {  // eslint-disable-line import/prefer-default-export
  document.getSelection().removeAllRanges();

  const copyInput = document.querySelector('.gif-fullname-hidden');
  copyInput.focus();
  copyInput.setSelectionRange(0, copyInput.value.length);

  if (document.queryCommandSupported('copy') && document.execCommand('copy')) {
    return true;
  } else {
    throw new Error('Copying not supported in your browser');
  }
};
