'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      models.User.hasOne(Movie, { foreignKey: 'id_user' });
      Movie.belongsTo(models.User, { foreignKey: 'id_user' });

      models.Gender.hasOne(Movie, { foreignKey: 'id_gender' });
      Movie.belongsTo(models.Gender, { foreignKey: 'id_gender' });

      Movie.belongsToMany(models.Character, {
        through: models.Character_movie, 
        foreignKey: {
          name: 'id_movie',
          type: DataTypes.INTEGER,
        },
      });
    }
  }
  Movie.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    creationDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    qualification: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
