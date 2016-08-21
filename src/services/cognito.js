import { AWS } from '../constants';

export const obtainAuthRole = (idToken) => {
  return new Promise((resolve) => {
    Object.assign(AWS.API.config.credentials.params, {
      RoleArn: AWS.AUTHED_ROLE_ARN,
      Logins: {
        'accounts.google.com': idToken
      }
    });

    AWS.API.config.credentials.refresh((err) => {
      if (err) {
        console.error(err);
      }
    });

    resolve(AWS.API.config.credentials);
  });
};
