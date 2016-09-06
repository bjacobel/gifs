jest.unmock('../../src/services/clipboard');

import { copy } from '../../src/services/clipboard';

describe('clipboard service', () => {
  describe('clipboard.copy', () => {
    document.execCommand = jest.fn();

    it('copies passed text to the clipboard', () => {
      // @TODO: actually implement this
      copy('foo');
    });
  });
});
