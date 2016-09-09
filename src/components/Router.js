import { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { gotGoogleAuthInfo } from '../actions/auth.js';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  gotGoogleAuthInfo
};

class Router extends Component {
  componentWillMount() {
    if (window.location.pathname === '/googleAuth') {
      const authInfo = queryString.parse(window.location.hash);
      this.props.gotGoogleAuthInfo(authInfo);
      window.history.replaceState({}, null, '/');
    }
  }

  render() {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
