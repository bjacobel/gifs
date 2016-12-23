import Auth0Service from '../services/auth0';
import { obtainCurrentRole } from '../services/cognito';
import {
  CLIENT_ID,
  DOMAIN,
} from '../constants/auth0';

export const COGNITO_AUTH_REQUESTED = 'COGNITO_AUTH_REQUESTED';
export const COGNITO_AUTH_SUCCEEDED = 'COGNITO_AUTH_SUCCEEDED';
export const COGNITO_AUTH_FAILED = 'COGNITO_AUTH_FAILED';
export const AUTH0_AUTH_SUCCEEDED = 'AUTH0_AUTH_SUCCEEDED';
export const AUTH0_SERVICE_CREATED = 'AUTH0_SERVICE_CREATED';

const cognitoAuthRequested = () => {
  return { type: COGNITO_AUTH_REQUESTED };
};

const cognitoAuthSucceeded = (authInfo) => {
  return { type: COGNITO_AUTH_SUCCEEDED, payload: { authInfo } };
};

const cognitoAuthFailed = (err) => {
  console.trace(err);
  return { type: COGNITO_AUTH_FAILED, payload: { err }, error: true };
};

export const getCognitoAuthAsync = () => {
  return (dispatch, getState) => {
    dispatch(cognitoAuthRequested());

    return obtainCurrentRole(getState().auth)
      .then((authInfo) => {
        dispatch(cognitoAuthSucceeded(authInfo));
      })
      .catch((err) => {
        dispatch(cognitoAuthFailed(err));
      });
  };
};

const auth0AuthSucceeded = (idToken) => {
  return { type: AUTH0_AUTH_SUCCEEDED, payload: { idToken } };
};

const auth0ServiceCreated = (auth0Service) => {
  return { type: AUTH0_SERVICE_CREATED, payload: { auth0Service } };
};

export const getAuth0AuthAsync = () => {
  return (dispatch, getState) => {
    const { auth0Service } = getState().auth;

    const callback = (authResult) => {
      dispatch(auth0AuthSucceeded(authResult.idToken));
      dispatch(getCognitoAuthAsync());
    };

    if (!auth0Service) {
      dispatch(auth0ServiceCreated(new Auth0Service(CLIENT_ID, DOMAIN, callback)));
    }
  };
};
