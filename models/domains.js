module.exports = (Sequelize, sequelize) => {
    return sequelize.define('domain', {
        domain: {
            type:Sequelize.STRING,
            primaryKey: true
        }   
    });    
};