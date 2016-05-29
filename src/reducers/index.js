import { combineReducers } from 'redux';

import {
  gifs,
  visible
} from './gifs';
import tags from './tags';
import {
  animation,
  activeGif
} from './animation';

export default combineReducers({
  gifs,
  animation,
  activeGif,
  tags,
  visible
});
