const Product = require('../models/Product');

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

module.exports = { createProduct };
