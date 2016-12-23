import AWS from 'aws-sdk/global';

import {
  AUTHED_ROLE_ARN,
  COGNITO_POOL,
  REGION,
  UNAUTHED_ROLE_ARN,
} from '../constants/aws';
import AuthService from '../services/auth0';
import {
  CLIENT_ID,
  DOMAIN,
} from '../constants/auth0';

export const obtainAuthRole = (token) => {
  return new Promise((resolve, reject) => {
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: COGNITO_POOL,
    });

    Object.assign(AWS.config.credentials.params, {
      RoleArn: AUTHED_ROLE_ARN,
      Logins: {
        [DOMAIN]: token,
      },
    });

    return AWS.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.assign({}, AWS.config.credentials.webIdentityCredentials, { isAuthed: true }));
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
        resolve(Object.assign({}, AWS.config.credentials.webIdentityCredentials, { isAuthed: false }));
      }
    });
  });
};

export const obtainCurrentRole = () => {
  const auth = new AuthService(CLIENT_ID, DOMAIN);

  if (auth.loggedIn()) {
    return obtainAuthRole(auth.getToken());
  } else {
    // We're not in a position where we can auth, return the unauthed role
    return obtainUnauthedRole();
  }
};
