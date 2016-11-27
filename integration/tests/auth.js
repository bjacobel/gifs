describe('authentication integration tests', () => {
  describe('when not logged in at all', () => {
    it('should show a login button', (browser) => {
      browser.url('http://localhost:8080');
      browser.expect.element('.login-btn').to.be.visible;
      browser.end();
    });
  });
});
