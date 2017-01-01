import React from 'react';
import { shallow } from 'enzyme';

import GifTags from '../../src/components/GifTags';

describe('GifTags component', () => {
  it('matches snapshot with no tags passed', () => {
    expect(shallow(<GifTags tags={ [] } />)).toMatchSnapshot();
  });

  describe('when passed tags', () => {
    const tags = [
      { id: '1', text: '1' },
      { id: '2', text: '2' },
      { id: '3', text: '3' },
      { id: '4', text: '4' },
      { id: '5', text: '5' },
    ];

    it('renders as many <Tag> components as tags passed', () => {
      const enzymeRepr = shallow(<GifTags tags={ tags } />);
      expect(enzymeRepr.find('Connect(Tag)').length).toEqual(tags.length + 1);
      expect(enzymeRepr.find('Connect(Tag)').last().prop('meta')).toEqual('add-tag');
    });

    it('matches snapshot', () => {
      const enzymeRepr = shallow(<GifTags tags={ tags } />);
      expect(enzymeRepr).toMatchSnapshot();
    });
  });
});
