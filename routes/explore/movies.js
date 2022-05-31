const moviesRouter = require('express').Router();
const { Movies, Characters, Genders } = require('../../database/db');

//Array de peliculas
const moviesInArr = async(arr)=>{
    const genders = await Genders.findAll();
    let moviesArr = [];

    arr.forEach(elem=>{
        const { title, creationDate, qualification, image, characters, id_gender } = elem.dataValues;

        let movieGender;

        genders.forEach(elem=>{
            const { id, gender } = elem.dataValues;
            if (id == id_gender) {
                movieGender = gender;
            }
        });


        let charactersArr = [];
        characters.forEach(character=>{
            const { id, name } = character.dataValues;
            charactersArr.push(name);
        });

        moviesArr.push({
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
    return moviesArr;
};

moviesRouter.get('/', async(req, res)=>{
    const id_user = req.token.userValid.id;
    const { title, creationDate } = req.query;
    const orderBy = req.query.order;
    let moviesArr = [];

    //Busqueda por titulo
    if (title) {
        const moviesModel = await Movies.findAll({where: {title, id_user}, include: Characters});

        moviesArr = await moviesInArr(moviesModel);

        return res.render('explore/movies', {
            title: 'Peliculas',
            movies: moviesArr,
            alert: false
        });
    };

    //Ordenar por fecha de creacion: ASC
    if (orderBy === 'ASC') {
        const moviesModel = await Movies.findAll({where: {id_user}, order: [['creationDate', 'ASC']], include: Characters});

        moviesArr = await moviesInArr(moviesModel);

        return res.render('explore/movies', {
            title: 'Peliculas',
            movies: moviesArr,
            alert: false
        });
    };

    //Ordenar por fecha de creacion: DESC
    if (orderBy === 'DESC') {
        const moviesModel = await Movies.findAll({where: {id_user}, order: [['creationDate', 'DESC']], include: Characters});

        moviesArr = await moviesInArr(moviesModel);

        return res.render('explore/movies', {
            title: 'Peliculas',
            movies: moviesArr,
            alert: false
        });
    };

    //Todas los peliculas
    const moviesModel = await Movies.findAll({where: {id_user}, include: Characters});

    moviesArr = await moviesInArr(moviesModel);
    console.log(moviesArr, "juan")

    //Si no existen peliculas
    if (moviesModel.length == 0) {
        return res.render('explore/movies', {
            title: 'Peliculas',

            movies: moviesModel,

            //ALERTA
            alert: true,
            alertIcon: 'info',
            alertTitle: 'Vacio',
            alertText: 'Aun no se han añadido peliculas',
            showConfirmButton: true,
            timer: false,
            route: 'modify/movies/add'

        });
    };
    
    //Si existen peliculas
    res.render('explore/movies', {
        title: 'Peliculas',
        movies: moviesArr,
        alert: false
    });
});

module.exports = {moviesRouter};