import {
  COGNITO_AUTH_SUCCEEDED,
  COGNITO_AUTH_FAILED,
} from '../actions/cognito';

export default (state = {}, action) => {
  switch (action.type) {
  case COGNITO_AUTH_SUCCEEDED:
    return Object.assign({}, state, {
      isAuthenticated: action.payload.authInfo.isAuthed,
      cognito: action.payload.authInfo,
    });
  case COGNITO_AUTH_FAILED:
    return Object.assign({}, state, {
      isAuthenticated: false,
      cognito: {
        error: action.payload.err,
      },
    });
  default:
    return state;
  }
};
