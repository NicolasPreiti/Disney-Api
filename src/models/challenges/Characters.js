const characters = (sequelize, Sequelize) => {
  return sequelize.define('characters', {
    id: { type: Sequelize.INTEGER, 
      autoIncrement: true, 
      allowNull: false, 
      primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    weight: { type: Sequelize.INTEGER, allowNull: false },
    history: { type: Sequelize.STRING(350), allowNull: false },
    image: { type: Sequelize.TEXT, allowNull: false },
  }, {
    timestamps: false,
  });
};

module.exports = { characters };
