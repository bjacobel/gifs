jest.unmock('../../src/reducers/auth');

import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
  GOOGLE_AUTH_SUCCEEDED,
  GOOGLE_AUTH_FAILED
} from '../../src/actions/auth';
import auth from '../../src/reducers/auth';

describe('`auth` reducer', () => {
  it(`sets isAuthed to \`authedWithGoogle\` and adds auth info to the cognito key on ${COGNITO_AUTH_SUCCEEDED}`, () => {
    expect(auth({
      isAuthenticated: false,
      cognito: {
        foo: 'bar'
      }
    }, {
      type: COGNITO_AUTH_SUCCEEDED,
      payload: {
        authInfo: {
          authedWithGoogle: true,
          foo: 'biff'
        }
      }
    })).toEqual({
      isAuthenticated: true,
      cognito: {
        authedWithGoogle: true,
        foo: 'biff'
      }
    });
  });

  it(`sets isAuthed false and adds an err to the cognito key on ${COGNITO_AUTH_FAILED}`, () => {
    expect(auth({
      isAuthenticated: true,
      cognito: {
        foo: 'bar'
      }
    }, {
      type: COGNITO_AUTH_FAILED,
      payload: {
        err: 'foo error'
      }
    })).toEqual({
      isAuthenticated: false,
      cognito: {
        error: 'foo error'
      }
    });
  });

  it(`adds auth info to the google key on ${GOOGLE_AUTH_SUCCEEDED}`, () => {
    expect(auth({}, {
      type: GOOGLE_AUTH_SUCCEEDED,
      payload: {
        authInfo: {
          id_token: 'foo'
        }
      }
    })).toEqual({
      google: {
        id_token: 'foo'
      }
    });
  });


  it(`sets isAuthed false and adds an err to the google key on ${GOOGLE_AUTH_FAILED}`, () => {
    expect(auth({
      isAuthenticated: true,
      google: {
        foo: 'bar'
      }
    }, {
      type: GOOGLE_AUTH_FAILED,
      payload: {
        err: 'foo error'
      }
    })).toEqual({
      isAuthenticated: false,
      google: {
        error: 'foo error'
      }
    });
  });

  it('does nothing by default', () => {
    expect(auth(undefined, {})).toEqual({});
  });
});
