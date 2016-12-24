import AWS from 'aws-sdk/global';

import {
  AUTHED_ROLE_ARN,
  COGNITO_POOL,
  REGION,
  UNAUTHED_ROLE_ARN,
} from '../constants/aws';
import { DOMAIN } from '../constants/auth0';
import { isAuthed } from './auth0';

export const obtainAuthRole = (idToken) => {
  return new Promise((resolve, reject) => {
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: COGNITO_POOL,
    });

    Object.assign(AWS.config.credentials.params, {
      RoleArn: AUTHED_ROLE_ARN,
      Logins: {
        [DOMAIN]: idToken,
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

export const obtainCurrentRole = (auth) => {
  if (isAuthed(auth)) {
    return obtainAuthRole(auth.idToken);
  } else {
    // Either there is no token or it has expired, so get the unauthed role
    return obtainUnauthedRole();
  }
};
