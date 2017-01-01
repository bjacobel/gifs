import AWS from 'aws-sdk/global';

import {
  obtainAuthRole,
  obtainUnauthedRole,
  obtainCurrentRole,
} from '../../src/services/cognito';
import { isAuthed } from '../../src/services/auth0';
import {
  UNAUTHED_ROLE_ARN,
  AUTHED_ROLE_ARN,
} from '../../src/constants/aws';

jest.mock('aws-sdk/global');
jest.mock('../../src/services/auth0');

describe('cognito service', () => {
  describe('obtainAuthRole', () => {
    it('has the authed role arn in its creds params after', () => {
      return obtainAuthRole('token').then((creds) => {
        expect(creds.params.RoleArn).toEqual(AUTHED_ROLE_ARN);
      });
    });

    it('refreshes creds', () => {
      return obtainAuthRole('token').then(() => {
        expect(AWS.config.credentials.refreshPromise).toHaveBeenCalled();
      });
    });

    it('refreshes creds and rejects if refresh throws an err', () => {
      AWS.config.credentials.refreshPromise.mockImplementationOnce(() => Promise.reject(new Error()));
      return obtainAuthRole('token').catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });

  describe('obtainUnauthedRole', () => {
    it('has the unauthed role arn in its creds params after', () => {
      return obtainUnauthedRole().then((creds) => {
        expect(creds.params.RoleArn).toEqual(UNAUTHED_ROLE_ARN);
      });
    });

    it('refreshes creds', () => {
      return obtainUnauthedRole().then(() => {
        expect(AWS.config.credentials.refreshPromise).toHaveBeenCalled();
      });
    });

    it('refreshes creds and rejects if refresh throws an err', () => {
      AWS.config.credentials.refreshPromise.mockImplementationOnce(() => Promise.reject(new Error()));
      return obtainUnauthedRole().catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });

  describe('obtainCurrentRole', () => {
    it('calls obtainAuthRole if there is an idToken passed', () => {
      isAuthed.mockImplementationOnce(() => true);

      return obtainCurrentRole({ idToken: 'foo' }).then((creds) => {
        expect(creds.params.RoleArn).toEqual(AUTHED_ROLE_ARN);
      });
    });

    it('calls obtainUnauthRole if there is no idToken passed', () => {
      isAuthed.mockImplementationOnce(() => false);

      return obtainCurrentRole({}).then((creds) => {
        expect(creds.params.RoleArn).toEqual(UNAUTHED_ROLE_ARN);
      });
    });
  });
});
