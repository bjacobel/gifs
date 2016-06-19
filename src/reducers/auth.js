import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED
} from '../actions/auth';

export default function auth(state = { isAuthenticated: false }, action) {
  switch (action.type) {
  case COGNITO_AUTH_SUCCEEDED:
    return {
      isAuthenticated: true,
      details: action.payload.authInfo
    };
  case COGNITO_AUTH_FAILED:
    return {
      isAuthenticated: false,
      error: action.payload.err
    };
  default:
    return state;
  }
}
