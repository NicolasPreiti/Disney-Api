const Sequelize = require('sequelize');
const config = require('../config/config').development;
const { User, Gender, Character, Movie, Character_movie } = require('../models');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: 3306,
  dialect: config.dialect,
});

sequelize.authenticate()
  .then(() => console.log('🛒🛒 CONEXION EXITOSA A LA BASE DE DATOS 🛒🛒\n'))
  .catch((err) => console.log(err));

sequelize.sync()
  .then(() => console.log('🧵🧵 SINCRONIZACION EXITOSA 🧵🧵'))
  .catch((err) => console.log(err));

module.exports = { sequelize };
