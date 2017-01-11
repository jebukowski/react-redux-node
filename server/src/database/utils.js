import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// normally accessed from .env
const secretKey = 'machine_or_mannequin_secret_secret_ive_got_a_secret';

/**
 * Sign payload and generate JWT (using default algorithm: HS256)
 *
 * @param  {Object} payload
 * @param  {String} secret
 * @return {Promise<String>}
 */
const generateToken = (payload, secret) => new Promise((resolve, reject) => {
  jwt.sign(payload, secret, { algorithm: 'HS256' }, (err, token) => (
    err ? reject(err) : resolve(token)
  ));
});

/**
 * Verify JWT and return decoded payload
 *
 * @param  {String} token
 * @param  {String} secret
 * @return {Promise<Object>}
 */
const verifyToken = (token, secret) => {
  if (!token) return Promise.reject(new Error('No token supplied'));

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => (
      err ? reject(err) : resolve(decoded)
    ));
  });
};

/**
 * Compare the plaintext and hashed passwords to ensure they match
 *
 * @param  {String} plaintext
 * @param  {String} hashed
 * @return {Promise<Boolean>}
 */
const comparePasswords = (plaintext, hashed) => {
  if (!plaintext) return Promise.reject(new Error('No plaintext password supplied'));
  if (!hashed) return Promise.reject(new Error('No hashed password supplied'));

  return bcrypt.compare(plaintext, hashed); // promise
};

export { secretKey, generateToken, verifyToken, comparePasswords };
