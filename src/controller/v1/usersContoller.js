const usersServices = require('../../services/users');
const error = require('../../utils/error');

/**
 * create a user in the database
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, address, city, area } = req.body;
    let user = await usersServices.findUserByProperty('email', email);
    if (user) {
      res.status(400).json({ message: 'User already exists!', data: {} });
      throw error('User already exists!', 400);
    }

    user = await usersServices.createUser({
      name,
      email,
      phone,
      address,
      city,
      area,
    });

    res.status(201).json({ message: 'User created successfully', data: user });
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
      res.status(404).json({ message: 'User not found!', data: {} });
      throw error('User not found!', 404);
    }
    res.status(200).json({ message: 'User found successfully', data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUser };
