import * as actions from '../actions';

export default (store, api) => (nextState, replace, callback) => {
  const state = store.getState();
  const token = localStorage.token;
  const done = () => callback();

  // user has yet to log in
  if (!token) return done();

  // user has already logged in
  if (state.session.get('isLoggedIn')) return done();

  // ensure user-provided token is valid; if so, log the user in
  return api.verify(token)
    .then((decoded) => {
      // omit "issued at" (iat) field from the decoded payload
      const { username, id } = decoded;

      // "log" the user in and get backend details
      store.dispatch(actions.loginSuccess({ username, id }));
      store.dispatch(actions.backendDetailsRequest());

      return done();
    })
    .catch(done);
};
