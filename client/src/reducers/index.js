import { combineReducers } from 'redux';
import session from './session';
import details from './details';
import * as types from '../actions/typeConstants';

const appReducer = combineReducers({
  session,
  details,
});

export default (state, action) => {
  // reset state upon successful logout
  if (action.type === types.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};
