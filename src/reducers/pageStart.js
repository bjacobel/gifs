import {
  INCREMENT_PAGE,
  DECREMENT_PAGE
} from '../actions/pagination';
import { pageSize } from '../constants';

export default function pageStart(state = 0, action) {
  switch (action.type) {
  case INCREMENT_PAGE:
    return state + pageSize;
  case DECREMENT_PAGE:
    return state - pageSize;
  default:
    return state;
  }
}
