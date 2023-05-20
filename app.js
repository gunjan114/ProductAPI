require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require('./db/connect')

const PORT = process.env.PORT || 8000;

const products_routers = require("./Routes/product")

app.get("/", (req, res) => {
  res.send("Hii i am live");
});

// middle ware below
app.use("/api/products", products_routers)

const start = async() => {
  try {
    await connectDB(process.env.MONGO_DB);
    app.listen(PORT, async() => {
      console.log(`Yes i am connected ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
    


