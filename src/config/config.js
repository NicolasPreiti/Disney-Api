require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,

  development: {
    username: process.env.DB_USER_DV,
    password: process.env.DB_PASSWORD_DV,
    database: process.env.DB_NAME_DV,
    host: process.env.DB_HOST_DV,
    dialect: process.env.DB_DIALECT_DV,
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

