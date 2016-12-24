export default {
  CognitoIdentityCredentials: jest.fn(authInfo => authInfo),
  config: {
    region: undefined,
    credentials: {
      params: undefined,
      webIdentityCredentials: undefined,
      refresh: jest.fn(),
    },
  },
};
