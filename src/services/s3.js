// @flow

import AWS from 'aws-sdk/global';
import AWSS3 from 'aws-sdk/clients/s3';
import {
  BUCKET,
  REGION,
} from '../constants/aws';

export function getBucketContents(authInfo: { params: Object }) {  // eslint-disable-line import/prefer-default-export
  const S3 = new AWSS3({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials(authInfo.params),
  });
  const S3params = {
    Bucket: BUCKET,
  };

  return S3.listObjects(S3params).promise();
}
