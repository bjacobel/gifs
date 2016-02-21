import {
  INCREMENT_PAGE_BOUNDARY,
  DECREMENT_PAGE_BOUNDARY
} from '../actions/pageBoundary';
import { pageIncrement } from '../constants';

export default function animation(state = {}, action) {
  switch (action.type) {
  case INCREMENT_PAGE_BOUNDARY:
    return state.pageBoundary + pageIncrement;
  case DECREMENT_PAGE_BOUNDARY:
    return state.pageBoundary - pageIncrement;
  default:
    return 15;
  }
}
