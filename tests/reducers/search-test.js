import {
  UPDATE_INDEX_SUCCEEDED,
  SEARCH_SUCCEEDED,
} from '../../src/actions/search';

import {
  searchIndex,
  searchResults,
} from '../../src/reducers/search';

describe('search reducers', () => {
  describe('searchIndex reducer', () => {
    it('updates the saved search index', () => {
      const newIndex = {
        thisIs: 'the new',
        search: 'index',
      };

      expect(
        searchIndex(
          { foo: 'bar' },
          {
            type: UPDATE_INDEX_SUCCEEDED,
            payload: {
              newIndex,
            },
          },
        ),
      ).toEqual(newIndex);
    });

    it('does nothing by default', () => {
      expect(searchIndex({}, { type: 'none' })).toEqual({});
    });
  });

  describe('searchResults reducer', () => {
    it('adds a list of search results to state', () => {
      const ids = [
        'these',
        'are',
        'gif',
        'ids',
      ];

      expect(
        searchResults(
          { foo: 'bar' },
          {
            type: SEARCH_SUCCEEDED,
            payload: {
              searchResults: ids,
            },
          },
        ),
      ).toEqual(ids);
    });

    it('does nothing by default', () => {
      expect(searchResults([], { type: 'none' })).toEqual([]);
    });
  });
});
