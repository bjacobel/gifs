import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import gifs from './gifs';
import animation from './animation';
import tags from './tags';
import pageStart from './pageStart';

export default combineReducers({
  gifs,
  animation,
  tags,
  pageStart,
  routing: routeReducer
});
