import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
  AUTH0_AUTH_SUCCEEDED,
  AUTH0_SERVICE_CREATED,
} from '../actions/auth';

export default (state = {}, action) => {
  switch (action.type) {
  case COGNITO_AUTH_SUCCEEDED:
    return Object.assign({}, state, {
      isAuthenticated: action.payload.authInfo.isAuthed,
      cognito: action.payload.authInfo,
    });
  case COGNITO_AUTH_FAILED:
    return Object.assign({}, state, {
      isAuthenticated: false,
      cognito: {
        error: action.payload.err,
      },
    });
  case AUTH0_AUTH_SUCCEEDED:
    return Object.assign({}, state, { idToken: action.payload.idToken, idTokenExpiry: action.payload.idTokenExpiry });
  case AUTH0_SERVICE_CREATED:
    return Object.assign({}, state, { auth0Service: action.payload.auth0Service });
  default:
    return state;
  }
};
