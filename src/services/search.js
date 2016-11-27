import Fuse from 'fuse.js';

export const updateIndex = (gifs, tags) => {
  return new Promise((resolve) => {
    // enrich gifs with tag info. We keep these seaparate in state because Reasons
    resolve(gifs.map((gif) => {
      const { id } = gif;
      const src = gif.src.slice(0, -4);
      return Object.assign({}, { id, src }, { tags: tags[id] });
    }));
  });
};

export const searchFor = (searchTerm, fuseIndex) => {
  return new Promise((resolve) => {
    const fuse = new Fuse(fuseIndex, {
      keys: ['tags.text', 'src'],
      maxPatternLength: 16,
      threshold: 0.4,
    });
    resolve(fuse.search(searchTerm).map(result => result.id));
  });
};
