const Products = require("../Models/product")

const getAllProducts = async (req, res) => {

  // below most of the things is done according to the mongodb commands to fulfill the command

  const { company, name, sort, select } = req.query;
  const queryObject = {};

  if(company) {
    queryObject.company = company; 
  }

  if(name) {
    queryObject.name = {$regex : name, $options: "i"};  // regex and options are taken from the website to that it can searches the related searches in the database and show the result in the database.
  }
  
  let jsonData = Products.find(queryObject);

  if(sort) {
    // const fixSort = sort.replace(",", " ") // replacing , to " " space due to the command according to the mongodb
    const fixSort = sort.split(",").join(" ")
    jsonData = Products.find(queryObject).sort(fixSort)
  }

  if(select) {
    // const selectedValues = select.replace(",", " "); // getting problem for searching more than parameter.
    const selectedValues = select.split(",").join(" ") 
    jsonData = Products.find(queryObject).select(selectedValues)
  }

  // by defalut variables in mongoose

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;

  let skip = (page - 1) * limit  // formula for skipping the page 

  jsonData = jsonData.skip(skip).limit(limit)  // default function from mongoose

  const myData = await jsonData  // simple mongodb search command that is .find({})
  res.status(200).json({myData, nbHits : myData.length});
};

const getAllProductsTesting = async (req, res) => {

  const myData = await Products.find(req.query).sort("name") // like this you can sort the data in ascending order

  // const myData = await Products.find(req.query).sort("-name")  // and this is for descending order
  res.status(200).json({ myData});
};

module.exports = { getAllProducts, getAllProductsTesting };