import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getAuth0AuthAsync } from '../actions/auth';

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
    const isAuthenticated = auth.isAuthenticated || false;
    const auth0Service = auth.auth0Service || { login: () => false };

    return (
      <button
        className={ classNames('login-btn', { authed: isAuthenticated }) }
        onClick={ auth0Service.login }
      >
        Sign in
      </button>
    );
  }
}

LoginButton.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.boolean,
    auth0Service: PropTypes.shape({
      login: PropTypes.func,
    }),
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);
