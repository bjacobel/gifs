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
  }),
};

export default DynamoDB;
