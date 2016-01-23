import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import gifs from './gifs';

export default combineReducers({
  gifs,
  routing: routeReducer
});
