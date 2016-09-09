import AWS from 'aws-sdk-umd';

import {
  AUTHED_ROLE_ARN,
  COGNITO_POOL,
  REGION,
  UNAUTHED_ROLE_ARN
} from '../constants/aws';

export const obtainAuthRole = (idToken) => {
  return new Promise((resolve, reject) => {
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: COGNITO_POOL
    });

    Object.assign(AWS.config.credentials.params, {
      RoleArn: AUTHED_ROLE_ARN,
      Logins: {
        'accounts.google.com': idToken
      }
    });

    AWS.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      }
    });
    resolve(Object.assign({}, AWS.config.credentials.webIdentityCredentials, { authedWithGoogle: true }));
  });
};

export const obtainUnauthedRole = () => {
  return new Promise((resolve, reject) => {
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      RoleArn: UNAUTHED_ROLE_ARN,
      IdentityPoolId: COGNITO_POOL
    });

    AWS.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      }
    });

    resolve(Object.assign({}, AWS.config.credentials.webIdentityCredentials, { authedWithGoogle: false }));
  });
};

export const obtainCurrentRole = (googleAuthState) => {
  if (googleAuthState && googleAuthState.id_token && googleAuthState.expires_at > (new Date()).getTime()) {
    return obtainAuthRole(googleAuthState.id_token);
  } else {
    return obtainUnauthedRole();
  }
};
