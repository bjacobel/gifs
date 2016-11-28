module.exports = {
  src_folders: ['integration/tests'],
  output_folder: 'reports',
  globals_path: 'integration/setup.js',
  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    host: process.env.SELENIUM_HOST || '127.0.0.1',
    port: process.env.SELENIUM_PORT || 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.ie.driver': '',
    },
  },
  test_workers: { enabled: true, workers: 'auto' },
  test_runner: 'mocha',
  test_settings: {
    sauce: {
      launch_url: 'http://localhost',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: {
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
    default: {
      selenium_port: 9515,
      selenium_host: 'localhost',
      default_path_prefix: '',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--no-sandbox',
            '--auto-open-devtools-for-tabs',
          ],
        },
        acceptSslCerts: true,
      },
    },
  },
};
