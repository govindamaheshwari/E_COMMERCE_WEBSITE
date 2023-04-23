const express=require('express');
const bodyParser=require('body-parser');

const cors= require('cors');

const storeRoutes=require("./routes/store.js");
const adminRoutes=require('./routes/admin.js');
const cartRoutes=require('./routes/cart.js');

const sequelize = require('./util/database.js');

const Products=require('./models/products.js');
const User=require('./models/user.js');
const Cart =require('./models/cart.js');
const CartItem=require('./models/cartItem.js');
const Order=require('./models/order.js');
const OrderItem=require('./models/orderItem.js');


const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use((req,res,next)=>{
    User.findByPk(1)
        .then((user)=>{
            req.user=user;
            next();
        })
        .catch(err=>console.log(err));
})

app.use('/store',storeRoutes);

app.use('/admin',adminRoutes);

app.use('/cart',cartRoutes);

Products.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Products);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Products,{through:CartItem});
Products.belongsToMany(Cart,{through:CartItem});

User.hasMany(Order)
Order.belongsTo(User);
Products.belongsToMany(Order,{through:OrderItem});
Order.belongsToMany(Products,{through:OrderItem});
//sequelize.sync({force:true})
sequelize
    .sync()
    .then((result)=>{
        return User.findByPk(1)
    })
    .then((user)=>{
        if(!user){
            return User.create({name:'Govinda',email:'govindtavri123@gmail.com'})
        }
        return user;
    })
    .then(user=>{
       user.getCart()
       .then(cart=>{
        if(!cart){
            return user.createCart()
        }
        else{
            return cart
        }
       })
    })
    .then(cart=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err
    )});
