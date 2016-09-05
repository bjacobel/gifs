const S3 = jest.fn();
S3.prototype = {
  listObjects: jest.fn((params, callback) => {
    callback(null, { objects: [] });
  })
};

const DynamoDB = jest.fn();
DynamoDB.prototype = {
  scan: jest.fn((params, callback) => {
    callback(null, { objects: [] });
  }),
  putItem: jest.fn((params, callback) => {
    callback(null, params.item);
  }),
  deleteItem: jest.fn((id, callback) => {
    callback(null, id);
  })
};

export default {
  CognitoIdentityCredentials: jest.fn((authInfo) => authInfo),
  DynamoDB,
  S3
};
