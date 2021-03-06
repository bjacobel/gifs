import {
  ANIMATE_GIF,
  FREEZE_GIF,
  SAVE_ANIMATION,
} from '../actions/animation';

export const animation = (state = {}, action) => {
  switch (action.type) {
  case ANIMATE_GIF:
    return { ...state, [action.payload.id]: true };
  case FREEZE_GIF:
    return { ...state, [action.payload.id]: false };
  default:
    return state;
  }
};

export const activeGif = (state = null, action) => {
  switch (action.type) {
  case SAVE_ANIMATION:
    return action.payload.id;
  default:
    return state;
  }
};
