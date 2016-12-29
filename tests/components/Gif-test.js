import React from 'react';
import { shallow } from 'enzyme';

import Gif from '../../src/components/Gif';

describe('Gif component', () => {
  let gif;
  let image;

  beforeEach(() => {
    document.querySelector = jest.fn(() => ({ scrollWidth: 500 }));
    image = new Image();
    image.src = 'https://gifthumbs.bjacobel.com/partyparrot.gif';

    gif = (
      <Gif
        image={ image }
        id="asdf"
        name="testgif"
        watchForSize={ jest.fn() }
      />
    );
  });

  it('matches the initial state snapshot', () => {
    expect(shallow(gif)).toMatchSnapshot();
  });

  it('matches snapshot after load of the full gif is triggered', () => {
    const renderedGif = shallow(gif);

    renderedGif.find('img').simulate('mouseOver');
    image.src = 'https://gifs.bjacobel.com/partyparrot.gif';
    renderedGif.setProps('image', image);

    expect(renderedGif).toMatchSnapshot();
  });

  it('matches snapshot after load of the full gif is finished', () => {
    const renderedGif = shallow(gif);

    renderedGif.find('img').simulate('mouseOver');
    image.src = 'https://gifs.bjacobel.com/partyparrot.gif';
    renderedGif.setProps('image', image);
    image.dispatchEvent(new Event('load'));
    renderedGif.update();

    expect(renderedGif).toMatchSnapshot();
  });

  it('unmounts and removes the event listener', () => {
    const renderedGif = shallow(gif);

    renderedGif.find('img').simulate('mouseOver');
    image.src = 'https://gifs.bjacobel.com/partyparrot.gif';
    renderedGif.setProps('image', image);
    image.dispatchEvent(new Event('load'));
    renderedGif.unmount();

    expect(image.src).toEqual('//:0');
  });
});
