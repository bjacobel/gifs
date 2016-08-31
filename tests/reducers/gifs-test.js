jest.unmock('../../src/reducers/gifs');
jest.unmock('../../src/actions/gifs');

import {
  gifs,
  visible
} from '../../src/reducers/gifs';
import {
  GET_GIFS_SUCCEEDED,
  GET_IMAGE_SIZE_SUCCEEDED,
  FOUND_VISIBLE_GIFS
} from '../../src/actions/gifs';

describe('gifs reducer file', () => {
  describe('`gifs` reducer', () => {
    describe(`with action type ${GET_GIFS_SUCCEEDED}`, () => {

    });

    describe(`with action type ${GET_IMAGE_SIZE_SUCCEEDED}`, () => {

    });

    it('does nothing by default', () => {
      const preState = { foo: 1 };
      expect(gifs(preState, {})).toEqual(preState);
    });
  });

  describe('`visible` reducer', () => {
    describe(`with action type ${FOUND_VISIBLE_GIFS}`, () => {

    });

    it('does nothing by default', () => {
      const preState = { foo: 1 };
      expect(visible(preState, {})).toEqual(preState);
    });
  });
});
