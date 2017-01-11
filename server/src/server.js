/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import { apiRouter, authRouter } from './routes';
import { db, insertUser } from './database';

const app = express();
const port = process.env.PORT || 8080;

// user fixture with hashed password (using bcrypt with 12 rounds)
const user = {
  username: 'demo',
  password: '$2a$12$bqw3O.wcybDb1dq1MXLfPuAlzyPUvUpzrA.cLZx51URpSckSDczUe',
};

// log all user interaction on the command line
app.all('*', (req, res, next) => {
  console.log(`Request Method: ${req.method}\nRequest Path: ${req.originalUrl}`);

  next(); // pass control to additional middleware
});

// mount POST body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mount routing middleware
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// error logging middleware
app.use((err, req, res, next) => { // eslint-disable-line
  console.log(`An error occured...\nMessage: ${err.message}`);
});

// seed the database with the single user fixture, then begin UNIX socket
insertUser(user, db)
  .then(() => app.listen(port, () => console.log(`Server started on port: ${port}`)));
