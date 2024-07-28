const usersServices = require('../../services/users');
const productServices = require('../../services/product');

/**
 * create a user in the database
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, address, city, area } = req.body;
    let user = await usersServices.findUserByProperty('email', email);
    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: 'User already exists!', data: {} });
    }

    user = await usersServices.createUser({
      name,
      email,
      phone,
      address,
      city,
      area,
    });

    res
      .status(201)
      .json({ status: 201, message: 'User created successfully', data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * get a user from the database
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
 * delete a user from the database by email
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
 * update a user in the database
 */
const updateUser = async (req, res, next) => {
  try {
    const { phone, address, city, area } = req.body;
    const { id } = req.params;
    const user = await usersServices.findUserByProperty('_id', id);
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: 'User not found!', data: {} });
    }
    const updatedUser = await usersServices.updateUser(user._id, {
      phone,
      address,
      city,
      area,
    });
    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * get all products from the database
 */
const getProducts = async (req, res, next) => {
  try {
    const products = await productServices.findAllProducts();
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
 * get a product from the database
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
 * get products from the database by property
 */
const getProductsByField = async (req, res, next) => {
  try {
    const { key } = req.query;
    const products = await productServices.findProductsByField(key);
    if (!products) {
      return res
        .status(404)
        .json({ status: 404, message: 'Product not found!', data: [] });
    }
    res.status(200).json({
      status: 200,
      message: 'Product found successfully',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * get a product from the database by field
 */

const getProductByField = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { key } = req.query;

    let product = await productServices.findProductByProperty('_id', id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: 'Product not found!', data: {} });
    }
    product = await productServices.findProductByField(key, id);
    res.status(200).json({
      status: 200,
      message: 'Product found successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getProducts,
  getProduct,
  getProductsByField,
  getProductByField,
};
