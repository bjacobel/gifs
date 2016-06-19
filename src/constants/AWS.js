import 'aws-sdk/dist/aws-sdk';

export const BUCKET = 'gifs.bjacobel.com';
export const REGION = 'us-east-1';
export const COGNITO_POOL = 'us-east-1:a3c00e52-a8db-4b93-b1e1-8949a1759afe';
export const AUTHED_ROLE_ARN = 'arn:aws:iam::956518986395:role/Cognito_GifsAuth_Role';
export const DYNAMO_TABLE = 'gifs';

global.AWS.config.region = REGION;

// If no credentials have been set, auth into the default
// unauthenticated IAM role specified by the cognito pool
// (Default role lacks write privs on DynamoDB)
if (global.AWS.config.credentials === null) {
  global.AWS.config.credentials = new global.AWS.CognitoIdentityCredentials({
    IdentityPoolId: COGNITO_POOL
  });
}

export const API = global.AWS;
