import test from 'ava';
import Datastore from 'nedb';
import rimraf from 'rimraf';
import { insertUser, fetchUser, findUsers } from '../src/database';
import { secretKey, generateToken, verifyToken, comparePasswords } from '../src/database/utils';

// user fixture with hashed password (using bcrypt with 12 rounds)
const user = {
  username: 'devo',
  password: '$2a$12$Jf09EkK6ki6H85qoJGC70u5v4Net9soUpErPy2DcjxiGuBkBQvk8G',
};

// initialize NeDB persistent datastore
const db = new Datastore({
  filename: 'test/users.json',
  autoload: true,
});

test.before('Seed the database', async t => await insertUser(user, db)); // eslint-disable-line

test('Ensure database is properly seeded', async (t) => {
  const foundUsers = await findUsers({}, db);

  t.true(Array.isArray(foundUsers));
  t.true(foundUsers.length === 1);
});

test('Fetch a single user from the database', async (t) => {
  // User does not exist
  t.is(await fetchUser({ username: 'nonexistent' }, db), null);

  // Fetch sole existing user by its username
  const fetchedUser = await fetchUser({ username: user.username }, db);

  t.is(typeof fetchedUser, 'object');
  t.is(fetchedUser.username, 'devo');

  // Fetch sole existing user by its id
  t.truthy(await fetchUser({ _id: fetchedUser._id }, db)); // eslint-disable-line
});

test('Ensure plaintext and hashed passwords match', async (t) => {
  // no plaintext password supplied
  const plaintextError = await t.throws(comparePasswords());
  t.is(plaintextError.message, 'No plaintext password supplied');

  // no hashed password supplied
  const hashedError = await t.throws(comparePasswords('somePassword'));
  t.is(hashedError.message, 'No hashed password supplied');

  t.true(await comparePasswords('gatesOfSteel', user.password));
});

test('Generate and verify JSON web token', async (t) => {
  // payload to be signed
  const payload = 'bukowski';

  // generate and verify
  const token = await generateToken(payload, secretKey);
  const decoded = await verifyToken(token, secretKey);
  t.is(typeof token, 'string');
  t.is(typeof decoded, 'string');
  t.is(payload, decoded);

  // no token supplied
  const error = await t.throws(verifyToken());
  t.is(error.message, 'No token supplied');
});

test.after.always('Delete the database', async (t) => { // eslint-disable-line
  await new Promise(resolve => rimraf('test/users.json', () => resolve()));
});
