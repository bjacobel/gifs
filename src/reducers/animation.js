import {
  ANIMATE_GIF,
  FREEZE_GIF
} from '../actions/animation';

export default function animation(state = {}, action) {
  switch (action.type) {
  case ANIMATE_GIF:
    return Object.assign({}, state, { [action.payload.id]: true });
  case FREEZE_GIF:
    return Object.assign({}, state, { [action.payload.id]: false });
  default:
    return state;
  }
}
