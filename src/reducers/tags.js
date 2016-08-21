import {
  GET_TAGS_SUCCEEDED,
  ADD_TAG_SUCCEEDED,
  DELETE_TAG_SUCCEEDED
} from '../actions/tags';

export default function gifs(state = {}, action) {
  switch (action.type) {
  case GET_TAGS_SUCCEEDED: {
    const tagMap = {};

    action.payload.tags.Items.forEach((tag) => {
      if (tagMap[tag.gif_id.S]) {
        tagMap[tag.gif_id.S].push({
          text: tag.tag.S,
          id: tag.id.S
        });
      } else {
        tagMap[tag.gif_id.S] = [{
          text: tag.tag.S,
          id: tag.id.S
        }];
      }
    });

    return Object.assign({}, state, tagMap);
  }
  case ADD_TAG_SUCCEEDED: {
    const tag = action.payload.tagDocument;
    if (state.hasOwnProperty(tag.gif_id)) {
      return Object.assign({}, state, {
        [tag.gif_id]: state[tag.gif_id].concat({
          text: tag.tag,
          id: tag.id
        })
      });
    } else {
      return Object.assign({}, state, { [tag.gif_id]: [{
        text: tag.tag,
        id: tag.id
      }] });
    }
  }
  case DELETE_TAG_SUCCEEDED: {
    return Object.assign({}, state, {
      [action.payload.gifId]: state[action.payload.gifId].filter((x) => x.id !== action.payload.tagId)
    });
  }
  default:
    return state;
  }
}
