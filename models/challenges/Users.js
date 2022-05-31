const users = (sequelize, Sequelize)=>{
    return sequelize.define('users', {
        id: {type: Sequelize.INTEGER, 
             autoIncrement: true, 
             allowNull: false, 
             primaryKey: true
        },
        email: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: false},
    }, {
        timestamps: false
    });
};

module.exports = {users};