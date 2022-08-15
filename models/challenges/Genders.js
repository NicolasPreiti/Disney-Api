const genders = (sequelize, Sequelize) => {
  return sequelize.define('genders', {
    id: { type: Sequelize.INTEGER, 
      autoIncrement: true, 
      allowNull: false, 
      primaryKey: true,
    },
    gender: { type: Sequelize.STRING, allowNull: false },
  }, {
    timestamps: false,
  });
};

module.exports = { genders };
