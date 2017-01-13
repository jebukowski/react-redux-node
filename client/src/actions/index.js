import * as types from './typeConstants';

// credentials
export const credentialsChange = credentials => ({
  type: types.CREDENTIALS_CHANGE,
  payload: {
    credential: credentials.credential,
    value: credentials.value,
  },
});

// login
export const loginRequest = (username, password) => ({
  type: types.LOGIN_REQUEST,
  payload: {
    username,
    password,
  },
});

export const loginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const loginError = err => ({
  type: types.LOGIN_ERROR,
  payload: err.message,
  error: true,
});

// logout
export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

// backend details
export const backendDetailsRequest = () => ({
  type: types.BACKEND_DETAILS_REQUEST,
});

export const backendDetailsSuccess = payload => ({
  type: types.BACKEND_DETAILS_SUCCESS,
  payload,
});

export const backendDetailsError = err => ({
  type: types.BACKEND_DETAILS_ERROR,
  payload: err.message,
  error: true,
});
