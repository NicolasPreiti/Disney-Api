const modifyRouter = require('express').Router();
const { sessionValidator  } = require('../../middlewares/sessionValidator');
const { modCharactersRouter } = require('./characters/modify_characters');
const { modMoviesRouter } = require('./movies/modify_movies');

modifyRouter.use('/characters', sessionValidator, modCharactersRouter);
modifyRouter.use('/movies', sessionValidator, modMoviesRouter);

module.exports = {modifyRouter};