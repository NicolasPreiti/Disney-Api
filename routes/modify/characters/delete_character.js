const delCharRouter = require('express').Router();
const { Characters, Movies } = require('../../../database/db');
const { charactersInArr } = require('../../../src/functions/characters-array');


delCharRouter.get('/:id', async(req, res)=>{
    const idParam = req.params.id;
    const character = await Characters.findOne({where: {id: idParam}, include: Movies});

    if (!character) {
        return res.send('no existe el personaje')
    };

    const charactersModel = [character];
    const charactersArr = charactersInArr(charactersModel);

    res.render('modify/characters/del_characters', {
        title: 'Personajes',
        characters: charactersArr,
        alert: false
    });
});

delCharRouter.post('/:id', async(req, res)=>{
    const idParam = req.params.id;

    await Characters.destroy({where: {id: idParam}});

    res.render('modify/characters/del_characters', {
        title: 'Personajes',

        characters: [],

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Eliminado',
        alertText: 'Personaje eliminado correctamente',
        showConfirmButton: false,
        timer: 1500,
        route: 'modify/characters'
    });
});

module.exports = {delCharRouter};