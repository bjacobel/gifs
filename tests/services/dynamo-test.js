import AWS from 'aws-sdk';
import shortid from 'shortid';

import {
  getAllTags,
  addTag,
  deleteTag,
} from '../../src/services/dynamo';
import {
  DYNAMO_TABLE,
  REGION,
} from '../../src/constants/aws';

jest.unmock('../../src/constants/aws');
jest.unmock('../../src/services/dynamo');

describe('Dynamo service', () => {
  describe('getAllTags', () => {
    it('creates a new Dynamo client with authInfo', () => {
      const authInfo = {
        params: {
          username: 'password',
        },
      };

      getAllTags(authInfo);

      expect(AWS.DynamoDB).lastCalledWith({
        region: REGION,
        credentials: authInfo.params,
      });
    });

    it('returns a Promise that resolves with the results of the scan', () => {
      return getAllTags({ params: {} }).then((data) => {
        expect(AWS.DynamoDB.prototype.scan).lastCalledWith({
          TableName: DYNAMO_TABLE,
          ProjectionExpression: 'gif_id,tag,id',
        }, jasmine.any(Function));

        expect(data).toEqual({ objects: [] });
      });
    });

    it('returns a Promise that rejects with the errors from the scan', () => {
      const err = { itDidnt: 'work' };

      AWS.DynamoDB.prototype.scan.mockImplementationOnce((params, callback) => {
        callback(err);
      });

      return getAllTags({ params: {} }).catch((error) => {
        expect(AWS.DynamoDB.prototype.scan).lastCalledWith({
          TableName: DYNAMO_TABLE,
          ProjectionExpression: 'gif_id,tag,id',
        }, jasmine.any(Function));

        expect(error).toEqual(err);
      });
    });
  });

  describe('addTag', () => {
    shortid.generate = jest.fn(() => 'shortid');

    it('creates a new Dynamo client with authInfo', () => {
      const authInfo = {
        params: {
          username: 'password',
        },
      };

      addTag(null, null, authInfo);

      expect(AWS.DynamoDB).lastCalledWith({
        region: REGION,
        credentials: authInfo.params,
      });
    });

    it('returns a Promise that resolves with the results of the put op', () => {
      return addTag('tag', 1, { params: {} }).then((data) => {
        expect(AWS.DynamoDB.prototype.putItem).lastCalledWith({
          TableName: DYNAMO_TABLE,
          Item: {
            id: { S: 'shortid' },
            gif_id: { S: 1 },
            tag: { S: 'tag' },
          },
        }, jasmine.any(Function));

        expect(data).toEqual({
          id: 'shortid',
          gif_id: 1,
          tag: 'tag',
        });
      });
    });

    it('returns a Promise that rejects with the errors from the put op', () => {
      const err = { itDidnt: 'work' };

      AWS.DynamoDB.prototype.putItem.mockImplementationOnce((params, callback) => {
        callback(err);
      });

      return addTag('tag', 1, { params: {} }).catch((error) => {
        expect(AWS.DynamoDB.prototype.putItem).lastCalledWith({
          TableName: DYNAMO_TABLE,
          Item: {
            id: { S: 'shortid' },
            gif_id: { S: 1 },
            tag: { S: 'tag' },
          },
        }, jasmine.any(Function));

        expect(error).toEqual(err);
      });
    });
  });

  describe('deleteTag', () => {
    it('creates a new Dynamo client with authInfo', () => {
      const authInfo = {
        params: {
          username: 'password',
        },
      };

      deleteTag(null, authInfo);

      expect(AWS.DynamoDB).lastCalledWith({
        region: REGION,
        credentials: authInfo.params,
      });
    });

    it('returns a Promise that resolves with the results of the delete op', () => {
      return deleteTag('1', { params: {} }).then((data) => {
        expect(AWS.DynamoDB.prototype.deleteItem).lastCalledWith({
          TableName: DYNAMO_TABLE,
          Key: {
            id: { S: '1' },
          },
        }, jasmine.any(Function));

        expect(data).toEqual('1');
      });
    });

    it('returns a Promise that rejects with the errors from the delete op', () => {
      const err = { itDidnt: 'work' };

      AWS.DynamoDB.prototype.deleteItem.mockImplementationOnce((params, callback) => {
        callback(err);
      });

      return deleteTag('1', { params: {} }).catch((error) => {
        expect(AWS.DynamoDB.prototype.deleteItem).lastCalledWith({
          TableName: DYNAMO_TABLE,
          Key: {
            id: { S: '1' },
          },
        }, jasmine.any(Function));

        expect(error).toEqual(err);
      });
    });
  });
});
