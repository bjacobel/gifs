import { isGifVisible } from '../../src/services/infinite';

jest.unmock('../../src/services/infinite.js');

describe('infinite scrolling helper services', () => {
  describe('isGifVisible', () => {
    const gifStack = [{ observedHeight: 100 }, { observedHeight: 200 }, { observedHeight: 300 }];
    window.innerHeight = 1000;

    it("returns false for a gif that's off the top of the viewport", () => {
      window.scrollY = 9999;

      expect(isGifVisible([...gifStack, { observedHeight: 300 }], 3)).toBeFalsy();
    });

    it("returns false for a gif that's off the bottom of the viewport", () => {
      window.scrollY = 0;

      expect(isGifVisible([...gifStack, { observedHeight: 900 }, { observedHeight: 300 }], 4)).toBeFalsy();
    });

    it("returns true for a gif that's partway in the viewport (off bottom)", () => {
      window.scrollY = 0;

      expect(isGifVisible([...gifStack, { observedHeight: 300 }, { observedHeight: 300 }], 4)).toBeTruthy();
    });

    it("returns true for a gif that's partway in the viewport (off top)", () => {
      window.scrollY = 700;

      expect(isGifVisible([...gifStack, { observedHeight: 300 }], 3)).toBeTruthy();
    });

    it("returns true for a gif that's fully in the viewport", () => {
      window.scrollY = 500;

      expect(isGifVisible([...gifStack, { observedHeight: 300 }], 3)).toBeTruthy();
    });
  });
});
