import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getGoogleAuthAsync } from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  getGoogleAuthAsync
};

export default class LoginButton extends Component {
  render() {
    const { auth } = this.props;

    return (
      <button
        className={ classNames('login-btn', { authed: auth.isAuthenticated }) }
        onClick={ this.props.getGoogleAuthAsync }
      >
        Sign in
      </button>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
