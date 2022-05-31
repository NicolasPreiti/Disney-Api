const modCharactersRouter = require('express').Router();
const { Characters, Movies } = require('../../../database/db');
const { updCharRouter } = require('./update_character');
const { delCharRouter } = require('./delete_character');
const { addCharRouter } = require('./add_character');
const { charactersInArr } = require('../../../src/functions/characters-array');


//ROUTES
modCharactersRouter.use('/update', updCharRouter);
modCharactersRouter.use('/delete', delCharRouter);
modCharactersRouter.use('/add', addCharRouter);


//GET
modCharactersRouter.get('/', async(req, res)=>{
    const id_user = req.token.userValid.id;
    const charactersModel = await Characters.findAll({where: {id_user}, include: Movies});

    const charactersArr = charactersInArr(charactersModel);

    res.render('modify/characters/modify_characters', {
        title: 'Personajes',
        characters: charactersArr,
        alert: false
    });
});

module.exports = {modCharactersRouter};