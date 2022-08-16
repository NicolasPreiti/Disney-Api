const Sequelize = require('sequelize');
const config = require('../config/config');
const { users } = require('../models/Users');
const { characters } = require('../models/Characters');
const { movies } = require('../models/Movies');
const { character_movie } = require('../models/Character_Movie');
const { genders } = require('../models/Genders');

//Nueva conexion
const sequelize = new Sequelize(config.DB.NAME, config.DB.USER, config.DB.PASSWORD,{
  host: config.DB.HOST,
  port: 3306,
  dialect: 'mysql',
});

//Verificar conexion
sequelize.authenticate()
  .then(() => console.log('🛒🛒 CONEXION EXITOSA A LA BASE DE DATOS 🛒🛒\n'))
  .catch((err) => console.log(err));

//Models
const Users = users(sequelize, Sequelize);
const Characters = characters(sequelize, Sequelize);
const Movies = movies(sequelize, Sequelize);
const Character_Movie = character_movie(sequelize, Sequelize);
const Genders = genders(sequelize, Sequelize);

//Generos
const gendersArr = ['terror', 'drama', 'romantico', 'triste', 'comedia', 'infantil',];
const gendersToArr = async(arr) => {
  const valid = await Genders.findAll();
  if (valid.length == 0) {
    arr.forEach(async(gender) => {
      await Genders.create({
        gender,
      });
    });
  }
};

//Llaves foraneas
const userForeignKey = {
  foreignKey: {
    name: 'id_user',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
};

const genderForeignKey = {
  foreignKey: {
    name: 'id_gender',
    type: Sequelize.INTEGER,
    allowNull: true,
  },
};

//Llave foranea de characters perteneciente a users
Users.hasOne(Characters, userForeignKey);
Characters.belongsTo(Users, userForeignKey);

//Llave foranea de movies perteneciente a users
Users.hasOne(Movies, userForeignKey);
Movies.belongsTo(Users, userForeignKey);

//Llave foranea de movies perteneciente a genders
Genders.hasOne(Movies, genderForeignKey);
Movies.belongsTo(Genders, genderForeignKey);

//Relacion muchos a muchos de character_movie
Characters.belongsToMany(Movies, {
  through: Character_Movie, 
  foreignKey: {
    name: 'id_character',
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

Movies.belongsToMany(Characters, {
  through: Character_Movie, 
  foreignKey: {
    name: 'id_movie',
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

//Llave foranea de character_movie perteneciente a users
Users.hasOne(Character_Movie, userForeignKey);
Character_Movie.belongsTo(Users, userForeignKey);

//CREA LA TABLA EN CASO DE NO EXISTIR
sequelize.sync()
  .then(() => console.log('🧵🧵 SINCRONIZACION EXITOSA 🧵🧵'))
  .then(() => gendersToArr(gendersArr))
  .catch((err) => console.log(err));

module.exports = { sequelize, Users, Characters, Movies, Character_Movie, Genders };
