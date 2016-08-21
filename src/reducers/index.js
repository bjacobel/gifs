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
import searchIndex from './searchIndex';

export default combineReducers({
  auth,
  gifs,
  animation,
  activeGif,
  searchIndex,
  tags,
  visible
});
