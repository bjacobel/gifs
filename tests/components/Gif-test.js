import React from 'react';
import renderer from 'react-test-renderer';

import Gif from '../../src/components/Gif';
import fakeImage from './image.gif';

describe('Gif component', () => {
  let gif;
  let watchForSize = jest.fn();

  beforeEach(() => {
      gif = renderer.create(
        <Gif
          image={ { src: fakeImage } }
          id={ 1 }
          name="testgif"
          watchForSize={ watchForSize }
        />
      );
  });

  it('matches the initial state snapshot', () => {

  });
})
