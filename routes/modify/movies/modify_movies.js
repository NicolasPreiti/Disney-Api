const modMoviesRouter = require('express').Router();
const { Movies, Characters, Genders } = require('../../../database/db');
const { updMovRouter } = require('./update_movie');
const { delMovRouter } = require('./delete_movie');
const { addMovRouter } = require('./add_movie');


//ROUTES
modMoviesRouter.use('/update', updMovRouter);
modMoviesRouter.use('/delete', delMovRouter);
modMoviesRouter.use('/add', addMovRouter);


//GET
modMoviesRouter.get('/', async(req, res)=>{
    const id_user = req.token.userValid.id;
    const moviesModel = await Movies.findAll({where: {id_user}, include: Characters});
    const genders = await Genders.findAll();
    let moviesArr = [];

    moviesModel.forEach( (elem)=>{
        const { id, title, creationDate, qualification, image, id_gender, characters } = elem.dataValues;
        let movieGender;

        genders.forEach(elem=>{
            const { id, gender } = elem.dataValues;
            if (id == id_gender) {
                movieGender = gender;
            }
        });

        let charactersArr = [];
        characters.forEach(character=>{
            const { name } = character.dataValues;
            charactersArr.push(name);
        });

        moviesArr.push({
            id,
            image,
            title,
            creationDate,
            details: {
                qualification,
                gender: movieGender,
                characters: charactersArr
            }
        });
    });

    res.render('modify/movies/modify_movies', {
        title: 'Peliculas',
        movies: moviesArr,
        alert: false
    });
});

module.exports = {modMoviesRouter};