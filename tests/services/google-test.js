import { requestAccessToken } from '../../src/services/google';
import {
  OAUTH_ENDPOINT,
} from '../../src/constants/google';

describe('Google auth service', () => {
  describe('requestAccessToken', () => {
    window.location.assign = jest.fn();

    it('returns a Promise (though, like, why?)', () => {
      expect(requestAccessToken() instanceof Promise).toBeTruthy();
    });

    it("sets the window location to Google's OAuth endpoint", () => {
      expect(window.location.assign.mock.calls[0][0]).toMatch(OAUTH_ENDPOINT);
    });
  });
});
