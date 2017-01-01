import { combineReducers } from 'redux';

import gifs from './gifs';
import tags from './tags';
import auth from './auth';
import {
  animation,
  activeGif,
} from './animation';
import {
  searchIndex,
  searchResults,
} from './search';

export default combineReducers({
  auth,
  gifs,
  animation,
  activeGif,
  searchIndex,
  searchResults,
  tags,
});
