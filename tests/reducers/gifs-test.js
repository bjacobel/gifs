jest.unmock('../../src/reducers/gifs');

import {
  gifs,
  visible
} from '../../src/reducers/gifs';

describe('gifs reducer file', () => {
  describe('`gifs` reducer', () => {
    it('does nothing by default', () => {
      const preState = { foo: 1 };
      expect(gifs(preState, {})).toEqual(preState);
    });
  });

  describe('`visible` reducer', () => {
    it('does nothing by default', () => {
      const preState = { foo: 1 };
      expect(visible(preState, {})).toEqual(preState);
    });
  });
});
