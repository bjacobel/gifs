import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getAuth0AuthAsync } from '../actions/auth';
import { isAuthed } from '../services/auth0';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getAuth0AuthAsync,
};

class LoginButton extends Component {
  componentWillMount() {
    this.props.getAuth0AuthAsync();
  }

  render() {
    const { auth } = this.props;
    const auth0Service = auth.auth0Service || { login: () => false };

    return (
      <button
        className={ classNames('login-btn', { authed: isAuthed(auth) }) }
        onClick={ auth0Service.login }
      >
        Sign in
      </button>
    );
  }
}

LoginButton.propTypes = {
  auth: PropTypes.shape({
    auth0Service: PropTypes.shape({
      login: PropTypes.func,
    }),
    idToken: PropTypes.string,
    idTokenExpiry: PropTypes.number,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);
