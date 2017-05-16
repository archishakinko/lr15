module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options); // подключаемся к Б
    const User = require('../models/user')(Sequelize, sequelize);
    const Domain = require('../models/domains')(Sequelize,sequelize);
    const Payment = require('../models/payments')(Sequelize, sequelize);

     return {
        user: User,
        domain: Domain,
        payment: Payment,
        sequelize: sequelize
    };
};