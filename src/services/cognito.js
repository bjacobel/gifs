import {
  AWS,
  COGNITO_POOL,
  AUTHED_ROLE_ARN
} from '../constants';

export const doAuth = () => {
  AWS.config.update({
    credentials: new AWS.CognitoIdentityCredentials({
      RoleArn: AUTHED_ROLE_ARN,
      IdentityPoolId: COGNITO_POOL
    })
  });
};
