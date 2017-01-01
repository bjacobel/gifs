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
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: COGNITO_POOL,
  });

  AWS.config.credentials.params = {
    ...AWS.config.credentials.params,
    RoleArn: AUTHED_ROLE_ARN,
    Logins: {
      [DOMAIN]: idToken,
    },
  };

  return AWS.config.credentials.refreshPromise()
    .then(() => ({
      ...AWS.config.credentials.webIdentityCredentials,
    }));
};

export const obtainUnauthedRole = () => {
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    RoleArn: UNAUTHED_ROLE_ARN,
    IdentityPoolId: COGNITO_POOL,
  });

  return AWS.config.credentials.refreshPromise()
    .then(() => ({
      ...AWS.config.credentials.webIdentityCredentials,
    }));
};

export const obtainCurrentRole = (auth) => {
  if (isAuthed(auth)) {
    if (auth.cognito && auth.cognito.params.RoleArn === AUTHED_ROLE_ARN) {
      // we already have the role we need, don't refresh
      return Promise.resolve(auth.cognito);
    } else {
      return obtainAuthRole(auth.idToken);
    }
  } else {
    if (auth.cognito && auth.cognito.params.RoleArn === UNAUTHED_ROLE_ARN) {  // eslint-disable-line no-lonely-if
      // we already have the role we need, don't refresh
      return Promise.resolve(auth.cognito);
    } else {
    // Either there is no token or it has expired, so get the unauthed role
      return obtainUnauthedRole();
    }
  }
};
