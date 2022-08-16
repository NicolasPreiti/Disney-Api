const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router
  .get('/register', controller.registerView)
  .post('/register', controller.registerUser)

  .get('/login', controller.loginView)
  .post('/login', controller.loginUser);

module.exports = router;
