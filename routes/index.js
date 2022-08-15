const express = require('express');
const { sessionValidator  } = require('../middlewares/sessionValidator');
const { importAllJS } = require('../helpers/importAll');

const routes = importAllJS(__filename, __dirname);
const router = express.Router();

router
  .use('/', routes.root)
  .use('/auth', routes.auth)
  .use('/characters', sessionValidator, routes.characters)
  .use('/movies', sessionValidator, routes.movies);

module.exports = router;
