jest.unmock('../../src/reducers/tags');
import tags from '../../src/reducers/tags';

describe('`tags` reducer', () => {
  describe('GET_TAGS_SUCCEEDED', () => {
    it("creates a new entry in the tags state if the id doesn't exist", () => {
      const reduced = tags({
        gif1: [{
          text: 'this tag says foo',
          id: 'id of foo tag'
        }]
      }, {
        type: 'GET_TAGS_SUCCEEDED',
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

    });

    it('handles multiple tags, and ids with multiple tags', () => {

    });

    it('preserves pre-existing state', () => {

    });
  });

  describe('ADD_TAG_SUCCEEDED', () => {

  });

  describe('DELETE_TAG_SUCCEEDED', () => {

  });
});
