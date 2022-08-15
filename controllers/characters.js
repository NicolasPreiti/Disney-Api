const { Characters, Movies } = require('../database/db');
const { charactersInArr } = require('../src/functions/characters-array');

const getCharacters = async(req, res) => {
  const id_user = req.token.userValid.id;
  const { name, age, weight } = req.query;

  //Busqueda por nombre
  if (name) {
    const charactersModel = await Characters.findAll({ where: { name, id_user }, include: Movies });
    let charactersArr = charactersInArr(charactersModel);

    return res.render('explore/characters', {
      title: 'Personajes',
      characters: charactersArr,
      alert: false,
    });
  }

  //Busqueda por edad
  if (age) {
    const charactersModel = await Characters.findAll({ where: { age, id_user }, include: Movies });
    let charactersArr = charactersInArr(charactersModel);

    return res.render('explore/characters', {
      title: 'Personajes',
      characters: charactersArr,
      alert: false,
    });
  }

  //Busqueda por peso
  if (weight) {
    const charactersModel = await Characters.findAll({ where: { weight, id_user }, include: Movies });
    let charactersArr = charactersInArr(charactersModel);

    return res.render('explore/characters', {
      title: 'Personajes',
      characters: charactersArr,
      alert: false,
    });
  }

  //Todos los personajes
  const charactersModel = await Characters.findAll({ where: { id_user }, include: Movies });
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
      route: 'modify/characters/add',
    });
  }

  //Si existen personajes
  res.render('explore/characters', {
    title: 'Personajes',
    characters: charactersArr,
    alert: false,
  });
};

const modifyCharacters = async(req, res) => {
  const id_user = req.token.userValid.id;
  const charactersModel = await Characters.findAll({ where: { id_user }, include: Movies });

  const charactersArr = charactersInArr(charactersModel);

  res.render('modify/characters/modify_characters', {
    title: 'Personajes',
    characters: charactersArr,
    alert: false,
  });
};

const createView = async(req, res) => {
  res.render('modify/characters/add_characters', {
    title: 'Personajes',
    alert: false,
  });
};

const createCharacter = async(req, res) => {

  const { name, age, weight, history, image } = req.body;
  const id_user = req.token.userValid.id;

  await Characters.create({
    name: name.toLowerCase(),
    age,
    weight,
    history,
    image,
    id_user,
  });
    
  res.render('modify/characters/add_characters', {
    title: 'Personajes',

    characters: [],

    //ALERTA
    alert: true,
    alertIcon: 'success',
    alertTitle: 'Añadido',
    alertText: 'Personaje añadido correctamente',
    showConfirmButton: false,
    timer: 1500,
    route: 'characters/modify',
  });
    
};

const updateView = async(req, res) => {
  const idParam = req.params.id;
  const id_user = req.token.userValid.id;

  const character = await Characters.findOne({ where: { id: idParam }, include: Movies });
  if (!character) {
    return res.send('no existe el personaje');
  }

  //Buscamos todas las peliculas
  const movies = await Movies.findAll({ where: { id_user } });
  let moviesArr = [];

  movies.forEach(movie => {
    const { id, title } = movie.dataValues;
    moviesArr.push({
      id,
      title,
    });
  });

  const charactersModel = [character,];
  const charactersArr = charactersInArr(charactersModel);

  res.render('modify/characters/upd_characters', {
    title: 'Personajes',
    characters: charactersArr,
    movies: moviesArr,
    alert: false,
  });
};

const updateCharacter = async(req, res) => {
  const idParam = req.params.id;
  const { name, age, weight, history, image } = req.body;

  await Characters.update({
    name,
    age,
    weight,
    history,
    image,
  }, { where: { id: idParam } });

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
    route: 'characters/modify',
  });
};

const deleteView = async(req, res) => {
  const idParam = req.params.id;
  const character = await Characters.findOne({ where: { id: idParam }, include: Movies });

  if (!character) {
    return res.send('no existe el personaje');
  }

  const charactersModel = [character,];
  const charactersArr = charactersInArr(charactersModel);

  res.render('modify/characters/del_characters', {
    title: 'Personajes',
    characters: charactersArr,
    alert: false,
  });
};

const deleteCharacter = async(req, res) => {
  const idParam = req.params.id;

  await Characters.destroy({ where: { id: idParam } });

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
    route: 'characters/modify',
  });
};

module.exports = {
  getCharacters,
  modifyCharacters,
  createView,
  createCharacter,
  updateView,
  updateCharacter,
  deleteView,
  deleteCharacter,
};
