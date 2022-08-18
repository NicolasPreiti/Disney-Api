const { Character, Movie } = require('../models');

const getCharacter = async(params) => {
  try {
    const { id } = params;

    return await Character.findOne({
      where: { id },
      include: Movie,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getAllCharacters = async(query, token) => {
  try {
    const { name, age, weight } = query;
    const { id } = token.body;

    if (name) {
      return await Character.findAll({
        where: { id_user: id, name },
        include: Movie });
    }

    if (age) {
      return await Character.findAll({
        where: { id_user: id, age },
        include: Movie });
    }

    if (weight) {
      return await Character.findAll({
        where: { id_user: id, weight },
        include: Movie });
    }

    return await Character.findAll({
      where: { id_user: id },
      include: Movie });
  } catch (err) {
    throw new Error(err);
  }
};

const createCharacter = async(body, token) => {
  try {
    const { name, age, weight, history, image } = body;
    const { id } = token.body;

    return await Character.create({
      name: name.toLowerCase(),
      age,
      weight,
      history,
      image,
      id_user: id,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const updateCharacter = async(body, params) => {
  try {
    const { name, age, weight, history, image } = body;
    const { id } = params;

    return await Character.update({
      name,
      age,
      weight,
      history,
      image,
    },
    { where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCharacter = async(params) => {
  try {
    const { id } = params;

    return await Character.destroy({ where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getCharacter,
  getAllCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
