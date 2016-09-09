import queryString from 'query-string';
import { USER_EMAIL } from '../constants';
import {
  OAUTH_ENDPOINT,
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
    window.history.replaceState({}, null, '/');
    callback(authInfo);
  }
};
