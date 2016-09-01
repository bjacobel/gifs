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
      it("ignores objects that don't end in .gif", () => {

      });

      it('restructures the array passed', () => {

      });

      it('sorts the gifs by date', () => {

      });

      it('merges results with existing gifs', () => {

      });
    });

    describe(`with action type ${GET_IMAGE_SIZE_SUCCEEDED}`, () => {
      it('can add data to a gif in the middle of the list', () => {
        expect(gifs([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz'
          }
        ], {
          type: GET_IMAGE_SIZE_SUCCEEDED,
          payload: {
            id: 2,
            src: 'bar',
            height: 10,
            width: 10,
            observedHeight: 5,
            observedWidth: 5
          }
        })).toEqual([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar',
            height: 10,
            width: 10,
            observedHeight: 5,
            observedWidth: 5
          },
          {
            id: 3,
            src: 'bizz'
          }
        ]);
      });

      it('can add data to a gif at the beginning of the list', () => {
        expect(gifs([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz'
          }
        ], {
          type: GET_IMAGE_SIZE_SUCCEEDED,
          payload: {
            id: 1,
            src: 'foo',
            height: 10,
            width: 10,
            observedHeight: 5,
            observedWidth: 5
          }
        })).toEqual([
          {
            id: 1,
            src: 'foo',
            height: 10,
            width: 10,
            observedHeight: 5,
            observedWidth: 5
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz'
          }
        ]);
      });

      it('can add data to a gif at the end of the list', () => {
        expect(gifs([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz'
          }
        ], {
          type: GET_IMAGE_SIZE_SUCCEEDED,
          payload: {
            id: 3,
            src: 'bizz',
            height: 10,
            width: 10,
            observedHeight: 5,
            observedWidth: 5
          }
        })).toEqual([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz',
            height: 10,
            width: 10,
            observedHeight: 5,
            observedWidth: 5
          }
        ]);
      });

      it("doesn't do anything if the id and src don't match a gif in the state array", () => {
        expect(gifs([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz'
          }
        ], {
          type: GET_IMAGE_SIZE_SUCCEEDED,
          payload: {
            id: 4,
            src: 'blergh'
          }
        })).toEqual([
          {
            id: 1,
            src: 'foo'
          },
          {
            id: 2,
            src: 'bar'
          },
          {
            id: 3,
            src: 'bizz'
          }
        ]);
      });
    });

    it('does nothing by default', () => {
      expect(gifs(undefined, {})).toEqual([]);
    });
  });

  describe('`visible` reducer', () => {
    describe(`with action type ${FOUND_VISIBLE_GIFS}`, () => {
      it('returns a range object from the payload passed', () => {
        expect(visible({}, {
          type: FOUND_VISIBLE_GIFS,
          payload: {
            visibleLowRange: 0,
            visibleHighRange: 10
          }
        })).toEqual({
          start: 0,
          end: 10
        });
      });
    });

    it('does nothing by default', () => {
      expect(visible(undefined, {})).toEqual({});
    });
  });
});
