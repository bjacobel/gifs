import * as cognito from '../services/cognito';

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
  return (dispatch) => {
    dispatch(cognitoAuthRequested());

    return cognito.doAuth()
      .then((authInfo) => {
        dispatch(cognitoAuthSucceeded(authInfo));
      })
      .catch((err) => {
        dispatch(cognitoAuthFailed(err));
      });
  };
};
