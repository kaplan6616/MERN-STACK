const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://admin:aq1sw2de3@cluster0-74qdq.mongodb.net/productsTest?retryWrites=true&w=majority"

const createProduct = async (req,res,next) => {
    const newProduct = {
        "name"  :req.body.name,
        "price" : req.body.price
    }
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = db.collection("products").insertOne(newProduct);

    } catch (e) {
        client.close();
        return res.json({message:"Could not store data."});
    }

    client.close();
    res.json(newProduct)
}

const getProducts = async (req,res,next) => {
    const client = new MongoClient(url);
    var result = null;
    try {
        await client.connect();
        const db = client.db();
        result = await db.collection("products").find().toArray();

    } catch (e) {
        client.close();
        return res.json({message:"Could not retrieve data."});
    }
    client.close();
    res.json(result)
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
