import React from 'react';
import { shallow } from 'enzyme';

import LoginButton from '../../src/components/LoginButton';

describe('LoginButton component', () => {
  it('matches snapshot when not authenticated', () => {
    expect(shallow(
      <LoginButton.WrappedComponent
        auth={ {
          isAuthenticated: false,
        } }
        getAuth0AuthAsync={ jest.fn() }
      />,
    )).toMatchSnapshot();
  });

  it('matches snapshot when authenticated', () => {
    expect(shallow(
      <LoginButton.WrappedComponent
        auth={ {
          isAuthenticated: true,
        } }
        getAuth0AuthAsync={ jest.fn() }
      />,
    )).toMatchSnapshot();
  });

  it('calls getAuth0AuthAsync on mount', () => {
    const getAuth0AuthAsync = jest.fn();

    shallow(<LoginButton.WrappedComponent auth={ {} } getAuth0AuthAsync={ getAuth0AuthAsync } />);

    expect(getAuth0AuthAsync).toBeCalled();
  });

  it('calls auth0Service.login on click', () => {
    const login = jest.fn();

    const enzymeRepr = shallow(
      <LoginButton.WrappedComponent
        auth={ {
          isAuthenticated: true,
          auth0Service: { login },
        } }
        getAuth0AuthAsync={ jest.fn() }
      />,
    );

    enzymeRepr.find('button').simulate('click');
    expect(login).toBeCalled();
  });
});
