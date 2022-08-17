const { Gender } = require('../models');

const moviesInArr = async(arr) => {
  const genders = await Gender.findAll();

  const moviesArr = arr.map((elem) => {
    const { id, title, creationDate, qualification, image, Characters, id_gender } = elem.dataValues;
    let movieGender;

    genders.map((elem) => {
      const { id, gender } = elem.dataValues;
      if (id == id_gender) {
        movieGender = gender;
      }
    });

    const charactersArr = Characters.map((character) => {
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
