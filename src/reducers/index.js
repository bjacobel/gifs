import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import gifs from './gifs';
import animation from './animation';

export default combineReducers({
  gifs,
  animation,
  routing: routeReducer
});
