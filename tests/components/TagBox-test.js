import React from 'react';
import { shallow } from 'enzyme';

import TagBox from '../../src/components/TagBox';
import { copy } from '../../src/services/clipboard';

jest.mock('../../src/services/clipboard');

describe('TagBox component', () => {
  const tags = {
    1: [
      { id: '1', text: 'first tag for 1' },
      { id: '1', text: '2nd tag for 1' },
      { id: '1', text: '3rd tag for 1' },
    ],
  };

  const gifs = [
    { id: '1', src: '1.com' },
    { id: '2', src: '2.com' },
  ];

  it("matches snapshot when the activeGif doesn't have tags", () => {
    expect(
      shallow(
        <TagBox.WrappedComponent
          tags={ tags }
          gifs={ gifs }
          activeGif="2"
          getTagsAsync={ jest.fn() }
        />,
      ),
    ).toMatchSnapshot();
  });

  it('matches snapshot when the activeGif has tags', () => {
    expect(
      shallow(
        <TagBox.WrappedComponent
          tags={ tags }
          gifs={ gifs }
          activeGif="1"
          getTagsAsync={ jest.fn() }
        />,
      ),
    ).toMatchSnapshot();
  });

  it('matches snapshot when no activeGif is set', () => {
    expect(
      shallow(
        <TagBox.WrappedComponent
          tags={ tags }
          gifs={ gifs }
          getTagsAsync={ jest.fn() }
        />,
      ),
    ).toMatchSnapshot();
  });

  it('calls the copy service when you click the name of a gif', () => {
    shallow(
      <TagBox.WrappedComponent
        tags={ tags }
        gifs={ gifs }
        getTagsAsync={ jest.fn() }
        activeGif="1"
      />,
    ).find('.copy-icon').simulate('mouseUp');

    expect(copy).toBeCalled();
  });
});
