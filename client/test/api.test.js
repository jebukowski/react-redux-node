import test from 'ava';
import nock from 'nock';
import * as api from '../src/api';

// path constants
const serverPath = 'http://localhost:8080';
const authenticatePath = '/auth/authenticate';
const verifyPath = '/auth/verify';
const detailsPath = '/api/details';

// api.authenticate
nock(serverPath)
  .post(authenticatePath, {
    username: 'doesnotexist',
    password: 'somePassword',
  })
  .replyWithError({
    'status': 401,
    'message': 'Provided user not found',
  });

nock(serverPath)
  .post(authenticatePath, {
    username: 'demo',
    password: 'wrongPassword',
  })
  .replyWithError({
    'status': 401,
    'message': 'Incorrect login credentials',
  });

nock(serverPath)
  .post(authenticatePath, {
    username: 'demo',
    password: 'password1',
  })
  .reply(200, {
    user: 'someUser',
    token: 'some.token.string',
  });

test('api.authenticate', async (t) => {
  const userNotFoundError = await t.throws(api.authenticate('doesnotexist', 'somePassword'));
  t.is(userNotFoundError.name, 'FetchError');

  const wrongPasswordError = await t.throws(api.authenticate('demo', 'wrongPassword'));
  t.is(wrongPasswordError.name, 'FetchError');

  const { user, token } = await api.authenticate('demo', 'password1');
  t.is(user, 'someUser');
  t.is(token, 'some.token.string');
});

// api.verify
nock(serverPath)
  .post(verifyPath, {
    token: 'some.token.string',
  })
  .reply(200, {
    username: 'demo',
    id: 'rJHCRfu7ShX8MLeY',
    iat: 1484349489,
  });

test('api.verify', async (t) => {
  const decoded = await api.verify('some.token.string');
  const { username, id, iat } = decoded;

  t.is(username, 'demo');
  t.is(id, 'rJHCRfu7ShX8MLeY');
  t.is(iat, 1484349489);
});

// api.details
nock(serverPath)
  .get(detailsPath)
  .reply(200, {
    nodeVersion: 'v6.0.0',
    appPath: '/some/path',
    dateAndTime: 'Month XX, 20XX XX:XX',
  });

test('api.details', async (t) => {
  const details = await api.details();
  const { nodeVersion, appPath, dateAndTime } = details;

  t.is(nodeVersion, 'v6.0.0');
  t.is(appPath, '/some/path');
  t.is(dateAndTime, 'Month XX, 20XX XX:XX');
});
