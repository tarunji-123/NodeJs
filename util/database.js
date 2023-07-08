const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','root','Tannu@141',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;