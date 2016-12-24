import AWS from 'aws-sdk/global';
import AWSS3 from 'aws-sdk/clients/s3';

import {
  REGION,
  BUCKET,
} from '../../src/constants/aws';
import { getBucketContents } from '../../src/services/s3';

jest.mock('aws-sdk/global');
jest.mock('aws-sdk/clients/s3');

describe('S3 service', () => {
  describe('getBucketContents', () => {
    it('creates a new S3 client from AWS using passed authInfo', () => {
      const authInfo = {
        params: {
          username: 'foo',
          password: 'bar',
        },
      };

      getBucketContents(authInfo);

      expect(AWS.CognitoIdentityCredentials).lastCalledWith(authInfo.params);
      expect(AWSS3).lastCalledWith({
        region: REGION,
        credentials: authInfo.params,
      });
    });

    it('calls S3.listObjects with the bucket', () => {
      getBucketContents({ params: {} });
      expect(AWSS3.prototype.listObjects).lastCalledWith({ Bucket: BUCKET }, expect.any(Function));
    });

    it('returns a promise that resolves with the data S3.listObjects callsback with', () => {
      return getBucketContents({ params: {} }).then((s3Data) => {
        expect(s3Data).toEqual({ objects: [] });
      });
    });

    it('returns a promise that rejects with the error S3.listObjects callsback with', () => {
      const err = { error: 'ya dun goofed' };
      AWSS3.prototype.listObjects.mockImplementationOnce((params, callback) => callback(err));

      return getBucketContents({ params: {} }).catch((s3Error) => {
        expect(s3Error).toEqual(err);
      });
    });
  });
});
