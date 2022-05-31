const delMovRouter = require('express').Router();
const { Movies } = require('../../../database/db');

delMovRouter.get('/:id', async(req, res)=>{
    const idParam = req.params.id;
    const moviesModel = await Movies.findOne({where: {id: idParam}});
    let moviesArr = [];

    if (!moviesModel) {
        return res.send('no existe la pelicula');
    };

    const { id, title, creationDate, qualification, image } = moviesModel.dataValues;
    moviesArr.push({
        id,
        image,
        title,
        creationDate,
        details: {
            qualification,
        }
    });

    res.render('modify/movies/del_movies', {
        title: 'Peliculas',
        movies: moviesArr,
        alert: false
    });
});

delMovRouter.post('/:id', async(req, res)=>{
    const idParam = req.params.id;

    await Movies.destroy({where: {id: idParam}});

    res.render('modify/movies/del_movies', {
        title: 'Peliculas',

        movies: [],

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Eliminada',
        alertText: 'Pelicula eliminada correctamente',
        showConfirmButton: false,
        timer: 1500,
        route: 'modify/movies'
    });
});

module.exports = {delMovRouter};