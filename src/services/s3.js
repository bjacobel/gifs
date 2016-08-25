import AWS from 'aws-sdk-umd';
import {
  BUCKET,
  REGION
} from '../constants/aws';

export function getBucketContents(authInfo) {
  const S3 = new AWS.S3({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials(authInfo.params)
  });
  const S3params = {
    Bucket: BUCKET
  };

  return new Promise((resolve, reject) => {
    S3.listObjects(S3params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
