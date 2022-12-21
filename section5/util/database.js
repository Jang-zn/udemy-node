const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'udemy_node', 
    'root', 
    'wkddndud1!',
    {
        dialect : 'mysql',
        host : 'localhost'
    }
);

module.exports = sequelize;