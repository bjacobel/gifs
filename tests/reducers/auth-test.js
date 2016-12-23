import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
} from '../../src/actions/cognito';
import auth from '../../src/reducers/cognito';

describe('`auth` reducer', () => {
  it(`sets isAuthed to \`isAuthed\` and adds auth info to the cognito key on ${COGNITO_AUTH_SUCCEEDED}`, () => {
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

  it(`sets isAuthed false and adds an err to the cognito key on ${COGNITO_AUTH_FAILED}`, () => {
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

  it('does nothing by default', () => {
    expect(auth(undefined, {})).toEqual({});
  });
});
