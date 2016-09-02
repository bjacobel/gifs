jest.unmock('../../src/services/s3');

import AWS from 'aws-sdk-umd';
import {
  REGION,
  BUCKET
} from '../../src/constants/aws';
import { getBucketContents } from '../../src/services/s3';

describe('S3 service', () => {
  describe('getBucketContents', () => {
    it('creates a new S3 client from AWS using passed authInfo', () => {
      const authInfo = {
        params: {
          username: 'foo',
          password: 'bar'
        }
      };

      getBucketContents(authInfo);

      expect(AWS.CognitoIdentityCredentials).lastCalledWith(authInfo.params);
      expect(AWS.S3).lastCalledWith({
        region: REGION,
        credentials: { fake: 'aws creds' }
      });
    });

    it('calls S3.listObjects with the bucket', () => {
      getBucketContents({ params: {} });
      expect(AWS.S3.prototype.listObjects).lastCalledWith({ Bucket: BUCKET }, jasmine.any(Function));
    });

    it('returns a promise that resolves with the data S3.listObjects callsback with', () => {
      return getBucketContents({ params: {} }).then((s3Data) => {
        expect(s3Data).toEqual({ objects: [] });
      });
    });

    it('returns a promise that rejects with the error S3.listObjects callsback with', () => {
      const err = { error: 'ya dun goofed' };
      AWS.S3.prototype.listObjects.mockImplementationOnce((params, callback) => callback(err));

      return getBucketContents({ params: {} }).catch((s3Error) => {
        expect(s3Error).toEqual(err);
      });
    });
  });
});
