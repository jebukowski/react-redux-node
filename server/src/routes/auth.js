import express from 'express';
import { db, fetchUser } from '../database';
import { secretKey, comparePasswords, generateToken, verifyToken } from '../database/utils';

const router = express.Router();

// validate login credentials, return token and user (to be displayed upon successful login)
router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  return fetchUser({ username }, db)
    .then((fetchedUser) => {
      if (!fetchedUser) throw new Error('Provided user not found');

      return Promise.all([fetchedUser, comparePasswords(password, fetchedUser.password)]);
    })
    .then((array) => {
      const fetchedUser = array[0];
      const isCorrectPassword = array[1];
      const tokenPayload = {
        username: fetchedUser.username,
        id: fetchedUser._id, // eslint-disable-line
      };

      if (!isCorrectPassword) throw new Error('Incorrect login credentials');

      return Promise.all([fetchedUser, generateToken(tokenPayload, secretKey)]);
    })
    .then((array) => {
      const user = array[0];
      const token = array[1];

      res.json({
        user,
        token,
      });
    })
    .catch((err) => {
      res.status(401).send(err.message);
      next(err); // log error
    });
});

// verify JWT, then return decoded payload
router.post('/verify', (req, res, next) => {
  const { token } = req.body;

  verifyToken(token, secretKey)
    .then(decoded => res.json(decoded))
    .catch((err) => {
      res.status(403).send(err.message);
      next(err); // log error
    });
});

export default router;
