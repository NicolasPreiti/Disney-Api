const addMovRouter = require('express').Router();
const { Movies, Characters, Character_Movie, Genders } = require('../../../database/db');

addMovRouter.get('/', async(req, res)=>{
    const id_user = req.token.userValid.id;
    const charactersArr = await Characters.findAll({where: {id_user}});
    const gendersArr = await Genders.findAll();

    res.render('modify/movies/add_movies', {
        title: 'Peliculas',
        characters: charactersArr,
        genders: gendersArr,
        alert: false
    });
});

addMovRouter.post('/', async(req, res)=>{
    const { title, creationDate, qualification, image, characters } = req.body;
    const id_user = req.token.userValid.id;
    let repeatValue = [];

    let { gender } = req.body;
    if (gender == "") gender = null;

    //Valores vacios o repetidos son igualados a null
    for (let i = 0 ; i < characters.length ; i++) {
        if (!characters[i]) characters[i] = null;

        repeatValue.forEach((repeat)=>{
            if (characters[i] == repeat) characters[i] = null;
        });

        repeatValue.push(characters[i]);
    };

    //Creacion de la nueva pelicula
    const newMovie = await Movies.create({
        title: title.toLowerCase(),
        creationDate,
        qualification,
        image,
        id_user,
        id_gender: gender
    });

    //Creacion de las relaciones con personajes
    const idNewMovie = newMovie.dataValues.id;

    characters.forEach( async(character)=>{
        await Character_Movie.create({
            id_user,
            id_character: character,
            id_movie: idNewMovie
        });
    });

    
    res.render('modify/movies/add_movies', {
        title: 'Peliculas',

        movies: [],
        characters: [],
        genders: [],

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Añadida',
        alertText: 'Pelicula añadida correctamente',
        showConfirmButton: false,
        timer: 1500,
        route: 'modify/movies'
    });
});

module.exports = {addMovRouter};