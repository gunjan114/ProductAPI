require('dotenv').config();
const connectDB = require('./db/connect')
const product = require('./Models/product')

const productJason = require('./products.json')

const start = async() => {
    try {
        await connectDB(process.env.MONGO_DB);
        await product.deleteMany()
        await product.create(productJason);
        console.log("Success");
    } catch (error) {
        console.log(error);
    }
}

start();