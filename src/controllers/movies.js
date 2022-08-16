const { Movies, Characters,Character_Movie, Genders } = require('../database/db');

//Array de peliculas
const moviesInArr = async(arr) => {
  const genders = await Genders.findAll();
  let moviesArr = [];

  arr.forEach(elem => {
    const { title, creationDate, qualification, image, characters, id_gender } = elem.dataValues;

    let movieGender;

    genders.forEach(elem => {
      const { id, gender } = elem.dataValues;
      if (id == id_gender) {
        movieGender = gender;
      }
    });

    let charactersArr = [];
    characters.forEach(character => {
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
        characters: charactersArr,
      },
    });
  });
  return moviesArr;
};

const getMovies = async(req, res) => {
  const id_user = req.token.userValid.id;
  const { title, creationDate } = req.query;
  const orderBy = req.query.order;
  let moviesArr = [];

  //Busqueda por titulo
  if (title) {
    const moviesModel = await Movies.findAll({ where: { title, id_user }, include: Characters });

    moviesArr = await moviesInArr(moviesModel);

    return res.render('explore/movies', {
      title: 'Peliculas',
      movies: moviesArr,
      alert: false,
    });
  }

  //Ordenar por fecha de creacion: ASC
  if (orderBy === 'ASC') {
    const moviesModel = await Movies.findAll({ where: { id_user }, order: [['creationDate', 'ASC',],], include: Characters });

    moviesArr = await moviesInArr(moviesModel);

    return res.render('explore/movies', {
      title: 'Peliculas',
      movies: moviesArr,
      alert: false,
    });
  }

  //Ordenar por fecha de creacion: DESC
  if (orderBy === 'DESC') {
    const moviesModel = await Movies.findAll({ where: { id_user }, order: [['creationDate', 'DESC',],], include: Characters });

    moviesArr = await moviesInArr(moviesModel);

    return res.render('explore/movies', {
      title: 'Peliculas',
      movies: moviesArr,
      alert: false,
    });
  }

  //Todas los peliculas
  const moviesModel = await Movies.findAll({ where: { id_user }, include: Characters });

  moviesArr = await moviesInArr(moviesModel);
  console.log(moviesArr, 'juan');

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
      route: 'modify/movies/add',

    });
  }
  
  //Si existen peliculas
  res.render('explore/movies', {
    title: 'Peliculas',
    movies: moviesArr,
    alert: false,
  });
};

const modifyMovies = async(req, res) => {
  const id_user = req.token.userValid.id;
  const moviesModel = await Movies.findAll({ where: { id_user }, include: Characters });
  const genders = await Genders.findAll();
  let moviesArr = [];
  
  moviesModel.forEach( (elem) => {
    const { id, title, creationDate, qualification, image, id_gender, characters } = elem.dataValues;
    let movieGender;
  
    genders.forEach(elem => {
      const { id, gender } = elem.dataValues;
      if (id == id_gender) {
        movieGender = gender;
      }
    });
  
    let charactersArr = [];
    characters.forEach(character => {
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
        characters: charactersArr,
      },
    });
  });
  
  res.render('modify/movies/modify_movies', {
    title: 'Peliculas',
    movies: moviesArr,
    alert: false,
  });
};

const createView = async(req, res) => {
  const id_user = req.token.userValid.id;
  const charactersArr = await Characters.findAll({ where: { id_user } });
  const gendersArr = await Genders.findAll();
  
  res.render('modify/movies/add_movies', {
    title: 'Peliculas',
    characters: charactersArr,
    genders: gendersArr,
    alert: false,
  });
};

