const updCharRouter = require('express').Router();
const { Characters, Movies, Character_Movie } = require('../../../database/db');
const { charactersInArr } = require('../../../src/functions/characters-array');


updCharRouter.get('/:id', async(req, res)=>{
    const idParam = req.params.id;
    const id_user = req.token.userValid.id;

    const character = await Characters.findOne({where: {id: idParam}, include: Movies});
    if (!character) {
        return res.send('no existe el personaje')
    };

    //Buscamos todas las peliculas
    const movies = await Movies.findAll({where: {id_user}});
    let moviesArr = [];

    movies.forEach(movie=>{
        const { id, title } = movie.dataValues;
        moviesArr.push({
            id,
            title
        });
    });

    const charactersModel = [character];
    const charactersArr = charactersInArr(charactersModel);

    res.render('modify/characters/upd_characters', {
        title: 'Personajes',
        characters: charactersArr,
        movies: moviesArr,
        alert: false
    });
});

updCharRouter.post('/:id', async(req, res)=>{
    const idParam = req.params.id;
    const { name, age, weight, history, image } = req.body;

    await Characters.update({
        name,
        age,
        weight,
        history,
        image
    }, {where: {id: idParam}});

    res.render('modify/characters/upd_characters', {
        title: 'Personajes',

        characters: [],

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Actualizado',
        alertText: 'Personaje actualizado correctamente',
        showConfirmButton: false,
        timer: 1500,
        route: 'modify/characters'
    });
});

module.exports = {updCharRouter};