import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import gifs from './gifs';

export default combineReducers({
  gifs,
  routing: routeReducer
});
