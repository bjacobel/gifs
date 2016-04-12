import {
  GET_TAGS_SUCCEEDED
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
  default:
    return state;
  }
}
