import queryString from 'query-string';
import { google, USER_EMAIL } from '../constants';

export const requestAccessToken = () => {
  return new Promise((resolve) => {
    const authURL = `${google.OAUTH_ENDPOINT}?${queryString.stringify({
      response_type: 'id_token',
      nonce: 'nonce',
      client_id: google.CLIENT_ID,
      redirect_uri: `${window.location.origin}/googleAuth`,
      scope: google.SCOPES,
      prompt: 'select_account',
      login_hint: USER_EMAIL
    })}`;
    resolve(window.location.assign(authURL));
  });
};
