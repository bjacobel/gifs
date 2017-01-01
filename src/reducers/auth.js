import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
  AUTH0_AUTH_SUCCEEDED,
  AUTH0_SERVICE_CREATED,
} from '../actions/auth';

export default (state = {}, action) => {
  switch (action.type) {
  case COGNITO_AUTH_SUCCEEDED:
    return {
      ...state,
      cognito: action.payload.authInfo,
    };
  case COGNITO_AUTH_FAILED:
    return {
      ...state,
      cognito: {
        error: action.payload.err,
      },
    };
  case AUTH0_AUTH_SUCCEEDED:
    return {
      ...state,
      idToken: action.payload.idToken,
      idTokenExpiry: action.payload.idTokenExpiry,
    };
  case AUTH0_SERVICE_CREATED:
    return {
      ...state,
      auth0Service: action.payload.auth0Service,
    };
  default:
    return state;
  }
};
