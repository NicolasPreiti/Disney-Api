'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character_movie extends Model {
    static associate(models) {
      models.User.hasOne(Character_movie, { foreignKey: 'id_user' });
      Character_movie.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  Character_movie.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    id_character: {
      type: DataTypes.INTEGER,
    },
    id_movie: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Character_movie',
  });
  return Character_movie;
};
