import * as cognito from '../services/cognito';
import * as google from '../services/google';

export const COGNITO_AUTH_REQUESTED = 'COGNITO_AUTH_REQUESTED';
export const COGNITO_AUTH_SUCCEEDED = 'COGNITO_AUTH_SUCCEEDED';
export const COGNITO_AUTH_FAILED = 'COGNITO_AUTH_FAILED';

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

    if (!getState().auth.googleAccessToken) {
      return google.requestAccessToken();
      // The actual work of getting an access token will be handled by the router
      // on the /googleAuth page and those reducers
    }
    // else
    return google.getAccessToken()
      .then((accessToken) => {
        return cognito.obtainAuthRole(accessToken);
      })
      .then((authInfo) => {
        dispatch(cognitoAuthSucceeded(authInfo));
      })
      .catch((err) => {
        dispatch(cognitoAuthFailed(err));
      });
  };
};
