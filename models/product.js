const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//now define a model that will be manage by sequelize

const Product = sequelize.define('product',{
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
  },

  title : Sequelize.STRING,
  price:{
    type : Sequelize.DOUBLE,
    allowNull : true,
  },

  imageUrl : {
    type : Sequelize.STRING,
    allowNull : false
  },

  description : {
    type : Sequelize.STRING,
    allowNull : false
  }
})

module.exports = Product;