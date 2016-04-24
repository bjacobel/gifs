import { combineReducers } from 'redux';

import gifs from './gifs';
import animation from './animation';
import tags from './tags';

export default combineReducers({
  gifs,
  animation,
  tags
});
