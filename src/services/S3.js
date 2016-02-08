import { AWS } from '../constants';
import 'aws-sdk/dist/aws-sdk';

export function getBucketContents() {
  const S3 = new global.AWS.S3({
    region: AWS.REGION,
    credentials: AWS.CREDENTIALS
  });
  const S3params = {
    'Bucket': AWS.BUCKET
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
