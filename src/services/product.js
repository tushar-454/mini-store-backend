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

module.exports = {
  createProduct,
  findAllProducts,
  findProductByProperty,
  deleteProduct,
  updateProduct,
};
