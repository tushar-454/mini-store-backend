const usersServices = require('../../services/users');
const productServices = require('../../services/product');
const orderServices = require('../../services/order');

/**
 * get all users from the database its for admin
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersServices.findAllUsers();
    if (!users) {
      res
        .status(404)
        .json({ status: 404, message: 'Users not found!', data: [] });
    }
    res
      .status(200)
      .json({ status: 200, message: 'Users found successfully', data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * gt a user by email
 */
const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await usersServices.findUserByProperty('email', email);
    if (!user) {
      res
        .status(404)
        .json({ status: 404, message: 'User not found!', data: {} });
    }
    res
      .status(200)
      .json({ status: 200, message: 'User found successfully', data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * delete a user by email/_id
 */
const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await usersServices.findUserByProperty('email', email);
    if (!user) {
      res
        .status(404)
        .json({ status: 404, message: 'User not found!', data: {} });
    }
    await usersServices.deleteUser(user._id);
    res
      .status(200)
      .json({ status: 200, message: 'User deleted successfully', data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * add a product to the database
 */
const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      isStock,
      price,
      discount,
      description,
      image,
      type,
      productDetails,
      productWarrenty,
      returnPolicy,
    } = req.body;
    const product = await productServices.createProduct({
      name,
      category,
      isStock,
      price,
      discount,
      description,
      image,
      type,
      productDetails,
      productWarrenty,
      returnPolicy,
    });
    res.status(201).json({
      status: 201,
      message: 'Product added successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get all products from the database
 */

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productServices.findAllProducts();
    if (!products) {
      return res
        .status(404)
        .json({ status: 404, message: 'Products not found!', data: [] });
    }
    res.status(200).json({
      status: 200,
      message: 'Products found successfully',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get a product by id
 */
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productServices.findProductByProperty('_id', id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: 'Product not found!', data: {} });
    }
    res.status(200).json({
      status: 200,
      message: 'Product found successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * delete a product by id
 */

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productServices.findProductByProperty('_id', id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: 'Product not found!', data: {} });
    }
    await productServices.deleteProduct(product._id);
    res.status(200).json({
      status: 200,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * update a product by id
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    let product = await productServices.findProductByProperty('_id', id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: 'Product not found!', data: {} });
    }
    product = await productServices.updateProduct(product, {
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
    });
    res.status(200).json({
      status: 200,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get all orders from the database
 */
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getAllOrdersAdmin();
    res.status(200).json({
      status: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * update a order in the database
 */
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let order = await orderServices.findOrderByProperty('_id', id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found',
        data: {},
      });
    }
    order.status = status ?? order.status;
    order = await order.save();
    res.status(200).json({
      status: 200,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllOrders,
  updateOrder,
};
