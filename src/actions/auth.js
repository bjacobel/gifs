import * as cognito from '../services/cognito';
import * as google from '../services/google';

export const COGNITO_AUTH_REQUESTED = 'COGNITO_AUTH_REQUESTED';
export const COGNITO_AUTH_SUCCEEDED = 'COGNITO_AUTH_SUCCEEDED';
export const COGNITO_AUTH_FAILED = 'COGNITO_AUTH_FAILED';
export const GOOGLE_AUTH_REQUESTED = 'GOOGLE_AUTH_REQUESTED';
export const GOOGLE_AUTH_SUCCEEDED = 'GOOGLE_AUTH_SUCCEEDED';
export const GOOGLE_AUTH_FAILED = 'GOOGLE_AUTH_FAILED';

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

const googleAuthRequested = () => {
  return { type: GOOGLE_AUTH_REQUESTED };
};

const googleAuthSucceeded = (authInfo) => {
  return { type: GOOGLE_AUTH_SUCCEEDED, payload: { authInfo } };
};

const googleAuthFailed = (err) => {
  console.trace(err);
  return { type: GOOGLE_AUTH_FAILED, payload: { err }, error: true };
};

export const getCognitoAuthAsync = () => {
  return (dispatch, getState) => {
    dispatch(cognitoAuthRequested());

    if (!getState().auth.google) {
      dispatch(googleAuthRequested());

      // We parse the google auth info and dispatch actions to add it to state in ../components/Router
      return google.requestAccessToken()
        .catch((err) => {
          dispatch(googleAuthFailed(err));
        });
    }

    if (!getState().auth.google.id_token) {
      dispatch(cognitoAuthFailed('No id_token returned by Google'));
    }

    return cognito.obtainAuthRole(getState().auth.google.id_token)
      .then((authInfo) => {
        dispatch(cognitoAuthSucceeded(authInfo));
      })
      .catch((err) => {
        dispatch(cognitoAuthFailed(err));
      });
  };
};

export const gotGoogleAuthInfo = (authInfo) => {
  return (dispatch) => {
    dispatch(googleAuthSucceeded(authInfo));
    dispatch(getCognitoAuthAsync());
  };
};
