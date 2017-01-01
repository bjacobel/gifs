import React from 'react';
import { shallow } from 'enzyme';

import LoginButton from '../../src/components/LoginButton';
import { isAuthed } from '../../src/services/auth0';

jest.mock('../../src/services/auth0');

describe('LoginButton component', () => {
  it('matches snapshot when not authenticated', () => {
    isAuthed.mockImplementationOnce(() => false);

    expect(shallow(
      <LoginButton.WrappedComponent
        auth={ {} }
        getAuth0AuthAsync={ jest.fn() }
      />,
    )).toMatchSnapshot();
  });

  it('matches snapshot when authenticated', () => {
    isAuthed.mockImplementationOnce(() => true);

    expect(shallow(
      <LoginButton.WrappedComponent
        auth={ {} }
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
    isAuthed.mockImplementationOnce(() => true);

    const login = jest.fn();

    const enzymeRepr = shallow(
      <LoginButton.WrappedComponent
        auth={ {
          auth0Service: { login },
        } }
        getAuth0AuthAsync={ jest.fn() }
      />,
    );

    enzymeRepr.find('button').simulate('click');
    expect(login).toBeCalled();
  });
});
