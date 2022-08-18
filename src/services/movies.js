const { Movie, Character } = require('../models');

const getMovie = async(params) => {
  try {
    const { id } = params;

    return await Movie.findOne({
      where: { id },
      include: Character,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getAllMovies = async(query, token) => {
  try {
    const { title, order } = query;
    const { id } = token.body;

    if (title) {
      return await Movie.findAll({
        where: { id_user: id, title },
        include: Character,
      });
    }

    if (order === 'ASC') {
      return await Movie.findAll({
        where: { id_user: id },
        order: [['creationDate', 'ASC',],],
        include: Character,
      });
    }

    if (order === 'DESC') {
      return await Movie.findAll({
        where: { id_user: id },
        order: [['creationDate', 'DESC',],],
        include: Character,
      });
    }

    return await Movie.findAll({
      where: { id_user: id },
      include: Character,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createMovie = async(body, token) => {
  try {
    const { title, creationDate, qualification, image, gender } = body;
    const { id } = token.body;

    return await Movie.create({
      title: title.toLowerCase(),
      creationDate,
      qualification,
      image,
      id_user: id,
      id_gender: gender,
    });

  } catch (err) {
    throw new Error(err);
  }
};

const updateMovie = async(body, params) => {
  try {
    const { title, creationDate, qualification, image, gender } = body;
    const { id } = params;

    return await Movie.update({
      title,
      creationDate,
      qualification,
      image,
      id_gender: gender,
    }, { where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

const deleteMovie = async(params) => {
  try {
    const { id } = params;

    return await Movie.destroy({ where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getMovie,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
