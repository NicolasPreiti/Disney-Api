const { Movies, Characters, Character_Movie } = require("./db");

//TOY STORY
    const toyStory = {
        title: 'Toy Story',
        creationDate: '1996-03-14',
        qualification: 10,
        imageMovie: 'https://i.blogs.es/a34e58/cartel-toy-story-4/840_560.jpg',
        id_gender: 5
    };

    const woody = {
        name: 'woody',
        age: 32,
        weight: 50,
        history: 'Woody es un vaquero de juguete con una cuerda en la parte de atrás, que al tirar de ella dice frases tales como: "Hay una serpiente en mi bota" o "Alguien ha envenenado el abrevadero"',
        imageCharacter: 'https://i.pinimg.com/originals/22/76/ce/2276cea88c9a2f3a498a5a1d68848d6a.png',
    };

    const buzz = {
        name: 'buzz lightyear',
        age: 37,
        weight: 90,
        history: 'En las películas Buzz es un juguete con forma de guerrero espacial, el cual llega hasta las manos de Andy, un niño con una gran colección de juguetes',
        imageCharacter: 'https://www.cinemascomics.com/wp-content/uploads/2020/08/buzz-lightyear-toy-Story.jpg',
    };

//EL REY LEON
    const elReyLeon = {
        title: 'El Rey Leon',
        creationDate: '1994-07-7',
        qualification: 9,
        imageMovie: 'https://3.bp.blogspot.com/-MyUv5_aPW5E/Xiro6hQL3fI/AAAAAAAAgIo/l3CQrBcoIMgPr4jRIZOv-Rq7aLy-e7qewCPcBGAYYCw/s1600/el-rey-leon-disney-1994.jpg',
        id_gender: 4
    };

    const mufasa = {
        name: 'mufasa',
        age: 56,
        weight: 150,
        history: 'Mufasa fue el primer hijo y heredero del Rey Ahadi y de la Reina Uru, según lo evidenciado en un juego de libros de precuela lanzados después de The Lion King',
        imageCharacter: 'https://www.tuenlinea.com/wp-content/uploads/2018/08/Conoce-a-los-actores-que-interpretar%C3%A1n-a-Simba-y-Mufasa-en-la-nueva-peli-de-El-Rey-Le%C3%B3n.jpg',
    };

    const pumba = {
        name: 'pumba',
        age: 24,
        weight: 230,
        history: 'Pumba es un personaje amoroso, de corazón abierto quien a veces muestra ingenuidad infantil e inocencia que a veces se confunde por estupidez',
        imageCharacter: 'https://pm1.narvii.com/6309/cc1372bba90060ef60f26d9cf4bb25ab97dc8218_hq.jpg',
    };

    const timon = {
        name: 'timon',
        age: 20,
        weight: 20,
        history: 'Timón es el mejor amigo de Pumba, amigo y guardián (cuando era un cachorro) de Simba, hijo de Ma y sobrino de Tío Max',
        imageCharacter: 'https://i.pinimg.com/originals/66/f3/f0/66f3f0b4e26e3e8d9688c192af6c6dff.jpg',
    };

//BICHOS
    const bichos = {
        title: 'Bichos',
        creationDate: '1998-11-29',
        qualification: 8,
        imageMovie: 'https://i.ytimg.com/vi/38wy8FR_8aM/maxresdefault.jpg',
        id_gender: 2
    };

    const heimlich = {
        name: 'heimlich',
        age: 17,
        weight: 190,
        history: 'Es una enorme oruga verde con un acento alemán. Trabaja como payaso en el circo de P.T. Pulga. Es glotón y siempre parece tener hambre',
        imageCharacter: 'https://media.gq.com.mx/photos/5ebd7f268f9c683ef7a485bc/4:3/w_1088,h_816,c_limit/Heimlich-screaming.jpg',
    };


const defaultValues = [
    {movie: toyStory, characters: [woody, buzz]},
    {movie: elReyLeon, characters: [mufasa, pumba, timon]},
    {movie: bichos, characters: [heimlich]}
];

const createDefault = (user)=>{
    defaultValues.forEach( async(elem)=>{
        const { title, creationDate, qualification, imageMovie, id_gender } = elem.movie; 
        const newMovie = await Movies.create({
            title,
            creationDate,
            qualification,
            image: imageMovie,
            id_user: user,
            id_gender
        });
        
        elem.characters.forEach( async(character)=>{
            const { name, age, weight, history, imageCharacter } = character;
            const newCharacter = await Characters.create({
                name,
                age,
                weight,
                history,
                image: imageCharacter,
                id_user: user
            });
            
            await Character_Movie.create({
                id_user: user,
                id_character: newCharacter.dataValues.id,
                id_movie: newMovie.dataValues.id
            });
        }); 
    });
};

module.exports = { defaultValues, createDefault };