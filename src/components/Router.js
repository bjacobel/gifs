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
    parseGooglePostback(this.props.gotGoogleAuthInfo);
  }

  render() {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
