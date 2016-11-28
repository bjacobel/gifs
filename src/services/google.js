import queryString from 'query-string';
import fetch from './fetch';

import { ROOT_DOMAIN } from '../constants';
import {
  OAUTH_ENDPOINT,
  EXPIRY_ENDPOINT,
  CLIENT_ID,
  SCOPES,
} from '../constants/google';
import { redirectToError } from './error';

export const requestAccessToken = () => {
  return new Promise((resolve) => {
    const authURL = `${OAUTH_ENDPOINT}?${queryString.stringify({
      response_type: 'id_token',
      nonce: 'nonce',
      client_id: CLIENT_ID,
      redirect_uri: `${window.location.origin}/googleAuth`,
      scope: SCOPES,
      hd: ROOT_DOMAIN,
    })}`;

    resolve(window.location.assign(authURL));
  });
};

export const parseGooglePostback = (callback) => {
  const authInfo = queryString.parse(window.location.hash);
  const { id_token } = authInfo;

  return fetch(`${EXPIRY_ENDPOINT}?${queryString.stringify({ id_token })}`).then((response) => {
    return response.json();
  }).then((json) => {
    if (json.email.split('@')[1] !== ROOT_DOMAIN) {
      throw new Error(`Email domain ${json.email.split('@')[1]} didn't match required domain ${ROOT_DOMAIN}`);
    }

    const expires_at = json.exp * 1000;  // eslint-disable-line camelcase

    console.log(callback);

    callback(Object.assign({}, authInfo, { expires_at }));

    window.history.replaceState({}, null, '/');
  }).catch((err) => {
    redirectToError(err);
  });
};
