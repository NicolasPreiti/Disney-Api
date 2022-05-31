const updMovRouter = require('express').Router();
const { Movies, Characters, Character_Movie, Genders } = require('../../../database/db');

updMovRouter.get('/:id', async(req, res)=>{
    const idParam = req.params.id;
    const id_user = req.token.userValid.id;
    const moviesModel = await Movies.findOne({where: {id: idParam}, include: Characters});
    const gendersArr = await Genders.findAll();
    let moviesArr = [];

    if (!moviesModel) {
        return res.send('no existe el pelicula')
    };

    //Buscamos todos los personajes para un select
    const charactersAll = await Characters.findAll({where: {id_user}});
    let charactersArr = [];

    charactersAll.forEach(character=>{
        const { id, name } = character.dataValues;
        charactersArr.push({
            id,
            name
        });
    });
    console.log(charactersArr)
    
    //Colocamos en un array cada pelicula
    const { id, title, creationDate, qualification, image, characters, id_gender } = moviesModel.dataValues;
    let gender = await Genders.findOne({where: {id: id_gender}});
    gender = gender.dataValues.gender; 
    let charactersMovie = [];

    characters.forEach((character)=>{
        charactersMovie.push(character.dataValues.name);
    });
    
    moviesArr.push({
        id,
        image,
        title,
        creationDate,
        details: {
            qualification,
            gender,
            characters: charactersMovie
        }
    });

    res.render('modify/movies/upd_movies', {
        title: 'Peliculas',
        movies: moviesArr,
        characters: charactersArr,
        genders: gendersArr,
        alert: false
    });
});

updMovRouter.post('/:id', async(req, res)=>{
    const idParam = req.params.id;
    const id_user = req.token.userValid.id;
    const { title, creationDate, qualification, image, characters, gender } = req.body;

    //Relacion personajes de la pelicula
    const emptyCharacterMovie = await Character_Movie.findAll({where: {id_movie: idParam}});

    let repeatValue = [];
    //Valores vacios o repetidos son igualados a null
    for (let i = 0 ; i < characters.length ; i++) {
        if (!characters[i]) characters[i] = null;

        repeatValue.forEach((repeat)=>{
            if (characters[i] == repeat) characters[i] = null;
        });

        repeatValue.push(characters[i]);
    };

    //En caso de no existir relaciones
    if (emptyCharacterMovie.length == 0) {

        characters.forEach( async(character)=>{
            await Character_Movie.create({
                id_user,
                id_character: character,
                id_movie: idParam
            });
        });
    
    //En caso existir relaciones
    } else {

        emptyCharacterMovie.forEach( async(elem)=>{
            const idRelation = (elem.dataValues.id);

            const allow = await Character_Movie.update({
                id_character: null
            }, {where: {id: idRelation}});

            if (allow) {
                let contCharacter = 0;

                emptyCharacterMovie.forEach( async(elem)=>{
                    const idRelation = (elem.dataValues.id);

                    let character = characters[contCharacter];
                    contCharacter++

                    await Character_Movie.update({
                        id_character: character
                    }, {where: {id: idRelation}});
                });
            };
        });

    };

    //Actualizamos la pelicula
    await Movies.update({
        title,
        creationDate,
        qualification,
        image,
        id_gender: gender
    }, {where: {id: idParam}});

    res.render('modify/movies/upd_movies', {
        title: 'Peliculas',

        movies: [],

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Actualizado',
        alertText: 'Pelicula actualizada correctamente',
        showConfirmButton: false,
        timer: 1500,
        route: 'modify/movies'
    });
});

module.exports = {updMovRouter};