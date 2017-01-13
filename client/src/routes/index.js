import * as api from '../api';
import store from '../configureStore';
import verifyToken from './verifyToken';
import requiresLogin from './requiresLogin';
import { App } from '../components';
import { Login, Welcome } from '../scenes';

export default {
  path: '/',
  component: App,
  onEnter: verifyToken(store, api),
  indexRoute: {
    onEnter: (nextState, replace) => replace('/login'),
  },
  childRoutes: [
    {
      path: 'login',
      component: Login,
    },
    {
      path: 'welcome',
      component: requiresLogin(Welcome),
    },
  ],
};
