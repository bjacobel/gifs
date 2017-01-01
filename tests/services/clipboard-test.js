import 'core-js/fn/object/assign';

import { copy } from '../../src/services/clipboard';

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
      expect(copy()).toBeTruthy();
    });

    it("throws an error if your browser doesn't support execCommand('copy')", () => {
      Object.assign(document, { queryCommandSupported: jest.fn(() => false) });
      expect(copy).toThrowError('Copying not supported in your browser');
    });
  });
});
