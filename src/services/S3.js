import { AWS } from '../constants';
import 'aws/dist/aws-sdk';

export function getBucketContents() {
  return global.AWS.S3.getBucket(AWS.bucket)
  .then((response) => {
    return response.json();
  }).then((json) => {
    return json;
  });
}
