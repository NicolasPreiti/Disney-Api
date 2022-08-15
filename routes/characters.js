const express = require('express');
const controller = require('../controllers/characters');

const router = express.Router();

router
  .get('/', controller.getCharacters)
  .get('/modify', controller.modifyCharacters)
  
  .get('/modify/add', controller.createView)
  .post('/modify/add', controller.createCharacter)

  .get('/modify/update/:id', controller.updateView)
  .post('/modify/update/:id', controller.updateCharacter)

  .get('/modify/delete/:id', controller.deleteView)
  .post('/modify/delete/:id', controller.deleteCharacter);

module.exports = router;
