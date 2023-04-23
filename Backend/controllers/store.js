const Products=require('../models/products.js')

const items_per_page=4;
exports.getProducts= async (req,res,next)=>{
    let page=req.query.page;
    if(!page){page=1;}
    let totalItems;

    let productCount,products;

    try {
        productCount=await Products.count();
        console.log(productCount,"No o Products in Products table");
        products=await Products.findAll({offset:(page-1)*items_per_page,limit:items_per_page});
        
       
        res.status(201).json({products:products,count:productCount,items_per_page:items_per_page});
        
    } catch (err) {
        console.log(err);
    }
}