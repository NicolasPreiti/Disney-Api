const movies = (sequelize, Sequelize)=>{
    return sequelize.define('movies', {
        id: {type: Sequelize.INTEGER, 
             autoIncrement: true, 
             allowNull: false, 
             primaryKey: true
        },
        title: {type: Sequelize.STRING, allowNull: false},
        creationDate: {type: Sequelize.DATEONLY, allowNull: false},
        qualification: {type: Sequelize.INTEGER, allowNull: false},
        image: {type: Sequelize.TEXT, allowNull: false}
    }, {
        timestamps: false
    });
};

module.exports = {movies};