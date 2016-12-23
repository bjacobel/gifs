import { combineReducers } from 'redux';

import {
  gifs,
  visible,
} from './gifs';
import tags from './tags';
import {
  animation,
  activeGif,
} from './animation';
import cognito from './cognito';
import {
  searchIndex,
  searchResults,
} from './search';

export default combineReducers({
  cognito,
  gifs,
  animation,
  activeGif,
  searchIndex,
  searchResults,
  tags,
  visible,
});
