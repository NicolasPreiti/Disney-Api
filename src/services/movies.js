const { Movies, Characters } = require('../database/db');

const getMovie = async(params) => {
  try {
    const { id } = params;

    return await Movies.findOne({
      where: { id }, 
      include: Characters, 
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
      return await Movies.findAll({
        where: { id_user: id, title },
        include: Characters,
      });
    }
    
    if (order === 'ASC') {
      return await Movies.findAll({
        where: { id_user: id },
        order: [['creationDate', 'ASC',],],
        include: Characters,
      });
    }

    if (order === 'DESC') {
      return await Movies.findAll({
        where: { id_user: id },
        order: [['creationDate', 'DESC',],],
        include: Characters,
      });
    }

    return await Movies.findAll({
      where: { id_user: id },
      include: Characters,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createMovie = async(body, token) => {
  try {
    const { title, creationDate, qualification, image, gender } = body;
    const { id } = token.body;

    return await Movies.create({
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

    return await Movies.update({
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

    return await Movies.destroy({ where: { id } });
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
