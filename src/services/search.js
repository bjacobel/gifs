// @flow

import Fuse from 'fuse.js';

export const updateIndex = (gifs: Array<Gif>, tags: Array<number>) => {
  return new Promise((resolve) => {
    // enrich gifs with tag info. We keep these seaparate in state because Reasons
    resolve(gifs.map((gif) => {
      const { id } = gif;
      const src = gif.src.slice(0, -4);
      return {
        id,
        src,
        tags: tags[id],
      };
    }));
  });
};

export const searchFor = (searchTerm: string, fuseIndex: {}) => {
  return new Promise((resolve) => {
    const fuse = new Fuse(fuseIndex, {
      keys: ['tags.text', 'src'],
      maxPatternLength: 16,
      threshold: 0.4,
    });
    resolve(fuse.search(searchTerm).map(result => result.id));
  });
};
