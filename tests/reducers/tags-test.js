jest.unmock('../../src/reducers/tags');
jest.unmock('../../src/actions/tags');

import tags from '../../src/reducers/tags';
import {
  GET_TAGS_SUCCEEDED,
  ADD_TAG_SUCCEEDED,
  DELETE_TAG_SUCCEEDED
} from '../../src/actions/tags';

describe('`tags` reducer', () => {
  describe(`with action type ${GET_TAGS_SUCCEEDED}`, () => {
    it("creates a new entry in the tags state if the id doesn't exist", () => {
      const reduced = tags({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      }, {
        type: GET_TAGS_SUCCEEDED,
        payload: {
          tags: {
            Items: [
              {
                id: { S: 'id of bar tag' },
                gif_id: { S: 'gif2' },
                tag: { S: 'this tag says bar' }
              }
            ]
          }
        }
      });

      expect(reduced).toEqual({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }],
        gif2: [{
          text: 'this tag says bar',
          id: 'id of bar tag'
        }]
      });
    });

    it('adds to the existing entry in the tags state already exists', () => {
      const reduced = tags({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      }, {
        type: GET_TAGS_SUCCEEDED,
        payload: {
          tags: {
            Items: [
              {
                id: { S: 'id of bar tag' },
                gif_id: { S: 'gif1' },
                tag: { S: 'this tag says bar' }
              }
            ]
          }
        }
      });

      expect(reduced).toEqual({
        gif1: [
          {
            text: 'this tag says foo',
            id: 'id of foo tag'
          },
          {
            text: 'this tag says bar',
            id: 'id of bar tag'
          }
        ]
      });
    });

    it('handles multiple tags, and ids with multiple tags', () => {
      const reduced = tags({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      }, {
        type: GET_TAGS_SUCCEEDED,
        payload: {
          tags: {
            Items: [
              {
                id: { S: 'id of bar tag' },
                gif_id: { S: 'gif1' },
                tag: { S: 'this tag says bar' }
              },
              {
                id: { S: 'id of bizz tag' },
                gif_id: { S: 'gif2' },
                tag: { S: 'this tag says bizz' }
              },
              {
                id: { S: 'id of buzz tag' },
                gif_id: { S: 'gif2' },
                tag: { S: 'this tag says buzz' }
              }
            ]
          }
        }
      });

      expect(reduced).toEqual({
        gif1: [
          {
            text: 'this tag says foo',
            id: 'id of foo tag'
          },
          {
            text: 'this tag says bar',
            id: 'id of bar tag'
          }
        ],
        gif2: [
          {
            text: 'this tag says bizz',
            id: 'id of bizz tag'
          },
          {
            text: 'this tag says buzz',
            id: 'id of buzz tag'
          }
        ]
      });
    });
  });

  describe(`with action type ${ADD_TAG_SUCCEEDED}`, () => {
    it('appends tag to list if there are already some for this gif', () => {
      expect(tags({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      }, {
        type: ADD_TAG_SUCCEEDED,
        payload: {
          tagDocument: {
            id: 'id of bar tag',
            tag: 'tag for gif1: bar!',
            gif_id: 'gif1'
          }
        }
      })).toEqual({
        gif1: [
          {
            text: 'this tag says foo',
            id: 'id of foo tag'
          },
          {
            text: 'tag for gif1: bar!',
            id: 'id of bar tag'
          }
        ]
      });
    });

    it("creates new entry for this gif if it doesn't have any tags yet", () => {
      expect(tags({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      }, {
        type: ADD_TAG_SUCCEEDED,
        payload: {
          tagDocument: {
            id: 'id of bar tag',
            tag: 'tag for gif2',
            gif_id: 'gif2'
          }
        }
      })).toEqual({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }],
        gif2: [{
          text: 'tag for gif2',
          id: 'id of bar tag'
        }]
      });
    });
  });

  describe(`with action type ${DELETE_TAG_SUCCEEDED}`, () => {
    it("doesn't do anything if that tag doesn't exist", () => {
      const preState = {
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      };

      expect(tags(preState, {
        type: DELETE_TAG_SUCCEEDED,
        payload: {
          tagId: 'id of bar tag',
          gifId: 'gif1'
        }
      })).toEqual(preState);
    });

    it('removes the tag if it exists', () => {
      const preState = {
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      };

      expect(tags(preState, {
        type: DELETE_TAG_SUCCEEDED,
        payload: {
          tagId: 'id of foo tag',
          gifId: 'gif1'
        }
      })).toEqual({ gif1: [] });
    });
  });

  it('does nothing by default', () => {
    const preState = { foo: 1 };
    expect(tags(preState, {})).toEqual(preState);
  });
});
