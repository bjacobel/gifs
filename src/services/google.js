import queryString from 'query-string';
import { USER_EMAIL } from '../constants';
import {
  OAUTH_ENDPOINT,
  EXPIRY_ENDPOINT,
  CLIENT_ID,
  SCOPES
} from '../constants/google';

export const requestAccessToken = () => {
  return new Promise((resolve) => {
    const authURL = `${OAUTH_ENDPOINT}?${queryString.stringify({
      response_type: 'id_token',
      nonce: 'nonce',
      client_id: CLIENT_ID,
      redirect_uri: `${window.location.origin}/googleAuth`,
      scope: SCOPES,
      prompt: 'select_account',
      login_hint: USER_EMAIL
    })}`;
    resolve(window.location.assign(authURL));
  });
};

export const parseGooglePostback = (callback) => {
  if (window.location.pathname === '/googleAuth') {
    const authInfo = queryString.parse(window.location.hash);
    const { id_token } = authInfo;
    window.history.replaceState({}, null, '/');
    fetch(`${EXPIRY_ENDPOINT}?${queryString.stringify({ id_token })}`).then((response) => {
      return response.json();
    }).then((json) => {
      const expires_at = (new Date()).getTime() + json.expires_in * 1000;  // eslint-disable-line camelcase
      callback(Object.assign({}, authInfo, { expires_at }));
    });
  }
};
