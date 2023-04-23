const Sequelize=require('sequelize'); //actual sequelize through npm 

const sequelize=require('../util/database.js'); //database

//let's define the schema
const Cart= sequelize.define('cart',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
    }
  });

module.exports=Cart;