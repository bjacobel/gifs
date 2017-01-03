import React from 'react';
import { shallow } from 'enzyme';

import Main from '../../src/components/Main';

describe('Main component', () => {
  it('matches snapshot', () => {
    expect(shallow(<Main />)).toMatchSnapshot();
  });

  it('passes search param along to SearchBox if it gets it from React Router', () => {
    const enzymeRepr = shallow(<Main params={ { search: 'foo' } } />);

    expect(enzymeRepr.find('Connect(SearchBox)').prop('initialSearch')).toEqual('foo');
  });
});
