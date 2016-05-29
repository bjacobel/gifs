import * as s3 from '../services/s3';

export const GET_GIFS_REQUESTED = 'GET_GIFS_REQUESTED';
export const GET_GIFS_FAILED = 'GET_GIFS_FAILED';
export const GET_GIFS_SUCCEEDED = 'GET_GIFS_SUCCEEDED';
export const GET_IMAGE_SIZE_SUCCEEDED = 'GET_IMAGE_SIZE_SUCCEEDED';

export function getGifsRequested() {
  return { type: GET_GIFS_REQUESTED };
}

export function getGifsSucceeded(gifs) {
  return { type: GET_GIFS_SUCCEEDED, payload: { gifs } };
}

export function getGifsFailed(err) {
  console.trace(err);
  return { type: GET_GIFS_FAILED, payload: { err }, error: true };
}

export function getGifsAsync() {
  return (dispatch) => {
    dispatch(getGifsRequested());

    return s3.getBucketContents()
      .then((gifs) => {
        dispatch(getGifsSucceeded(gifs));
      })
      .catch((err) => {
        dispatch(getGifsFailed(err));
      });
  };
}

function getSizeSucceeded(height, width, id) {
  return { type: GET_IMAGE_SIZE_SUCCEEDED, payload: { height, width, id } };
}

export function watchForSize(img, id) {
  return (dispatch) => {
    const interval = window.setInterval(() => {
      if (img.height > 0) {
        window.clearInterval(interval);
        dispatch(getSizeSucceeded(img.height, img.width, id));
      }
    }, 10);
  };
}
