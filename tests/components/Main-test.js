import React from 'react';
import { shallow } from 'enzyme';

import Main from '../../src/components/Main';

describe('Main component', () => {
  it('matches snapshot', () => {
    expect(shallow(<Main />)).toMatchSnapshot();
  });
});
