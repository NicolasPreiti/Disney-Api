const charactersInArr = (arr) => {
  const charactersArr = arr.map((elem) => {
    const { id, name, age, weight, history, image, Movies } = elem.dataValues;

    const moviesTitles = Movies.map((movie) => {
      return movie.dataValues.title;
    });

    return {
      id,
      image,
      name,
      details: {
        age,
        weight,
        history,
        moviesTitles,
      },
    };
  });

  return charactersArr;
};

module.exports = { charactersInArr };
