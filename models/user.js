module.exports = (Sequelize, sequelize) => {
    return sequelize.define('user', {  
        login: Sequelize.STRING, 
        password: Sequelize.STRING     
    });    
};