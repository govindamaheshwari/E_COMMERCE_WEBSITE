const Products=require('../models/products.js')

exports.getProducts= async (req,res,next)=>{
    try {
        const products=await Products.findAll();
        res.status(201).json(products)    
    } catch (err) {
        console.log("Get Request Error",err)
    }
}
exports.postProducts= async (req,res,next)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    
    try {
        const result= await  req.user.createProduct({title:title,imgsrc:imageUrl,price:price,description:description});
        console.log("created a product");
        res.status(201).json(req.body);
    } catch (error) {
        console.log(error);
    }   

}

exports.deleteProduct= async (req,res,next)=>{
    const productId=req.body.productId;

    try {
        const product=await Products.findByPk(productId);
        const result=await product.destroy();
        console.log('Product deleted from the database');
        res.status(201).json(req.body);

    } catch (error) {
        console.log(error);
    }

}