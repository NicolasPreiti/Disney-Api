const charactersInArr = (arr) => {
  const charactersArr = arr.map((elem) => {
    const { id ,name, age, weight, history, image, movies } = elem.dataValues;

    const moviesTitles = movies.map((movie) => {
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
