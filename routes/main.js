const mainRouter = require('express').Router();
const { sessionValidator  } = require('../middlewares/sessionValidator');
const { charactersRouter } = require('./explore/characters');
const { moviesRouter } = require('./explore/movies');

mainRouter.use('/characters', sessionValidator, charactersRouter);
mainRouter.use('/movies', sessionValidator, moviesRouter);

mainRouter.get('/', (req, res)=>{
    res.render('main', {
        title: 'Inicio'
    });
});

module.exports = {mainRouter};