import AWS from 'aws-sdk/global';

import {
  AUTHED_ROLE_ARN,
  COGNITO_POOL,
  REGION,
  UNAUTHED_ROLE_ARN,
} from '../constants/aws';
import { requestAccessToken } from './google';

export const obtainAuthRole = (googleAuth) => {
  return new Promise((resolve, reject) => {
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: COGNITO_POOL,
    });

    Object.assign(AWS.config.credentials.params, {
      RoleArn: AUTHED_ROLE_ARN,
      Logins: {
        'accounts.google.com': googleAuth.id_token,
      },
    });

    return AWS.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.assign({}, AWS.config.credentials.webIdentityCredentials, { authedWithGoogle: true }));
      }
    });
  });
};

export const obtainUnauthedRole = () => {
  return new Promise((resolve, reject) => {
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      RoleArn: UNAUTHED_ROLE_ARN,
      IdentityPoolId: COGNITO_POOL,
    });

    return AWS.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.assign({}, AWS.config.credentials.webIdentityCredentials, { authedWithGoogle: false }));
      }
    });
  });
};

// Will trigger a google auth flow if credentials are expired on Google's end
// AWS can refresh automatically
export const obtainCurrentRole = (authState) => {
  const { google } = authState;

  if (google && google.expires_at < (new Date()).getTime()) {
    // Google creds are expired
    return requestAccessToken().then(() => obtainAuthRole(google));
  } else if (google && google.id_token && google.expires_at >= (new Date()).getTime()) {
    // Google creds are fine, get Cognito authed role
    return obtainAuthRole(google);
  } else {
    // We're not in a position where we can auth, return the unauthed role
    return obtainUnauthedRole();
  }
};
