import * as S3 from '../services/S3';

export const GET_GIFS_REQUESTED = 'GET_GIFS_REQUESTED';
export const GET_GIFS_FAILED = 'GET_GIFS_FAILED';
export const GET_GIFS_SUCCEEDED = 'GET_GIFS_SUCCEEDED';

export function getGifsRequested() {
  return { type: GET_GIFS_REQUESTED };
}

export function getGifsSucceeded(gifs) {
  return { type: GET_GIFS_SUCCEEDED, gifs };
}

export function getGifsFailed(err) {
  console.warn(err);
  return { type: GET_GIFS_FAILED };
}

export function getGifsAsync() {
  return (dispatch) => {
    dispatch(getGifsRequested());

    return S3.getBucketContents()
      .then((gifs) => {
        dispatch(getGifsSucceeded(gifs));
      })
      .catch((err) => {
        dispatch(getGifsFailed(err));
      });
  };
}