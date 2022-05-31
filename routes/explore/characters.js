const charactersRouter = require('express').Router();
const { Characters, Movies, Character_Movie } = require('../../database/db');
const { charactersInArr } = require('../../src/functions/characters-array');


charactersRouter.get('/', async(req, res)=>{
    const id_user = req.token.userValid.id;
    const { name, age, weight } = req.query;

    //Busqueda por nombre
    if (name) {
        const charactersModel = await Characters.findAll({where: {name, id_user}, include: Movies});     
        let charactersArr = charactersInArr(charactersModel);

        return res.render('explore/characters', {
            title: 'Personajes',
            characters: charactersArr,
            alert: false
        });
    };

    //Busqueda por edad
    if (age) {
        const charactersModel = await Characters.findAll({where: {age, id_user}, include: Movies});
        let charactersArr = charactersInArr(charactersModel);

        return res.render('explore/characters', {
            title: 'Personajes',
            characters: charactersArr,
            alert: false
        });
    };

    //Busqueda por peso
    if (weight) {
        const charactersModel = await Characters.findAll({where: {weight, id_user}, include: Movies});
        let charactersArr = charactersInArr(charactersModel);

        return res.render('explore/characters', {
            title: 'Personajes',
            characters: charactersArr,
            alert: false
        });
    };

    //Todos los personajes
    const charactersModel = await Characters.findAll({where: {id_user}, include: Movies});
    let charactersArr = charactersInArr(charactersModel);

    //Si no existen personajes
    if (charactersModel.length == 0) {
        return res.render('explore/characters', {
            title: 'Personajes',

            characters: charactersModel,

            //ALERTA
            alert: true,
            alertIcon: 'info',
            alertTitle: 'Vacio',
            alertText: 'Aun no se han añadido personajes',
            showConfirmButton: true,
            timer: false,
            route: 'modify/characters/add'

        });
    };
    
    //Si existen personajes
    res.render('explore/characters', {
        title: 'Personajes',
        characters: charactersArr,
        alert: false
    });
});

module.exports = {charactersRouter};