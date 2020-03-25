const mongoose = require('mongoose');

const Product = require("./models/product");

mongoose.connect("mongodb+srv://admin:aq1sw2de3@cluster0-74qdq.mongodb.net/productsTest?retryWrites=true&w=majority"
).then(()=>{
    console.log("Connected");
}).catch(()=>{
    console.log("Connection Failed");
});

const createProduct = async(req,res,next) =>{
    const createdProduct = new Product({
        name:req.body.name,
        price:req.body.price
    })
    const result = await createdProduct.save();
    res.json(result)
};
const getProducts = async(req,res,next) =>{
    const result = await Product.find().exec(); //makes it a real promise
    res.json(result)
};


exports.createProduct = createProduct;
exports.getProducts = getProducts;
