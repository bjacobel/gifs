import queryString from 'query-string';
import { google, USER_EMAIL } from '../constants';

export const requestAccessToken = () => {
  window.location.assign(`${google.OAUTH_ENDPOINT}?${queryString.stringify({
    response_type: 'token',
    client_id: google.CLIENT_ID,
    redirect_uri: `${window.location.origin}/googleAuth`,
    scope: google.SCOPES,
    prompt: 'select_account',
    login_hint: USER_EMAIL
  })}`);
};
