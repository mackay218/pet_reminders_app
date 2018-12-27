const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();
//test commit comment
// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database

  res.send(req.user);
});//end get route



// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);

  const firstname = req.body.first_name;
  const lastname = req.body.last_name;
  const clinic = req.body.clinic_name;
  const phone = req.body.phone;
  const email = req.body.email;

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);


  const queryText = 'INSERT INTO person (username, password, first_name, last_name, clinic_name, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  pool.query(queryText, [username, password, firstname, lastname, clinic, phone, email])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});//end post route

//PUT route to update user info
router.put('/register', rejectUnauthenticated, (req, res) => {
  console.log('req in put:', req.body);

  const firstname = req.body.first_name;
  const lastname = req.body.last_name;
  const clinic = req.body.clinic_name;
  const phone = req.body.phone;
  const email = req.body.email;
  const id = req.body.id;

  const queryText = `UPDATE person SET "first_name" = $1, "last_name" = $2, "clinic_name" = $3, "phone" = $4, "email" = $5
                      WHERE "id" = $6;`;

  pool.query(queryText, [firstname, lastname, clinic, phone, email, id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => { console.log('error updating user info:', err) });
});//end put route

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});//end post route

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});//end get route

module.exports = router;
