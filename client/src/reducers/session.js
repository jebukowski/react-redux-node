import { Map } from 'immutable';
import * as types from '../actions/typeConstants';

const init = Map({
  isLoggedIn: false,
  isLoading: false,
  error: '',
  credentials: Map({
    username: '',
    password: '',
  }),
  currentUser: null,
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREDENTIALS_CHANGE:
      return state
        .set('error', '')
        .setIn(['credentials', payload.credential], payload.value);

    case types.LOGIN_REQUEST:
      return state
        .set('isLoading', true)
        .set('error', '');

    case types.LOGIN_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isLoggedIn', true)
        .set('currentUser', Map(payload));

    case types.LOGIN_ERROR:
      return state
        .set('isLoading', false)
        .set('error', payload);

    case types.LOGOUT_SUCCESS:
      return state
        .set('isLoggedIn', false)
        .set('currentUser', null);

    default:
      return state;
  }
};
