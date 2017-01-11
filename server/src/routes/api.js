import express from 'express';
import moment from 'moment';
import { db, fetchUser, findUsers } from '../database';

const router = express.Router();

// fetch a single user from the db by its id
router.get('/users/:id', (req, res, next) => {
  const { id } = req.params;

  fetchUser({ _id: id }, db)
    .then(user => res.json(user))
    .catch((err) => {
      res.status(500).send(err.message);
      next(err); // log error
    });
});

// find one or more users from the db
router.get('/users', (req, res, next) => {
  findUsers({}, db)
    .then(users => res.json(users))
    .catch((err) => {
      res.status(500).send(err.message);
      next(err); // log error
    });
});

router.get('/details', (req, res) => {
  res.json({
    nodeVersion: process.version,
    appPath: process.argv[1],
    dateAndTime: moment().format('LLL'),
  });
});

export default router;
