import Fuse from 'fuse.js';

import {
  updateIndex,
  searchFor,
} from '../../src/services/search';

jest.mock('fuse.js');

describe('search service', () => {
  describe('updateIndex', () => {
    it('zips together gifs and tags', () => {
      const gifs = [
        { id: 1, src: 'foo.gif' },
        { id: 2, src: 'bar.gif' },
        { id: 3, src: 'baz.gif' },
      ];
      const tags = {
        1: [{ text: 'tag for gif 1' }, { text: 'also gif 1' }],
        2: [],
        3: [{ text: 'gif 3' }],
      };
      return updateIndex(gifs, tags).then((zipped) => {
        expect(zipped).toEqual([
          { id: 1, src: 'foo', tags: [{ text: 'tag for gif 1' }, { text: 'also gif 1' }] },
          { id: 2, src: 'bar', tags: [] },
          { id: 3, src: 'baz', tags: [{ text: 'gif 3' }] },
        ]);
      });
    });
  });

  describe('searchFor', () => {
    it('resolves with the IDs of everything Fuse returns for a search term', () => {
      Fuse.prototype.search = jest.fn(() => [
        { id: 1, src: 'foo', tags: [{ text: 'tag for gif 1' }, { text: 'also gif 1' }] },
        { id: 2, src: 'bar', tags: [] },
        { id: 3, src: 'baz', tags: [{ text: 'gif 3' }] },
      ]);

      return searchFor('searchTerm', { search: 'index' }).then((searchResults) => {
        expect(Fuse.prototype.constructor).lastCalledWith(({ search: 'index' }), expect.any(Object));
        expect(searchResults).toEqual([1, 2, 3]);
      });
    });
  });
});
