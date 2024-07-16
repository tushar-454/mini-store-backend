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

// find a product by id
const findProductByProperty = (key, value) => {
  if (key === '_id') {
    return Product.findById(value);
  }
  return Product.findOne({ [key]: value });
};

// delete a product
const deleteProduct = (id) => Product.findByIdAndDelete(id);

module.exports = {
  createProduct,
  findAllProducts,
  findProductByProperty,
  deleteProduct,
};
