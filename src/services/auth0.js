import Auth0Lock from 'auth0-lock';
import { REDIRECT_URL } from '../constants/auth0';

export const isAuthed = (auth) => {
  const { idToken, idTokenExpiry } = auth;
  return idToken && idTokenExpiry && ((new Date()).getTime() / 1000) < idTokenExpiry;
};

export default class Auth0Service {
  constructor(clientId, domain, callback) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      theme: {
        logo: 'https://gifs.bjacobel.com/partyparrot.gif',
        primaryColor: '#4376fb',
      },
      languageDictionary: {
        title: 'Gifs',
      },
      auth: {
        redirectUrl: REDIRECT_URL,
        responseType: 'token',
      },
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', callback);
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }
}
