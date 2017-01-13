import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as api from '../api';
import * as types from '../actions/typeConstants';
import * as actions from '../actions';

function* backendDetailsRequest() {
  try {
    const details = yield api.details();

    yield put(actions.backendDetailsSuccess(details));
  } catch (err) {
    yield put(actions.backendDetailsError(err));
  }
}

export function* watchBackendDetailsRequest() {
  yield* takeEvery(types.BACKEND_DETAILS_REQUEST, backendDetailsRequest);
}
