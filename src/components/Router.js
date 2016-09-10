import { Component } from 'react';
import { connect } from 'react-redux';

import { gotGoogleAuthInfo } from '../actions/auth.js';
import { parseGooglePostback } from '../services/google.js';

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
    switch (window.location.pathname) {
    case '/googleAuth':
      parseGooglePostback(this.props.gotGoogleAuthInfo);
      break;
    case '/error':
      alert(window.location.hash);  // eslint-disable-line no-alert
      break;
    default:
      // nothing
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
