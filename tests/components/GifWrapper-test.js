import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

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
    let renderSpy;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();

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

      renderSpy = sandbox.spy(GifWrapper.WrappedComponent.prototype, 'render');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("doesn't update unless animation[that gif's id] changes", () => {
      const enzymeRepr = shallow(component);
      expect(renderSpy.calledOnce).toBeTruthy();
      enzymeRepr.setProps({ animation: { 1: false } });
      expect(renderSpy.calledOnce).toBeTruthy();
    });

    it('does update when animation[id for that gif] changes', () => {
      const enzymeRepr = shallow(component);
      expect(renderSpy.calledOnce).toBeTruthy();
      enzymeRepr.setProps({ animation: { 1: true } });
      expect(renderSpy.calledTwice).toBeTruthy();
    });

    it("doesn't update when nextProps animation doesn't include the id for the gif", () => {
      const enzymeRepr = shallow(component);
      expect(renderSpy.calledOnce).toBeTruthy();
      enzymeRepr.setProps({ animation: { 2: false } });
      expect(renderSpy.calledOnce).toBeTruthy();
    });

    it("updates when original animation doesn't include the id for the gif, but nextProps does", () => {
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
      expect(renderSpy.calledOnce).toBeTruthy();
      enzymeRepr.setProps({ animation: { 1: true } });
      expect(renderSpy.calledTwice).toBeTruthy();
    });
  });
});
