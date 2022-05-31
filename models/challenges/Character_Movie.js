const character_movie = (sequelize, Sequelize)=>{
    return sequelize.define('character_movie', {
        id: {type: Sequelize.INTEGER, 
             autoIncrement: true, 
             allowNull: false, 
             primaryKey: true
        },
        id_user: {type: Sequelize.INTEGER, allowNull: false}
    }, {
        timestamps: false
    });
};

module.exports = {character_movie};