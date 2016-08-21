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
import auth from './auth';

export default combineReducers({
  auth,
  gifs,
  animation,
  activeGif,
  tags,
  visible
});
