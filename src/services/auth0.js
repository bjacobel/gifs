// Borrowed mostly wholesale from the Auth0 SPA documentation

import Auth0Lock from 'auth0-lock';
import { REDIRECT_URL } from '../constants/auth0';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: REDIRECT_URL,
        responseType: 'token',
      },
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {  // eslint-disable-line class-methods-use-this
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {  // eslint-disable-line class-methods-use-this
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {  // eslint-disable-line class-methods-use-this
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}
