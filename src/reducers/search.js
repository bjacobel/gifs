import {
  UPDATE_INDEX_SUCCEEDED,
  SEARCH_SUCCEEDED,
} from '../actions/search';

export const searchIndex = (state = [], action) => {
  switch (action.type) {
  case UPDATE_INDEX_SUCCEEDED:
    return action.payload.newIndex;
  default:
    return state;
  }
};

export const searchResults = (state = [], action) => {
  switch (action.type) {
  case SEARCH_SUCCEEDED:
    return action.payload.searchResults;
  default:
    return state;
  }
};
