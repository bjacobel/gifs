jest.unmock('../../src/services/clipboard');

import { copy } from '../../src/services/clipboard';

describe('clipboard service', () => {
  describe('clipboard.copy', () => {
    document.execCommand = jest.fn();

    it('copies passed text to the clipboard', () => {
      copy();
    });

    it('calls the handler only once', () => {
      copy();
    });

    it("removes the listener after it's done", () => {
      copy();
    });
  });
});
