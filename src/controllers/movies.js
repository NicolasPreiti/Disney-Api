const service = require('../services/movies');
const { Character, Character_movie, Gender } = require('../models');
const { moviesInArr } = require('../helpers/moviesArray');

const getAllMovies = async(req, res) => {
  const { query, token } = req;

  const movies = await service.getAllMovies(query, token);
  const moviesArr = await moviesInArr(movies);

  if (movies.length === 0) {
    return res.render('explore/movies', {
      title: 'Peliculas',
      movies: [],

      alert: true,
      alertIcon: 'info',
      alertTitle: 'Vacio',
      alertText: 'Aun no se han añadido peliculas',
      showConfirmButton: true,
      timer: false,
      route: 'movies/modify/add',

    });
  }

  res.render('explore/movies', {
    title: 'Peliculas',
    movies: moviesArr,
    alert: false,
  });
};

const modifyMovies = async(req, res) => {
  const { query, token } = req;

  const movies = await service.getAllMovies(query, token);
  // console.log(movies);
  const moviesArr = await moviesInArr(movies);

  res.render('modify/movies/modify_movies', {
    title: 'Peliculas',
    movies: moviesArr,
    alert: false,
  });
};

const createView = async(req, res) => {
  const id_user = req.token.body.id;
  const charactersArr = await Character.findAll({ where: { id_user } });
  const gendersArr = await Gender.findAll();

  res.render('modify/movies/add_movies', {
    title: 'Peliculas',
    characters: charactersArr,
    genders: gendersArr,
    alert: false,
  });
};

const createMovie = async(req, res) => {
  const { body, token } = req;
  const { characters } = body;

  const movie = await service.createMovie(body, token);

  let repeatValue = [];
  for (let i = 0 ; i < characters.length ; i++) {
    if (!characters[i]) characters[i] = null;

    repeatValue.forEach((repeat) => {
      if (characters[i] == repeat) characters[i] = null;
    });

    repeatValue.push(characters[i]);
  }

  const idNewMovie = movie.dataValues.id;
  characters.forEach(async(character) => {
    await Character_movie.create({
      id_user: token.body.id,
      id_character: character,
      id_movie: idNewMovie,
    });
  });

  res.render('modify/movies/add_movies', {
    title: 'Peliculas',
    movies: [],
    characters: [],
    genders: [],

    alert: true,
    alertIcon: 'success',
    alertTitle: 'Añadida',
    alertText: 'Pelicula añadida correctamente',
    showConfirmButton: false,
    timer: 1500,
    route: 'movies/modify',
  });
};

const updateView = async(req, res) => {
  const { params, token } = req;
  const gendersArr = await Gender.findAll();

  const movie = await service.getMovie(params);

  if (!movie) return res.send('no existe el pelicula');
  const moviesArr = await moviesInArr([movie,]);

  const charactersAll = await Character.findAll({ where: { id_user: token.body.id } });
  const charactersArr = charactersAll.map((character) => {
    const { id, name } = character.dataValues;
    return {
      id,
      name,
    };
  });

  res.render('modify/movies/upd_movies', {
    title: 'Peliculas',
    movies: moviesArr,
    characters: charactersArr,
    genders: gendersArr,

    alert: false,
  });
};

const updateMovie = async(req, res) => {
  const { body, params } = req;

  const idParam = req.params.id;
  const id_user = req.token.body.id;
  const { characters } = body;

  //Relacion personajes de la pelicula
  const emptyCharacterMovie = await Character_movie.findAll({ where: { id_movie: idParam } });

  let repeatValue = [];
  //Valores vacios o repetidos son igualados a null
  for (let i = 0 ; i < characters.length ; i++) {
    if (!characters[i]) characters[i] = null;

    repeatValue.forEach((repeat) => {
      if (characters[i] == repeat) characters[i] = null;
    });

    repeatValue.push(characters[i]);
  }

  //En caso de no existir relaciones
  if (emptyCharacterMovie.length == 0) {

    characters.forEach(async(character) => {
      await Character_movie.create({
        id_user,
        id_character: character,
        id_movie: idParam,
      });
    });

    //En caso existir relaciones
  } else {

    emptyCharacterMovie.forEach(async(elem) => {
      const idRelation = (elem.dataValues.id);

      const allow = await Character_movie.update({
        id_character: null,
      }, { where: { id: idRelation } });

      if (allow) {
        let contCharacter = 0;

        emptyCharacterMovie.forEach(async(elem) => {
          const idRelation = (elem.dataValues.id);

          let character = characters[contCharacter];
          contCharacter++;

          await Character_movie.update({
            id_character: character,
          }, { where: { id: idRelation } });
        });
      }
    });

  }

  await service.updateMovie(body, params);

  res.render('modify/movies/upd_movies', {
    title: 'Peliculas',
    movies: [],

    alert: true,
    alertIcon: 'success',
    alertTitle: 'Actualizado',
    alertText: 'Pelicula actualizada correctamente',
    showConfirmButton: false,
    timer: 1500,
    route: 'movies/modify',
  });
};

const deleteView = async(req, res) => {
  const { params } = req;
  const movie = await service.getMovie(params);

  if (!movie) return res.send('no existe la pelicula');
  const moviesArr = await moviesInArr([movie,]);

  res.render('modify/movies/del_movies', {
    title: 'Peliculas',
    movies: moviesArr,
    alert: false,
  });
};

const deleteMovie = async(req, res) => {
  const { params } = req;

  await service.deleteMovie(params);

  res.render('modify/movies/del_movies', {
    title: 'Peliculas',
    movies: [],

    alert: true,
    alertIcon: 'success',
    alertTitle: 'Eliminada',
    alertText: 'Pelicula eliminada correctamente',
    showConfirmButton: false,
    timer: 1500,
    route: 'movies/modify',
  });
};

module.exports = {
  getAllMovies,
  modifyMovies,
  createView,
  createMovie,
  updateView,
  updateMovie,
  deleteView,
  deleteMovie,
};
