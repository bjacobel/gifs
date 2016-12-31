import React from 'react';
import { shallow } from 'enzyme';

import GifWrapper from '../../src/components/GifWrapper';

jest.mock('../../src/services/image');

describe('GifWrapper component', () => {
  it('matches the snapshot', () => {
    const enzymeRepr = shallow(
      <GifWrapper.WrappedComponent
        gif={ { id: '1', src: '//:0' } }
        animation={ { 1: false } }
        animateGif={ jest.fn() }
        freezeGif={ jest.fn() }
        saveMostRecentAnimation={ jest.fn() }
        watchForSize={ jest.fn() }
      />,
    );

    expect(enzymeRepr).toMatchSnapshot();
  });

  describe('pointer events', () => {
    it('calls enableMotion on mouseOver', () => {
      const animate = jest.fn();
      const saveAnimation = jest.fn();

      const gifWrapper = shallow(
        <GifWrapper.WrappedComponent
          gif={ { id: '1', src: '//:0' } }
          animation={ { 1: true } }
          animateGif={ animate }
          freezeGif={ jest.fn() }
          saveMostRecentAnimation={ saveAnimation }
          watchForSize={ jest.fn() }
        />,
      );

      gifWrapper.simulate('mouseOver');

      expect(animate).toHaveBeenCalled();
      expect(saveAnimation).toHaveBeenCalled();
    });

    it('calls disableMotion on mouseOut', () => {
      const freezeGif = jest.fn();

      const gifWrapper = shallow(
        <GifWrapper.WrappedComponent
          gif={ { id: '1', src: '//:0' } }
          animation={ { 1: false } }
          animateGif={ jest.fn() }
          freezeGif={ freezeGif }
          saveMostRecentAnimation={ jest.fn() }
          watchForSize={ jest.fn() }
        />,
      );

      gifWrapper.simulate('mouseOut');
      expect(freezeGif).lastCalledWith('1');
    });

    it('calls toggleMotion on each click', () => {
      const animateGif = jest.fn();
      const freezeGif = jest.fn();

      const gifWrapper = shallow(
        <GifWrapper.WrappedComponent
          gif={ { id: '1', src: '//:0' } }
          animation={ { 1: false } }
          animateGif={ animateGif }
          freezeGif={ freezeGif }
          saveMostRecentAnimation={ jest.fn() }
          watchForSize={ jest.fn() }
        />,
      );

      gifWrapper.simulate('touchEnd');
      expect(animateGif).toHaveBeenCalled();

      gifWrapper.setProps({ animation: { 1: true } });

      gifWrapper.simulate('touchEnd');
      expect(freezeGif).toHaveBeenCalled();
    });
  });

  describe('shouldComponentUpdate', () => {
    let component;

    beforeEach(() => {
      component = (
        <GifWrapper.WrappedComponent
          gif={ { id: '1', src: '//:0' } }
          animation={ { 1: false } }
          animateGif={ jest.fn() }
          freezeGif={ jest.fn() }
          saveMostRecentAnimation={ jest.fn() }
          watchForSize={ jest.fn() }
        />
      );
    });

    it("doesn't update unless animation[that gif's id] changes", () => {
      GifWrapper.WrappedComponent.prototype.render = jest.fn();
      const enzymeRepr = shallow(component);
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(1);
      enzymeRepr.setProps({ animation: { 1: false } });
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(1);
    });

    it('does update when animation[id for that gif] changes', () => {
      GifWrapper.WrappedComponent.prototype.render = jest.fn();
      const enzymeRepr = shallow(component);
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(1);
      enzymeRepr.setProps({ animation: { 1: true } });
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(2);
    });

    it("doesn't update when nextProps animation doesn't include the id for the gif", () => {
      GifWrapper.WrappedComponent.prototype.render = jest.fn();
      const enzymeRepr = shallow(component);
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(1);
      enzymeRepr.setProps({ animation: { 2: false } });
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(1);
    });

    it("updates when original animation doesn't include the id for the gif, but nextProps does", () => {
      GifWrapper.WrappedComponent.prototype.render = jest.fn();
      const enzymeRepr = shallow(
        <GifWrapper.WrappedComponent
          gif={ { id: '1', src: '//:0' } }
          animation={ { 2: false } }
          animateGif={ jest.fn() }
          freezeGif={ jest.fn() }
          saveMostRecentAnimation={ jest.fn() }
          watchForSize={ jest.fn() }
        />,
      );
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(1);
      enzymeRepr.setProps({ animation: { 1: true } });
      expect(GifWrapper.WrappedComponent.prototype.render).toHaveBeenCalledTimes(2);
    });
  });
});
