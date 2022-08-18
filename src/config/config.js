require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    username: process.env.DB_USER_DV,
    password: process.env.DB_PASSWORD_DV,
    database: process.env.DB_NAME_DV,
    host: process.env.DB_HOST_DV,
    dialect: process.env.DB_DIALECT_DV,
  },

  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

module.exports = config[env];
