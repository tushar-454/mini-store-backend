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

/**
 * delete a user from the database by email
 */
const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await usersServices.findUserByProperty('email', email);
    if (!user) {
      res.status(404).json({ message: 'User not found!', data: {} });
      throw error('User not found!', 404);
    }
    await usersServices.deleteUser(user._id);
    res.status(200).json({ message: 'User deleted successfully', data: user });
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
      res.status(404).json({ message: 'User not found!', data: {} });
      throw error('User not found!', 404);
    }
    const updatedUser = await usersServices.updateUser(user._id, {
      phone,
      address,
      city,
      area,
    });
    res
      .status(200)
      .json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUser, deleteUser, updateUser };
