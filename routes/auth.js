const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router
  .get('/login', controller.loginView)
  .post('/login', controller.loginUser)

  .get('/register', controller.registerView)
  .post('/register', controller.registerUser);

module.exports = router;
