//CHARACTERS IN ARR
const charactersInArr = (arr)=>{
    let charactersArr = [];
    arr.forEach(elem=>{
        const { id ,name, age, weight, history, image, movies } = elem.dataValues;
        let moviesTitle = [];

        movies.forEach(movie=>{
            moviesTitle.push(movie.dataValues.title);
        });

        charactersArr.push({
            id,
            image,
            name,
            details: {
                age,
                weight,
                history,
                moviesTitle
            }
        });
    });

    return charactersArr;
};

module.exports = {charactersInArr};