import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import * as api from '../api';
import * as types from '../actions/typeConstants';
import * as actions from '../actions';

const forwardTo = (path) => browserHistory.push(path);

function* logoutRequest() {
  // unset token
  localStorage.token = null;

  // reset state in rootReducer
  yield put(actions.logoutSuccess());

  forwardTo('/login');
}

export function* watchLogoutRequest() {
  yield* takeEvery(types.LOGOUT_REQUEST, logoutRequest);
}

function* loginRequest(action) {
  const { payload: { username, password } } = action;

  try {
    const { user, token } = yield api.authenticate(username, password);

    // set token
    localStorage.token = token;

    // omit password field
    const prunedUser = {
      username: user.username,
      id: user._id,
    };

    yield put(actions.loginSuccess(prunedUser));
    yield put(actions.backendDetailsRequest());

    forwardTo('/welcome');
  } catch (err) {
    yield put(actions.loginError(err));
  }
}

export function* watchLoginRequest() {
  yield* takeEvery(types.LOGIN_REQUEST, loginRequest);
}
