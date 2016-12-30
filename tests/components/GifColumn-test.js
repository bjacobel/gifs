import React from 'react';
import { shallow } from 'enzyme';

import GifColumn from '../../src/components/GifColumn';

const makeGifs = (numGifs) => {
  const gifs = [];

  for (let i = 0; i < numGifs; i += 1) {
    gifs.push({
      id: i.toString(),
      observedHeight: 400,
      src: '//:0',
    });
  }

  return gifs;
};

describe('GifColumn component', () => {
  it('matches snapshot when displaying all gifs', () => {
    const gifColumn = (
      <GifColumn.WrappedComponent
        getGifsAsync={ jest.fn }
        gifs={ makeGifs(10) }
        searchResults={ [] }
      />
    );

    expect(shallow(gifColumn)).toMatchSnapshot();
  });

  it('matches snapshot when filtering by search results', () => {
    const gifColumn = (
      <GifColumn.WrappedComponent
        getGifsAsync={ jest.fn }
        gifs={ makeGifs(10) }
        searchResults={ ['1', '2', '3'] }
      />
    );

    const enzymeWrapperGifColumn = shallow(gifColumn);
    expect(enzymeWrapperGifColumn.find('Connect(GifWrapper)').length).toEqual(3);
    expect(enzymeWrapperGifColumn).toMatchSnapshot();
  });
});
