import * as gifActions from '../actions/gifs';

export default function gifs(state = [], action) {
  switch (action.type) {
  case gifActions.GOT_GIFS:
    return action.events.map((event) => {
      return event;  // @TODO: Do more data destructuring here
    });
  default:
    return state;
  }
}
