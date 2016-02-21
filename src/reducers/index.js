import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import gifs from './gifs';
import animation from './animation';
import tags from './tags';
import pageBoundary from './pageBoundary';

export default combineReducers({
  gifs,
  animation,
  tags,
  pageBoundary,
  routing: routeReducer
});
