import * as dynamo from '../services/dynamo';

// **********************
// Get all tags
// **********************

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

// ******************
// Add a tag
// ******************

export const ADD_TAG_REQUESTED = 'ADD_TAG_REQUESTED';
export const ADD_TAG_FAILED = 'ADD_TAG_FAILED';
export const ADD_TAG_SUCCEEDED = 'ADD_TAG_SUCCEEDED';

export function addTagRequested(tag, gifId) {
  return { type: ADD_TAG_REQUESTED, payload: { tag, gifId } };
}

export function addTagSucceeded(tagDocument) {
  return { type: ADD_TAG_SUCCEEDED, payload: { tagDocument } };
}

export function addTagFailed(err) {
  console.warn(err);
  return { type: ADD_TAG_FAILED, payload: { err }, error: true };
}

export function addTagAsync(tag) {
  return (dispatch, getState) => {
    const { activeGif } = getState();
    dispatch(addTagRequested(tag, activeGif));

    return dynamo.addTag(tag, activeGif)
      .then((tagDocument) => {
        dispatch(addTagSucceeded(tagDocument));
      })
      .catch((err) => {
        dispatch(addTagFailed(err));
      });
  };
}

// ******************
// Delete a tag
// ******************

export const DELETE_TAG_REQUESTED = 'DELETE_TAG_REQUESTED';
export const DELETE_TAG_FAILED = 'DELETE_TAG_FAILED';
export const DELETE_TAG_SUCCEEDED = 'DELETE_TAG_SUCCEEDED';

export function deleteTagRequested(tag, gifId) {
  return { type: DELETE_TAG_REQUESTED, payload: { tag, gifId } };
}

export function deleteTagSucceeded(tagDocument) {
  return { type: DELETE_TAG_SUCCEEDED, payload: { tagDocument } };
}

export function deleteTagFailed(err) {
  console.warn(err);
  return { type: DELETE_TAG_FAILED, payload: { err }, error: true };
}

export function deleteTagAsync(tag) {
  return (dispatch, getState) => {
    const { activeGif } = getState();
    dispatch(deleteTagRequested(tag, activeGif));

    return dynamo.deleteTag(tag, activeGif)
      .then((tagDocument) => {
        dispatch(deleteTagSucceeded(tagDocument));
      })
      .catch((err) => {
        dispatch(deleteTagFailed(err));
      });
  };
}
