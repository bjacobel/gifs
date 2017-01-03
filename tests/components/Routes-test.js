import React from 'react';
import { mount } from 'enzyme';

import Routes from '../../src/components/Routes';

jest.mock('../../src/components/Main');

const setPath = (value) => {
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value,
  });
};

describe('Routes component', () => {
  it('has a home route', () => {
    setPath('/');
    const routes = mount(<Routes />);
    expect(routes.find('Main').length).toBe(1);
  });

  it('has a route for search results', () => {
    setPath('/search/foo');
    const routes = mount(<Routes />);
    expect(routes.find('Main').length).toBe(1);
    expect(routes.find('Main').props()).toEqual(expect.objectContaining({ params: { search: 'foo' } }));
  });

  it('has a fallthrough 404 back to main', () => {
    setPath('/asdfasaddf');
    const routes = mount(<Routes />);
    expect(routes.find('Main').length).toBe(1);
  });
});
