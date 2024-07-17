const { ObjectId } = require('mongodb');
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

// update product
const updateProduct = (
  product,
  {
    name,
    category,
    isStock,
    price,
    discount,
    description,
    image,
    type,
    productDetails,
    rating,
    numReviews,
  }
) => {
  product.name = name ?? product.name;
  product.category = category ?? product.category;
  product.isStock = isStock ?? product.isStock;
  product.price = price ?? product.price;
  product.discount = discount ?? product.discount;
  product.description = description ?? product.description;
  product.image = image ?? product.image;
  product.type = type ?? product.type;
  product.productDetails = productDetails ?? product.productDetails;
  product.rating = rating ?? product.rating;
  product.numReviews = numReviews ?? product.numReviews;

  return product.save();
};

// find products by field
const findProductsByField = (key) => {
  const keys = key.split(',');
  const fields = {};
  keys.forEach((key) => {
    fields[key] = 1;
  });
  // project (aggregation)
  return Product.aggregate([
    {
      $project: {
        _id: 1,
        ...fields,
      },
    },
  ]);
};

// find a product by field
const findProductByField = (key, id) => {
  const keys = key.split(',');
  const fields = {};
  keys.forEach((key) => {
    fields[key] = 1;
  });
  // here i want to find product by id and project the fields
  return Product.aggregate([
    { $match: { _id: new ObjectId(id) } },
    {
      $project: {
        _id: 1,
        ...fields,
      },
    },
  ]);
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductByProperty,
  deleteProduct,
  updateProduct,
  findProductsByField,
  findProductByField,
};
