import {
  UPDATE_INDEX,
  SEARCH_SUCCEEDED
} from '../actions/search';

export const searchIndex = (state = {}, action) => {
  switch (action.type) {
  case UPDATE_INDEX:
  default:
    return state;
  }
};

export const searchResults = (state = {}, action) => {
  switch (action.type) {
  case SEARCH_SUCCEEDED:
  default:
    return state;
  }
};
