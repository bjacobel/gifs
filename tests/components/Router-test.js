import { stringify } from 'query-string';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Router from '../../src/components/Router';
import { gotGoogleAuthInfo } from '../../src/actions/auth';

jest.mock('../../src/actions/auth', () => ({
  gotGoogleAuthInfo: jest.fn(),
}));

jest.mock('../../src/services/fetch', () => () => Promise.resolve({
  json: () => Promise.resolve({
    exp: 1,
    email: 'brian@bjacobel.com',
  }),
}));

const mockStore = configureStore([thunk]);
const setPath = (pathname, hash) => {
  // thanks @cpojer! https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value: pathname,
  });

  Object.defineProperty(window.location, 'hash', {
    writable: true,
    value: hash,
  });
};
const exampleAuthReturn = {
  id_token: 'fake_id',
  authuser: '1',
  hd: 'bjacobel.com',
  session_state: 'fake_state',
  prompt: 'none',
};

describe('router', () => {
  describe('googleAuth postback route', () => {
    const postback = () => {
      setPath('/googleAuth', stringify(exampleAuthReturn));
    };

    describe('when auth state is empty', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('gets google auth info and sends it to the action', () => {
        postback();
        mount(<Router store={ store } />);

        expect(gotGoogleAuthInfo).lastCalledWith({});
      });
    });
  });
});
