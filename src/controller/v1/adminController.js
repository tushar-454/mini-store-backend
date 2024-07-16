const usersServices = require('../../services/users');
const productServices = require('../../services/product');

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
      isNew,
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
    res.status(201).json({
      status: 201,
      message: 'Product added successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUser, deleteUser, addProduct };
