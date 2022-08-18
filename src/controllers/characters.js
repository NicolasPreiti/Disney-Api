const service = require('../services/characters');
const { charactersInArr } = require('../helpers/charactersArray');

const getAllCharacters = async(req, res) => {
  const { query, token } = req;

  const characters = await service.getAllCharacters(query, token);
  let charactersArr = charactersInArr(characters);

  if (charactersArr.length === 0) {
    return res.render('explore/characters', {
      title: 'Personajes',
      characters: charactersArr,

      alert: true,
      alertIcon: 'info',
      alertTitle: 'Vacio',
      alertText: 'Aun no se han añadido personajes',
      showConfirmButton: true,
      timer: false,
      route: 'characters/modify/add',
    });
  }

  res.render('explore/characters', {
    title: 'Personajes',
    characters: charactersArr,
    alert: false,
  });
};

const modifyCharacters = async(req, res) => {
  const { query, token } = req;

  const characters = await service.getAllCharacters(query, token);
  const charactersArr = charactersInArr(characters);

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
  const { body, token } = req;

  await service.createCharacter(body, token);

  res.render('modify/characters/add_characters', {
    title: 'Personajes',
    characters: [],

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
  const { params } = req;

  const character = await service.getCharacter(params);

  if (!character) return res.send('no existe el personaje');
  const charactersArr = charactersInArr([character,]);

  res.render('modify/characters/upd_characters', {
    title: 'Personajes',
    characters: charactersArr,
    movies: [],
    alert: false,
  });
};

const updateCharacter = async(req, res) => {
  const { body, params } = req;

  await service.updateCharacter(body, params);

  res.render('modify/characters/upd_characters', {
    title: 'Personajes',
    characters: [],

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
  const { params } = req;

  const character = await service.getCharacter(params);

  if (!character) return res.send('no existe el personaje');
  const charactersArr = charactersInArr([character,]);

  res.render('modify/characters/del_characters', {
    title: 'Personajes',
    characters: charactersArr,
    alert: false,
  });
};

const deleteCharacter = async(req, res) => {
  const { params } = req;

  await service.deleteCharacter(params);

  res.render('modify/characters/del_characters', {
    title: 'Personajes',
    characters: [],

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
  getAllCharacters,
  modifyCharacters,
  createView,
  createCharacter,
  updateView,
  updateCharacter,
  deleteView,
  deleteCharacter,
};
