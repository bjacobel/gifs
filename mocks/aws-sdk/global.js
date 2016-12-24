import { AUTHED_ROLE_ARN } from '../../src/constants/aws';

const config = {
  region: undefined,
};

const CognitoIdentityCredentials = jest.fn(authInfo => ({
  ...authInfo,
  refreshPromise: jest.fn(() => {
    if (!authInfo.RoleArn) {
      authInfo.RoleArn = AUTHED_ROLE_ARN; // eslint-disable-line no-param-reassign
    }

    config.credentials.webIdentityCredentials = { params: authInfo };
    return Promise.resolve();
  }),
  params: {},
}));

export default {
  CognitoIdentityCredentials,
  config,
};
