describe('authentication integration tests', () => {
  describe('when not logged in at all', () => {
    it('should not allow addition of tags', (browser) => {
      browser.url('http://localhost:8080')
        .waitForElementVisible('div[data-reactroot]', 1000);
      browser.moveToElement('.gif-wrapper');
      browser.expect.element('.tag-wrapper.adder').not.to.be.visible;
      browser.expect.element('.tag-wrapper.adder input').not.to.be.visible;
      browser.end();
    });

    it('should not allow deletion of tags', (browser) => {
      browser.url('http://localhost:8080')
        .waitForElementVisible('div[data-reactroot]', 1000);
      browser.moveToElement('.gif-wrapper');
      browser.expect.element('.tag .del-tag').not.to.be.visible;
      browser.end();
    });

    describe('login button', () => {
      it('should be visible', (browser) => {
        browser.url('http://localhost:8080')
          .waitForElementVisible('div[data-reactroot]', 1000);
        browser.expect.element('.login-btn').to.be.visible;
        browser.end();
      });

      it('should redirect to Google when clicked', (browser) => {
        browser.url('http://localhost:8080')
          .waitForElementVisible('div[data-reactroot]', 1000);
        browser.element('.login-btn').click();
        browser.assert.urlContains('accounts.google.com/o/oauth2');
        browser.end();
      });

      it('should accept a postback from Google', (browser) => {
        browser.url('http://localhost:8080/googleAuth#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmNTNmNDA4YTY2NTY1OGIwM2JiNjdmZmY0YTk0Y2RhNjlkNzJhZWQifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE0ODAyODcyNDQsImV4cCI6MTQ4MDI5MDg0NCwiYXVkIjoiNjk2Mjk3MjIyMzMxLTV1ZmdndWNyNDU0MWxycmxkNmtobTRxcjhsOHU0djZsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyOTQzMTM0NzE0OTcxMTA1NDYwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjY5NjI5NzIyMjMzMS01dWZnZ3VjcjQ1NDFscnJsZDZraG00cXI4bDh1NHY2bC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImhkIjoiYmphY29iZWwuY29tIiwibm9uY2UiOiJub25jZSIsImVtYWlsIjoiYnJpYW5AYmphY29iZWwuY29tIiwibmFtZSI6IkJyaWFuIEphY29iZWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1xWk9qNmhaMkl4US9BQUFBQUFBQUFBSS9BQUFBQUFBQUFCZy9pSkZJRlUxSmlWby9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQnJpYW4iLCJmYW1pbHlfbmFtZSI6IkphY29iZWwiLCJsb2NhbGUiOiJlbiJ9.H-ZBMe93mnlUU5ZUneUlxfQ96GWK-wZd02fxwptCc6UYt_ycO1lHFz0pk-TCPEwRgJKJp7VBwekyk0rn4wzupUcNcNc1Z-A7Vx4gTQK9Ggu3lY4WT_fuDmM10UstWkpWA2btN1wjscDK1CPikA_nUhAG3IbTP5bzAFOgQJZfyO_VYfDUbsqH5SNv1yuDNAUnezdICf0HsYkZyELpUG6PY3jtCensT9AjnWlYZ-vVo9CbSgvY3GJReQIn6FKnCvNbXRzp4GOtVFa8QW4CH8_lORScep3cQmoz0MuqEVdqcu2pqenrkt9bCKCTPzYeLhoAwml-GjQtq_-dM3m55vGEOw&authuser=1&hd=bjacobel.com&session_state=a9e51e611b5c37c40bfae8bd472b98736e63ddb8..a2f1&prompt=none')
          .waitForElementVisible('div[data-reactroot]', 1000);
        browser.end();
      });
    });
  });
});
