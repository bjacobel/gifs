import React from 'react';
import { shallow } from 'enzyme';

import Tag from '../../src/components/Tag';

describe('Tag component', () => {
  describe('when unauthenticated', () => {
    it('matches snapshot if displayed as an add-tag', () => {
      expect(shallow(
        <Tag.WrappedComponent
          meta="add-tag"
          auth={ { isAuthenticated: false } }
          addTagAsync={ jest.fn() }
          deleteTagAsync={ jest.fn() }
        />,
      )).toMatchSnapshot();
    });

    it('matches snapshot if displayed as a normal tag', () => {
      expect(shallow(
        <Tag.WrappedComponent
          content="first tag"
          id="1"
          auth={ { isAuthenticated: false } }
          addTagAsync={ jest.fn() }
          deleteTagAsync={ jest.fn() }
        />,
      )).toMatchSnapshot();
    });
  });

  describe('when authenticated', () => {
    describe('a normal tag', () => {
      it('matches snapshot', () => {
        expect(shallow(
          <Tag.WrappedComponent
            content="first tag"
            id="1"
            auth={ { isAuthenticated: true } }
            addTagAsync={ jest.fn() }
            deleteTagAsync={ jest.fn() }
          />,
        )).toMatchSnapshot();
      });

      it('fires delete tag method when del-tag span clicked', () => {
        const deleteTagAsync = jest.fn();
        const enzymeRepr = shallow(
          <Tag.WrappedComponent
            content="first tag"
            id="1"
            auth={ { isAuthenticated: true } }
            addTagAsync={ jest.fn() }
            deleteTagAsync={ deleteTagAsync }
          />,
        );

        enzymeRepr.find('.del-tag').simulate('mouseUp');
        expect(deleteTagAsync).toBeCalledWith('1');
      });
    });

    describe('an add-tag', () => {
      it('matches snapshot', () => {
        expect(shallow(
          <Tag.WrappedComponent
            meta="add-tag"
            auth={ { isAuthenticated: true } }
            addTagAsync={ jest.fn() }
            deleteTagAsync={ jest.fn() }
          />,
        )).toMatchSnapshot();
      });

      it('updates state with the content to add on change', () => {
        const enzymeRepr = shallow(
          <Tag.WrappedComponent
            meta="add-tag"
            auth={ { isAuthenticated: true } }
            addTagAsync={ jest.fn() }
            deleteTagAsync={ jest.fn() }
          />,
        );

        enzymeRepr.find('input').simulate('change', { target: { value: 'tag to add' } });
        expect(enzymeRepr.state('value')).toEqual('tag to add');
      });

      it('adds the tag when the add-tag span is clicked', () => {
        const addTagAsync = jest.fn();
        const enzymeRepr = shallow(
          <Tag.WrappedComponent
            meta="add-tag"
            auth={ { isAuthenticated: true } }
            addTagAsync={ addTagAsync }
            deleteTagAsync={ jest.fn() }
          />,
        );

        enzymeRepr.setState({ value: 'tag to add' });
        enzymeRepr.find('.add-tag').simulate('mouseUp');
        expect(addTagAsync).toBeCalledWith('tag to add');
      });

      it('adds the tag when enter is pressed', () => {
        const addTagAsync = jest.fn();
        const enzymeRepr = shallow(
          <Tag.WrappedComponent
            meta="add-tag"
            auth={ { isAuthenticated: true } }
            addTagAsync={ addTagAsync }
            deleteTagAsync={ jest.fn() }
          />,
        );

        enzymeRepr.setState({ value: 'tag to add' });
        enzymeRepr.find('input').simulate('keyPress', { nativeEvent: { keyCode: 13 } });
        expect(addTagAsync).toBeCalledWith('tag to add');
      });
    });
  });
});
