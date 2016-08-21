import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
  GOOGLE_AUTH_SUCCEEDED,
  GOOGLE_AUTH_FAILED
} from '../actions/auth';

export default function auth(state = {}, action) {
  switch (action.type) {
  case COGNITO_AUTH_SUCCEEDED:
    return Object.assign({}, state, {
      isAuthenticated: action.payload.authInfo.authedWithGoogle,
      cognito: action.payload.authInfo
    });
  case COGNITO_AUTH_FAILED:
    return Object.assign({}, state, {
      isAuthenticated: false,
      cognito: {
        error: action.payload.err
      }
    });
  case GOOGLE_AUTH_SUCCEEDED:
    return Object.assign({}, state, {
      google: action.payload.authInfo
    });
  case GOOGLE_AUTH_FAILED:
    return Object.assign({}, state, {
      isAuthenticated: false,
      google: {
        error: action.payload.err
      }
    });
  default:
    return state;
  }
}
