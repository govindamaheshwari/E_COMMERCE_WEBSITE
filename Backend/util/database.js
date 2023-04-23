const Sequelize=require('sequelize');

const sequelize=new Sequelize('e_commerce','root','Iitd@0202',
{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;