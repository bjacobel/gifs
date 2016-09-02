const S3 = jest.fn();
S3.prototype = {
  listObjects: jest.fn((params, callback) => {
    callback(null, { objects: [] });
  })
};

export default {
  S3,
  CognitoIdentityCredentials: jest.fn(() => ({ fake: 'aws creds' }))
};