const createMovie = async(req, res) => {
  const { title, creationDate, qualification, image, characters } = req.body;
  const id_user = req.token.userValid.id;
  let repeatValue = [];
  
  let { gender } = req.body;
  if (gender == '') gender = null;
  
  //Valores vacios o repetidos son igualados a null
  for (let i = 0 ; i < characters.length ; i++) {
    if (!characters[i]) characters[i] = null;
  
    repeatValue.forEach((repeat) => {
      if (characters[i] == repeat) characters[i] = null;
    });
  
    repeatValue.push(characters[i]);
  }
  
  //Creacion de la nueva pelicula
  const newMovie = await Movies.create({
    title: title.toLowerCase(),
    creationDate,
    qualification,
    image,
    id_user,
    id_gender: gender,
  });
  
  //Creacion de las relaciones con personajes
  const idNewMovie = newMovie.dataValues.id;
  
  characters.forEach( async(character) => {
    await Character_Movie.create({
      id_user,
      id_character: character,
      id_movie: idNewMovie,
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
    route: 'modify/movies',
  });
};

const updateView = async(req, res) => {
  const idParam = req.params.id;
  const id_user = req.token.userValid.id;
  const moviesModel = await Movies.findOne({ where: { id: idParam }, include: Characters });
  const gendersArr = await Genders.findAll();
  let moviesArr = [];
  
  if (!moviesModel) {
    return res.send('no existe el pelicula');
  }
  
  //Buscamos todos los personajes para un select
  const charactersAll = await Characters.findAll({ where: { id_user } });
  let charactersArr = [];
  
  charactersAll.forEach(character => {
    const { id, name } = character.dataValues;
    charactersArr.push({
      id,
      name,
    });
  });
  console.log(charactersArr);
      
  //Colocamos en un array cada pelicula
  const { id, title, creationDate, qualification, image, characters, id_gender } = moviesModel.dataValues;
  let gender = await Genders.findOne({ where: { id: id_gender } });
  gender = gender.dataValues.gender; 
  let charactersMovie = [];
  
  characters.forEach((character) => {
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
      characters: charactersMovie,
    },
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
  const idParam = req.params.id;
  const id_user = req.token.userValid.id;
  const { title, creationDate, qualification, image, characters, gender } = req.body;
  
  //Relacion personajes de la pelicula
  const emptyCharacterMovie = await Character_Movie.findAll({ where: { id_movie: idParam } });
  
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
  
    characters.forEach( async(character) => {
      await Character_Movie.create({
        id_user,
        id_character: character,
        id_movie: idParam,
      });
    });
      
    //En caso existir relaciones
  } else {
  
    emptyCharacterMovie.forEach( async(elem) => {
      const idRelation = (elem.dataValues.id);
  
      const allow = await Character_Movie.update({
        id_character: null,
      }, { where: { id: idRelation } });
  
      if (allow) {
        let contCharacter = 0;
  
        emptyCharacterMovie.forEach( async(elem) => {
          const idRelation = (elem.dataValues.id);
  
          let character = characters[contCharacter];
          contCharacter++;
  
          await Character_Movie.update({
            id_character: character,
          }, { where: { id: idRelation } });
        });
      }
    });
  
  }
  
  //Actualizamos la pelicula
  await Movies.update({
    title,
    creationDate,
    qualification,
    image,
    id_gender: gender,
  }, { where: { id: idParam } });
  
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
    route: 'modify/movies',
  });
};

const deleteView = async(req, res) => {
  const idParam = req.params.id;
  const moviesModel = await Movies.findOne({ where: { id: idParam } });
  let moviesArr = [];
  
  if (!moviesModel) {
    return res.send('no existe la pelicula');
  }
  
  const { id, title, creationDate, qualification, image } = moviesModel.dataValues;
  moviesArr.push({
    id,
    image,
    title,
    creationDate,
    details: {
      qualification,
    },
  });
  
  res.render('modify/movies/del_movies', {
    title: 'Peliculas',
    movies: moviesArr,
    alert: false,
  });
};

const deleteMovie = async(req, res) => {
  const idParam = req.params.id;
  
  await Movies.destroy({ where: { id: idParam } });
  
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
    route: 'modify/movies',
  });
};

module.exports = {
  getMovies,
  modifyMovies,
  createView,
  createMovie,
  updateView,
  updateMovie,
  deleteView,
  deleteMovie,
};
