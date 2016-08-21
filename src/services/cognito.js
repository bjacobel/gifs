import { AWS } from '../constants';

export const obtainAuthRole = (idToken) => {
  return new Promise((resolve, reject) => {
    AWS.API.config.credentials = new AWS.API.CognitoIdentityCredentials({
      IdentityPoolId: AWS.COGNITO_POOL
    });

    Object.assign(AWS.API.config.credentials.params, {
      RoleArn: AWS.AUTHED_ROLE_ARN,
      Logins: {
        'accounts.google.com': idToken
      }
    });

    AWS.API.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      }
    });
    resolve(Object.assign({}, AWS.API.config.credentials.webIdentityCredentials, { authedWithGoogle: true }));
  });
};

export const obtainUnauthedRole = () => {
  return new Promise((resolve, reject) => {
    AWS.API.config.credentials = new AWS.API.CognitoIdentityCredentials({
      RoleArn: AWS.UNAUTHED_ROLE_ARN,
      IdentityPoolId: AWS.COGNITO_POOL
    });

    AWS.API.config.credentials.refresh((err) => {
      if (err) {
        reject(err);
      }
    });

    resolve(Object.assign({}, AWS.API.config.credentials.webIdentityCredentials, { authedWithGoogle: false }));
  });
};

export const obtainCurrentRole = (googleAuthState) => {
  if (googleAuthState && googleAuthState.id_token) {
    return obtainAuthRole(googleAuthState.id_token);
  } else {
    return obtainUnauthedRole();
  }
};
