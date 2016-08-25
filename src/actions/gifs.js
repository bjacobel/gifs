import { obtainCurrentRole } from '../services/cognito';
import { getBucketContents } from '../services/s3';
import { isGifVisible } from '../services/infinite';

export const GET_GIFS_REQUESTED = 'GET_GIFS_REQUESTED';
export const GET_GIFS_FAILED = 'GET_GIFS_FAILED';
export const GET_GIFS_SUCCEEDED = 'GET_GIFS_SUCCEEDED';
export const GET_IMAGE_SIZE_SUCCEEDED = 'GET_IMAGE_SIZE_SUCCEEDED';
export const FOUND_VISIBLE_GIFS = 'FOUND_VISIBLE_GIFS';

function getGifsRequested() {
  return { type: GET_GIFS_REQUESTED };
}

function getGifsSucceeded(gifs) {
  return { type: GET_GIFS_SUCCEEDED, payload: { gifs } };
}

function getGifsFailed(err) {
  console.trace(err);
  return { type: GET_GIFS_FAILED, payload: { err }, error: true };
}

export function getGifsAsync() {
  return (dispatch, getState) => {
    dispatch(getGifsRequested());

    return obtainCurrentRole(getState().auth.google)
      .then((authInfo) => {
        return getBucketContents(authInfo);
      })
      .then((gifs) => {
        dispatch(getGifsSucceeded(gifs));
      })
      .catch((err) => {
        dispatch(getGifsFailed(err));
      });
  };
}

function getSizeSucceeded(height, width, observedHeight, observedWidth, id, src) {
  return { type: GET_IMAGE_SIZE_SUCCEEDED, payload: { height, width, observedHeight, observedWidth, id, src } };
}

export function watchForSize(img, id, src, containerWidth) {
  return (dispatch) => {
    const interval = window.setInterval(() => {
      if (img.height > 0) {
        window.clearInterval(interval);
        const observedHeight = img.height / (img.width / containerWidth);
        dispatch(getSizeSucceeded(img.height, img.width, observedHeight, containerWidth, id, src));
      }
    }, 10);
  };
}

function foundVisibleGifs(visibleLowRange, visibleHighRange) {
  return { type: FOUND_VISIBLE_GIFS, payload: { visibleLowRange, visibleHighRange } };
}

export function updateVisibleGifs(gifs) {
  return (dispatch) => {
    if (!gifs) {
      dispatch(foundVisibleGifs(0, 10));
    } else {
      const visibles = [];

      for (let i = 0; i < gifs.length; i++) {
        if (isGifVisible(gifs, i)) {
          visibles.push(i);
        } else {
          // the first non-visible gif after any visible ones means we don't need to look anymore
          if (visibles.length > 0) {
            break;
          }
        }
      }

      dispatch(foundVisibleGifs(Math.max(visibles[0] - 5, 0), visibles[visibles.length - 1] + 5));
    }
  };
}
