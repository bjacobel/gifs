import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import AuthService from '../services/auth0';
import {
  CLIENT_ID,
  DOMAIN,
} from '../constants/auth0';

export default class LoginButton extends Component {
  componentWillMount() {
    this.auth = new AuthService(CLIENT_ID, DOMAIN);
  }

  render() {
    return (
      <button
        className={ classNames('login-btn', { authed: this.auth.loggedIn() }) }
        onClick={ this.auth.login }
      >
        Sign in
      </button>
    );
  }
}

LoginButton.propTypes = {
  auth: PropTypes.instanceOf(AuthService)
};
