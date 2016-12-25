// @flow

import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
  AUTH0_AUTH_SUCCEEDED,
  AUTH0_SERVICE_CREATED,
} from '../actions/auth';
import Auth0Service from '../services/auth0';

type AuthAction = {
  type: COGNITO_AUTH_SUCCEEDED | COGNITO_AUTH_FAILED | AUTH0_AUTH_SUCCEEDED | AUTH0_SERVICE_CREATED,
  payload: {
    authInfo?: {
      isAuthed: boolean
    },
    err?: Error,
    idToken?: string,
    idTokenExpiry?: number,
    auth0Service?: Class<Auth0Service>,
  },
};

type AuthState = {
  isAuthenticated?: boolean,
  idToken?: string,
  idTokenExpiry?: number,
  cognito?: {},
  auth0Service?: {},
};

export default (state: AuthState = {}, action: AuthAction ) => {
  switch (action.type) {
  case COGNITO_AUTH_SUCCEEDED:
    const { authInfo } = action.payload;
    let isAuthed = false;

    if (authInfo) {
      isAuthed = authInfo.isAuthed;
    }

    return {
      ...state,
      isAuthenticated: isAuthed,
      cognito: authInfo,
    };
  case COGNITO_AUTH_FAILED:
    return {
      ...state,
      isAuthenticated: false,
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
