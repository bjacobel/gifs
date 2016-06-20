import { AWS } from '../constants';

export const obtainAuthRole = (accessToken) => {
  AWS.API.config.credentials = new AWS.API.WebIdentityCredentials({
    RoleArn: AWS.AUTHED_ROLE_ARN,
    WebIdentityToken: accessToken,
    ProviderId: null
  });

  AWS.API.config.credentials.refresh((err) => {
    console.error(err);
  });

  return new Promise((resolve) => {
    resolve(AWS.API.config.credentials);
  });
};
