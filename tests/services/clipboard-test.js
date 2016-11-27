import { copy } from '../../src/services/clipboard';

jest.unmock('../../src/services/clipboard');

describe('clipboard service', () => {
  describe('clipboard.copy', () => {
    Object.assign(document, {
      execCommand: jest.fn(() => true),
      querySelector: jest.fn(() => ({
        focus: jest.fn(),
        setSelectionRange: jest.fn(),
        value: {
          length: 1,
        },
      })),
      queryCommandSupported: jest.fn(() => true),
      getSelection: jest.fn(() => ({
        removeAllRanges: jest.fn(),
      })),
    });

    it('copies passed text to the clipboard', () => {
      // @TODO: idk. these are all native browser functions so idk how to test other than just running it
      copy();
    });
  });
});
