import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Gif from '../../src/components/Gif';
import Image from '../../src/services/image';

jest.mock('../../src/services/image');

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
    image.addEventListener = jest.fn((eventName, func) => { image.evToRun = func; });
    image.dispatchEvent = jest.fn(() => image.evToRun());

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

  it('calls finishLoad if the load was already complete when image was passed', () => {
    console.log = jest.fn();
    const loadSpy = spy(Gif.prototype, 'finishLoad');
    const renderedGif = shallow(gif);

    renderedGif.find('img').simulate('mouseOver');
    image.src = 'https://gifs.bjacobel.com/partyparrot.gif';
    image.complete = true;
    renderedGif.setProps('image', image);
    renderedGif.update();

    expect(loadSpy.calledOnce).toBeTruthy();
  });
});
