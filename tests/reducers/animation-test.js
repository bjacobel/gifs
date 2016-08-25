jest.unmock('../../src/reducers/animation');

import {
  ANIMATE_GIF,
  FREEZE_GIF,
  SAVE_ANIMATION
} from '../../src/actions/animation';
import {
  animation,
  activeGif
} from '../../src/reducers/animation';

describe('animation reducer file', () => {
  describe('`animation` reducer', () => {
    it(`sets the state subkey you pass to false if you pass ${FREEZE_GIF}`, () => {
      expect(animation({
        frozen: false,
        animating: true
      }, {
        type: FREEZE_GIF,
        payload: {
          id: 'animating'
        }
      })).toEqual({
        frozen: false,
        animating: false
      });
    });

    it(`sets the state subkey you pass to true if you pass ${ANIMATE_GIF}`, () => {
      expect(animation({
        frozen: false,
        animating: true
      }, {
        type: ANIMATE_GIF,
        payload: {
          id: 'frozen'
        }
      })).toEqual({
        frozen: true,
        animating: true
      });
    });

    it('does nothing by default', () => {
      const preState = { foo: 1 };
      expect(animation(preState, {})).toEqual(preState);
    });
  });

  describe('`activeGif` reducer', () => {
    it(`returns the id you pass as payload if type is ${SAVE_ANIMATION}`, () => {
      expect(activeGif('foo', {
        type: SAVE_ANIMATION,
        payload: {
          id: 'bar'
        }
      })).toEqual('bar');
    });

    it('does nothing by default', () => {
      const preState = { foo: 1 };
      expect(activeGif(preState, {})).toEqual(preState);
    });
  });
});
