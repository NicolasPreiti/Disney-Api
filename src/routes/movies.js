const express = require('express');
const controller = require('../controllers/movies');

const router = express.Router();

router
  .get('/', controller.getMovies)
  .get('/modify', controller.modifyMovies)

  .get('/modify/add', controller.createView)
  .post('/modify/add', controller.createMovie)

  .get('/modify/update/:id', controller.updateView)
  .post('/modify/update/:id', controller.updateMovie)
  
  .get('/modify/delete/:id', controller.deleteView)
  .post('/modify/delete/:id', controller.deleteMovie);
  
module.exports = router;
