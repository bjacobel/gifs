const S3 = jest.fn();
S3.prototype = {
  listObjects: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({ objects: [] })),
  })),
};

export default S3;
