import '../vendor/gapi';

import {
  AWS,
  google
} from '../constants';

export const doAuth = () => {
  const sts = new AWS.API.STS();

  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth', () => {
      // Google API Client Lib for JS bullshit to get a Google account token
      new Promise((resolve) => {
        window.gapi.client.setApiKey(google.BROWSER_KEY);
        return window.gapi.auth.init(resolve());
      }).then(() => {
        return new Promise((resolve) => {
          window.gapi.auth.authorize({
            client_id: google.CLIENT_ID,
            scope: google.SCOPES
          }, (token) => resolve(token));
        });
      // STS bullshit to switch into the higher-permissioned Cognito role
      }).then((token) => {
        sts.assumeRoleWithWebIdentity({
          RoleArn: AWS.AUTHED_ROLE_ARN,
          RoleSessionName: 'GifsAuthenticatedSession',
          WebIdentityToken: token.access_token
        }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
  });
};
