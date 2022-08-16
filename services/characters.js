const { Characters, Movies } = require('../database/db');

const getAllCharacters = async(query, token) => {
  try {
    const { name, age, weight } = query;
    const { id } = token.body;

    if (name) {
      return await Characters.findAll({ 
        where: { id_user: id, name },
        include: Movies });
    }

    if (age) {
      return await Characters.findAll({ 
        where: { id_user: id, age },
        include: Movies });
    }

    if (weight) {
      return await Characters.findAll({ 
        where: { id_user: id, weight },
        include: Movies });
    }

    return await Characters.findAll({ 
      where: { id_user: id },
      include: Movies });
  } catch (err) {
    throw new Error(err);
  }
};

const createCharacter = async(body, token) => {
  try {
    const { name, age, weight, history, image } = body;
    const { id } = token.body;

    return await Characters.create({
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

    return await Characters.update({
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

    return await Characters.destroy({ where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
