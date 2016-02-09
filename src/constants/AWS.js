import 'aws-sdk/dist/aws-sdk';

export const BUCKET = 'gifs.bjacobel.com';
export const REGION = 'us-east-1';
export const COGNITO_POOL = 'us-east-1:a3c00e52-a8db-4b93-b1e1-8949a1759afe';

global.AWS.config.region = REGION;
global.AWS.config.credentials = new global.AWS.CognitoIdentityCredentials({
  IdentityPoolId: COGNITO_POOL
});

export const API = global.AWS;
