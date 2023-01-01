const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const database = require('../util/database');

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    title:
})