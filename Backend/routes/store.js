const express = require('express');
const router=express.Router();

const storeController=require("../controllers/store.js");


router.get('/',storeController.getProducts);

module.exports=router;