import AWS from 'aws-sdk-umd';
import { BUCKET } from '../constants/aws';

export function getBucketContents() {
  const S3 = new AWS.S3();
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
