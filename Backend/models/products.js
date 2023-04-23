const Sequelize=require('sequelize'); //actual sequelize through npm 

const sequelize=require('../util/database.js'); //database

//let's define the schema
const Products= sequelize.define('products',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title: Sequelize.STRING,
    imgsrc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price: {
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Products;