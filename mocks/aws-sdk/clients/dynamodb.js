const DynamoDB = jest.fn();

DynamoDB.prototype = {
  scan: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({ objects: [] })),
  })),
  putItem: jest.fn(params => ({
    promise: jest.fn(() => Promise.resolve(params.id)),
  })),
  deleteItem: jest.fn(id => ({
    promise: jest.fn(() => Promise.resolve(id)),
  })),
};

export default DynamoDB;
