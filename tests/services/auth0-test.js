import Auth0Lock from 'auth0-lock';

import Auth0Service, { isAuthed } from '../../src/services/auth0';

jest.mock('auth0-lock');

describe('Auth0 Lock service', () => {
  describe('on instantiation', () => {
    it('creates a new instance of Auth0Lock', () => {
      new Auth0Service('client id', 'domain', jest.fn());  // eslint-disable-line no-new
      expect(Auth0Lock).toHaveBeenCalled();
    });
  });

  describe('login method', () => {
    it('shows the login window', () => {
      Auth0Lock.show = jest.fn();
      const auth0 = new Auth0Service('client id', 'domain', jest.fn());
      auth0.login();
      expect(Auth0Lock.prototype.show).toHaveBeenCalled();
    });
  });
});

describe('isAuthed helper', () => {
  it('returns false if there is no idToken', () => {
    expect(isAuthed({ idTokenExpiry: 999999999999 })).toBeFalsy();
  });

  it('returns false if there is no idTokenExpiry', () => {
    expect(isAuthed({ idToken: 'token' })).toBeFalsy();
  });

  it('returns false if the idTokenExpiry is in the past', () => {
    expect(isAuthed({ idToken: 'token', idTokenExpiry: 0 })).toBeFalsy();
  });

  it('returns true if all data is present and the timedelta to the expiry is positive', () => {
    expect(isAuthed({ idToken: 'token', idTokenExpiry: ((new Date()).getTime() / 1000) + 50 })).toBeTruthy();
  });
});
