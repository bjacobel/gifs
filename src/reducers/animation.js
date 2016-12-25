// @flow

import {
  ANIMATE_GIF,
  FREEZE_GIF,
  SAVE_ANIMATION,
} from '../actions/animation';

type AnimationAction = {
  type: ANIMATE_GIF | FREEZE_GIF | SAVE_ANIMATION,
  payload: {
    id: number,
  },
};

export const animation = (state: { [key: number]: boolean } = {}, action: AnimationAction) => {
  switch (action.type) {
  case ANIMATE_GIF:
    return { ...state, [action.payload.id]: true };
  case FREEZE_GIF:
    return { ...state, [action.payload.id]: false };
  default:
    return state;
  }
};

export const activeGif = (state: ?number = null, action: AnimationAction) => {
  switch (action.type) {
  case SAVE_ANIMATION:
    return action.payload.id;
  default:
    return state;
  }
};
