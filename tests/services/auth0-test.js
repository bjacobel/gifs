import Auth0Lock from 'auth0-lock';

import Auth0Service from '../../src/services/auth0';

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
