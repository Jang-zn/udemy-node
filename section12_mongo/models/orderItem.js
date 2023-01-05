const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    quantity : {
        type : Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
    }
})

module.exports = OrderItem;