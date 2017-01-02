import {
  updateIndex,
  searchFor,
} from '../services/search';

export const UPDATE_INDEX_INITIATED = 'UPDATE_INDEX_INITIATED';
export const UPDATE_INDEX_SUCCEEDED = 'UPDATE_INDEX_SUCCEEDED';
export const SEARCH_INITIATED = 'SEARCH_INITIATED';
export const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED';

export const updateSearchIndexSucceeded = (newIndex) => {
  return { type: UPDATE_INDEX_SUCCEEDED, payload: { newIndex } };
};

export const requestUpdateSearchIndex = () => {
  return { type: UPDATE_INDEX_INITIATED };
};

export const updateSearchIndexAsync = () => {
  return (dispatch, getState) => {
    dispatch(requestUpdateSearchIndex());

    const { gifs, tags } = getState();

    return updateIndex(gifs, tags).then((newIndex) => {
      dispatch(updateSearchIndexSucceeded(newIndex));
    });
  };
};

export const searchGifsSucceeded = (searchResults) => {
  return { type: SEARCH_SUCCEEDED, payload: { searchResults } };
};

export const requestSearchGifs = () => {
  return { type: SEARCH_INITIATED };
};

export const searchGifsAsync = (searchTerm) => {
  return (dispatch, getState) => {
    dispatch(requestSearchGifs());

    const { searchIndex } = getState();

    return searchFor(searchTerm, searchIndex).then((searchResults) => {
      dispatch(searchGifsSucceeded(searchResults));
    });
  };
};
