import {
  GET_GIFS_SUCCEEDED,
  GET_IMAGE_SIZE_SUCCEEDED,
  FOUND_VISIBLE_GIFS
} from '../actions/gifs';

export const gifs = (state = [], action) => {
  switch (action.type) {
  case GET_GIFS_SUCCEEDED:
    return action.payload.gifs.Contents.filter((gif) => {
      return gif.Key.slice(-4) === '.gif';
    }).map((gif) => {
      return {
        src: gif.Key,
        date: gif.LastModified,
        size: gif.Size,
        id: gif.ETag.slice(1, -1)
      };
    }).sort((x, y) => {
      if (x.date < y.date) {
        return 1;
      } else if (x.date > y.date) {
        return -1;
      }
      return 0;
    });
  case GET_IMAGE_SIZE_SUCCEEDED:  // eslint-disable-line no-case-declarations
    const gif = state.find(x => x.id === action.payload.id && x.src === action.payload.src);
    const gifIndex = state.indexOf(gif);

    if (gifIndex >= 0) {
      return [
        ...state.slice(0, gifIndex),
        Object.assign({}, gif, {
          height: action.payload.height,
          width: action.payload.width,
          observedHeight: action.payload.observedHeight,
          observedWidth: action.payload.observedWidth
        }),
        ...state.slice(gifIndex + 1, state.length)
      ];
    } else {
      return state;
    }
  default:
    return state;
  }
};

export const visible = (state = {}, action) => {
  switch (action.type) {
  case FOUND_VISIBLE_GIFS:
    return {
      start: action.payload.visibleLowRange,
      end: action.payload.visibleHighRange
    };
  default:
    return state;
  }
};
