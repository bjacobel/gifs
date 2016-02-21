import { AWS } from '../constants';

export function getBucketContents() {
  const S3 = new AWS.API.S3();
  const S3params = {
    Bucket: AWS.BUCKET
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
