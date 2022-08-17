'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      models.User.hasOne(Character, { foreignKey: 'id_user' });
      Character.belongsTo(models.User,{ foreignKey: 'id_user' });

      Character.belongsToMany(models.Movie, {
        through: models.Character_movie, 
        foreignKey: {
          name: 'id_character',
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      });
    }
  }
  Character.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    age: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    weight: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    history: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};
