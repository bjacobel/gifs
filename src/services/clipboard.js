// @flow

export const copy = () => {  // eslint-disable-line import/prefer-default-export
  const selection = document.getSelection();

  if (selection) {
    selection.removeAllRanges();
  }

  const copyInput = document.querySelector('.gif-fullname-hidden');

  if (copyInput) {
    copyInput.focus();
    copyInput.setSelectionRange(0, copyInput.value.length);
  }

  if (document.queryCommandSupported('copy') && document.execCommand('copy')) {
    return true;
  } else {
    throw new Error('Copying not supported in your browser');
  }
};
