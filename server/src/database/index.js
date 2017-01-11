import Datastore from 'nedb';

// initialize NeDB persistent datastore
const db = new Datastore({
  filename: 'src/database/users.json',
  autoload: true,
});

/**
 * Insert a single user into the database
 *
 * @param  {Object} user
 * @param  {Object} database
 * @return {Promise<Object>}
 */
const insertUser = (user, database) => new Promise((resolve, reject) => {
  database.insert(user, (err, insertedUser) => (
    err ? reject(err) : resolve(insertedUser)
  ));
});

/**
 * Fetch a single user from the database
 *
 * @param  {Object} options
 * @param  {Object} database
 * @return {Promise<Object>}
 */
const fetchUser = (options, database) => new Promise((resolve, reject) => {
  database.findOne(options, (err, fetchedUser) => (
    err ? reject(err) : resolve(fetchedUser)
  ));
});

/**
 * Find one or more users from the database
 *
 * @param  {Object} options
 * @param  {Object} database
 * @return {Promise<Object[]>}
 */
const findUsers = (options, database) => new Promise((resolve, reject) => {
  database.find(options, (err, foundUsers) => (
    err ? reject(err) : resolve(foundUsers)
  ));
});

export { db, insertUser, fetchUser, findUsers };
