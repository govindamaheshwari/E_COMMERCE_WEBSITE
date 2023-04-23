const Sequelize=require('sequelize'); //actual sequelize through npm 

const sequelize=require('../util/database.js'); //database

//let's define the schema
const OrderItem= sequelize.define('OrderItems',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
    },
    quantity:Sequelize.INTEGER
  });

module.exports=OrderItem;