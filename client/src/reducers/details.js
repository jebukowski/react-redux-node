import { Map } from 'immutable';
import * as types from '../actions/typeConstants';

const init = Map({
  isLoading: false,
  error: '',
  nodeVersion: '',
  appPath: '',
  dateAndTime: '',
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.BACKEND_DETAILS_REQUEST:
      return state
        .set('isLoading', true)
        .set('error', '');

    case types.BACKEND_DETAILS_SUCCESS:
      return state
        .set('isLoading', false)
        .set('nodeVersion', payload.nodeVersion)
        .set('appPath', payload.appPath)
        .set('dateAndTime', payload.dateAndTime);

    case types.BACKEND_DETAILS_ERROR:
      return state
        .set('isLoading', false)
        .set('error', payload);

    default:
      return state;
  }
};
