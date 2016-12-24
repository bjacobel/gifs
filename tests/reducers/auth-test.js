import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
  AUTH0_AUTH_SUCCEEDED,
  AUTH0_SERVICE_CREATED,
} from '../../src/actions/auth';
import auth from '../../src/reducers/auth';

describe('`auth` reducer', () => {
  describe(`when type is ${COGNITO_AUTH_SUCCEEDED}`, () => {
    it('sets isAuthenticated to `true` and adds auth info to the cognito key', () => {
      expect(auth({
        isAuthenticated: false,
        cognito: {
          foo: 'bar',
        },
      }, {
        type: COGNITO_AUTH_SUCCEEDED,
        payload: {
          authInfo: {
            isAuthed: true,
            foo: 'biff',
          },
        },
      })).toEqual({
        isAuthenticated: true,
        cognito: {
          isAuthed: true,
          foo: 'biff',
        },
      });
    });
  });

  describe(`when type is ${COGNITO_AUTH_FAILED}`, () => {
    it('sets isAuthed to `false` and adds an err to the cognito key', () => {
      expect(auth({
        isAuthenticated: true,
        cognito: {
          foo: 'bar',
        },
      }, {
        type: COGNITO_AUTH_FAILED,
        payload: {
          err: 'foo error',
        },
      })).toEqual({
        isAuthenticated: false,
        cognito: {
          error: 'foo error',
        },
      });
    });
  });

  describe(`when type is ${AUTH0_AUTH_SUCCEEDED}`, () => {
    it('adds the passed idToken to auth state', () => {
      expect(auth(undefined, {
        type: AUTH0_AUTH_SUCCEEDED,
        payload: {
          idToken: 'token',
          idTokenExpiry: 100,
        },
      })).toEqual({
        idToken: 'token',
        idTokenExpiry: 100,
      });
    });
  });

  describe(`when type is ${AUTH0_SERVICE_CREATED}`, () => {
    it('adds some complex object representing the auth0 service class to state', () => {
      expect(auth(undefined, {
        type: AUTH0_SERVICE_CREATED,
        payload: {
          auth0Service: { a: 1 },
        },
      })).toEqual({
        auth0Service: { a: 1 },
      });
    });
  });

  it('does nothing by default', () => {
    expect(auth(undefined, {})).toEqual({});
  });
});
