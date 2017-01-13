import { createStore, applyMiddleware } from 'redux';
import { Iterable } from 'immutable';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// redux-logger: transform Immutable to vanilla JS (with combineReducers)
const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {};

    for (let i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };

    return newState;
  }
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
