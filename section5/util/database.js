const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'udemy_node', 
    'root', 
    'wkddndud1!',
    {
        dialect : 'mysql',
        host : '127.0.0.1'
    }
);

module.exports = sequelize;