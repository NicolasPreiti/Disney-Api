const { Genders } = require('../database/db');

const moviesInArr = async(arr) => {
  const genders = await Genders.findAll();

  const moviesArr = arr.map((elem) => {
    const { id, title, creationDate, qualification, image, characters, id_gender } = elem.dataValues;
    let movieGender;

    genders.map((elem) => {
      const { id, gender } = elem.dataValues;
      if (id == id_gender) {
        movieGender = gender;
      }
    });

    const charactersArr = characters.map((character) => {
      const { name } = character.dataValues;
      return name;
    });

    return {
      id,
      image,
      title,
      creationDate,
      details: {
        qualification,
        gender: movieGender,
        characters: charactersArr,
      },
    };
  });
  
  return moviesArr;
};

module.exports = { moviesInArr };
