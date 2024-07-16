const Product = require('../models/Product');

// create a new product
const createProduct = ({
  name,
  category,
  isStock,
  isNew,
  price,
  discount,
  description,
  image,
  type,
  productDetails,
  productWarrenty,
  returnPolicy,
}) => {
  const product = new Product({
    name,
    category,
    isStock,
    isNew,
    price,
    discount,
    description,
    image,
    type,
    productDetails,
    productWarrenty,
    returnPolicy,
  });
  return product.save();
};

// get all products
const findAllProducts = () => Product.find();

module.exports = { createProduct, findAllProducts };
