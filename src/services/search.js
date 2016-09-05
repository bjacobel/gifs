import Fuse from 'fuse.js';

export const updateIndex = (gifs, tags) => {
  return new Promise((resolve) => {
    // enrich gifs with tag info. We keep these seaparate in state because Reasons
    const joined = gifs.map((gif) => {
      return Object.assign({}, gif, { tags: tags[gif.id] });
    });

    resolve(new Fuse(joined, {
      keys: ['tags.text', 'src'],
      include: ['score'],
      maxPatternLength: 16
    }));
  });
};

export const searchFor = (searchTerm, fuseIndex) => {
  return fuseIndex.search(searchTerm);
};
