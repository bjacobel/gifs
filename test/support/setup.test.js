import chai, { expect } from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import sinonChai from 'sinon-chai';

global.expect = expect;
global.sinon = sinon;

chai.use(sinonChai);

before((done) => {
  if (global.jsdom) {
    global.jsdom.env({
      html: '<div></div>',
      done: (err, window) => {
        global.window = window;
        global.document = window.document;
        done();
      }
    });
  } else {
    done();
  }
});
