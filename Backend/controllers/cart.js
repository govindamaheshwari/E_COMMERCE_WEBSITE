const Cart=require('../models/cart.js');
const Products = require('../models/products.js');
const Order=require('../models/order');
const OrderItem=require('../models/orderItem');

exports.getCartProducts=async (req,res,next)=>{
    try {
        const cart=await req.user.getCart();
        const products=await cart.getProducts();
        res.status(201).json(products);     
    } catch (error) {
        console.log(error);
    }

}
exports.postCartProducts= async (req,res,next)=>{
    let fetchedCart;
    let productId=req.body.productId;
    let newQuantity=1;
    try {
        const cart=await  req.user.getCart();
        fetchedCart=cart;
        //const cartt= await Cart.findOne({includes: Products})
        //console.log("qwertyu: ", cartt)
        const products= await cart.getProducts({where:{id:productId}}) ;
        //console.log("qwertyuio:",products)
        let product;
        if(products.length>0){
            product=products[0];
        }
        if(product){
            let oldQuantity=product.cartItems.quantity;
            newQuantity=oldQuantity+1;
        }
        else{
            product= await  Products.findByPk(productId);
        }
        
        product= await fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
        res.status(201).json(product);

    } catch (error) {
        console.log(error);
    }
}
// exports.postCartProducts=(req,res,next)=>{
//     let fetchedCart;
//     let productId=req.body.productId;
//     let newQuantity=1;
//     req.user.getCart()
//         .then(cart=>{
//             fetchedCart=cart;
//             return cart.getProducts({where:{id:productId}})    
//         })
//         .then(products=>{
//             let product;
//             if(products.length>0){
//                 product=products[0];
//             }
//             if(product){
//                 let oldQuantity=product.cartItems.quantity;
//                 newQuantity=oldQuantity+1;
//                 return product;
//             }
//             return Products.findByPk(productId);
//         })
//         .then(product=>{
//             fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
//             return product;
//         })
//         .then((product)=>{
//             res.status(201).json(product);
//         })
//         .catch(err=>console.log(err));
// }

exports.deleteCartProduct= async (req,res,next)=>{
    let productId=req.body.productId;
    try {
        const cart =await req.user.getCart();
        const products=await cart.getProducts({where:{id:productId}});
        product=products[0];
        const result=await product.cartItems.destroy();
        console.log("Product removed from the Cart");
        res.status(201);

    } catch (error) {
        console.log(error);
    }
}

exports.order=async (req,res,next)=>{
    let total_amount=0;
    let fetchedOrder;
    let orderId;
    try {
        const order= await req.user.createOrder();
        fetchedOrder=order;
        orderId=order.id;

        const cart=await req.user.getCart();
        const products= await cart.getProducts();
        products.forEach(async(item)=>{
            await fetchedOrder.addProduct(item,{through:{quantity:item.cartItems.quantity}})
            total_amount+=item.cartItems.quantity*item.price;
            await item.cartItems.destroy();
        })
        await fetchedOrder.set({amount:total_amount});
        await fetchedOrder.save();
        res.status(200).json({success:true,orderId:orderId})

    } catch (error) {
        console.log(error);
    }
}

exports.getAllOrders=async (req,res,next)=>{
    try {
        const orders=await req.user.getOrders({include:[`products`]});
        res.status(201).json({success:true,orders:orders});     
    } catch (error) {
        res.json(error);
        console.log(error);
    }
}