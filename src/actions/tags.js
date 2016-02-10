import * as dynamo from '../services/dynamo';

export const GET_TAGS_REQUESTED = 'GET_TAGS_REQUESTED';
export const GET_TAGS_FAILED = 'GET_TAGS_FAILED';
export const GET_TAGS_SUCCEEDED = 'GET_TAGS_SUCCEEDED';

export function getTagsRequested() {
  return { type: GET_TAGS_REQUESTED };
}

export function getTagsSucceeded(tags) {
  return { type: GET_TAGS_SUCCEEDED, payload: { tags } };
}

export function getTagsFailed(err) {
  console.warn(err);
  return { type: GET_TAGS_FAILED, payload: { err }, error: true };
}

export function getTagsAsync() {
  return (dispatch) => {
    dispatch(getTagsRequested());

    return dynamo.getAllTags()
      .then((tags) => {
        dispatch(getTagsSucceeded(tags));
      })
      .catch((err) => {
        dispatch(getTagsFailed(err));
      });
  };
}
