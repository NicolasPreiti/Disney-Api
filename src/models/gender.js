'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate() {
      const gendersArr = ['terror', 'drama', 'romantico', 'triste', 'comedia', 'infantil',];
      const gendersToArr = async(arr) => {
        const valid = await Gender.findAll();
        if (valid.length == 0) {
          arr.forEach(async(gender) => {
            await Gender.create({
              gender,
            });
          });
        }
      };

      gendersToArr(gendersArr);
    }
  }
  Gender.init({
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};
