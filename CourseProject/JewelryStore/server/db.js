const { Sequelize } = require('sequelize')
module.exports = new Sequelize(
       process.env.db_database, //название БД
       process.env.db_username, //пользователь
       process.env.db_password, //пароль
       {
        dialect:'mssql',
        host: process.env.db_host,
        logging: false
       }
    );
