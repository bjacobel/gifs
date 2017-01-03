import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchBox from '../../src/components/SearchBox';

describe('SearchBox component', () => {
  it('matches snapshot', () => {
    expect(shallow(<SearchBox.WrappedComponent searchGifsAsync={ jest.fn() } />)).toMatchSnapshot();
  });

  it('matches snapshot when it gets an initialSearch param', () => {
    expect(
      mount( // must use mount so ref callback is run
        <SearchBox.WrappedComponent
          searchGifsAsync={ jest.fn() }
          searchIndex={ ['idk'] }
          initialSearch="foo"
        />,
      ),
    ).toMatchSnapshot();
  });

  it('sets the value through use of the ref callback', () => {
    expect(
      mount( // must use mount so ref callback is run
        <SearchBox.WrappedComponent
          searchGifsAsync={ jest.fn() }
          searchIndex={ ['idk'] }
          initialSearch="foo"
        />,
      ).find('input').node.value,
    ).toEqual('foo');
  });

  it('calls searchGifsAsync when input changes', () => {
    const searchGifsAsync = jest.fn();
    const enzymeRepr = shallow(<SearchBox.WrappedComponent searchGifsAsync={ searchGifsAsync } />);
    enzymeRepr.find('input')
      .simulate('change', { currentTarget: { value: 'a' } })
      .simulate('change', { currentTarget: { value: 'b' } })
      .simulate('change', { currentTarget: { value: 'c' } });
    expect(searchGifsAsync).toHaveBeenCalledTimes(3);
  });

  it('calls searchGifsAsync with initialSearch if passed it', () => {
    const searchGifsAsync = jest.fn();
    shallow(
      <SearchBox.WrappedComponent
        searchGifsAsync={ searchGifsAsync }
        initialSearch="foo"
        searchIndex={ ['idk'] }
      />,
    );
    expect(searchGifsAsync).lastCalledWith('foo');
  });
});
