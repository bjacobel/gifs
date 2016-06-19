import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getCognitoAuthAsync } from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  getCognitoAuthAsync
};

export default class LoginButton extends Component {
  render() {
    const { auth } = this.props;
    let msg;

    if (auth.isAuthenticated) {
      msg = `Signed in as ${auth}`;
    } else {
      msg = 'Sign in';
    }

    return (
      <button
        className={ classNames('login-btn', { authed: auth.isAuthenticated }) }
        onClick={ this.props.getCognitoAuthAsync }
      >
        { msg }
      </button>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
