import {
  GET_GIFS_SUCCEEDED
} from '../actions/gifs';

export default function gifs(state = [], action) {
  switch (action.type) {
  case GET_GIFS_SUCCEEDED:
    return action.payload.gifs.Contents.filter((gif) => {
      return gif.Key.slice(-4) === '.gif';
    }).map((gif) => {
      return {
        src: gif.Key,
        date: gif.LastModified,
        size: gif.Size,
        id: gif.ETag
      };
    });
  default:
    return state;
  }
}
