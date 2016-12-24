import { AUTHED_ROLE_ARN } from '../../src/constants/aws';

const config = {
  region: undefined,
};

const CognitoIdentityCredentials = jest.fn(authInfo => ({
  ...authInfo,
  refresh: jest.fn((callback) => {
    if (!authInfo.RoleArn) {
      authInfo.RoleArn = AUTHED_ROLE_ARN; // eslint-disable-line no-param-reassign
    }

    config.credentials.webIdentityCredentials = { params: authInfo };
    callback();
  }),
  params: {},
}));

export default {
  CognitoIdentityCredentials,
  config,
};
