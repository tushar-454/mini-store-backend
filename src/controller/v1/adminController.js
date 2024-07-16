const usersServices = require('../../services/users');

/**
 * get all users from the database its for admin
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersServices.findAllUsers();
    if (!users) {
      res.status(404).json({ message: 'Users not found!', data: [] });
      throw error('Users not found!', 404);
    }
    res.status(200).json({ message: 'Users found successfully', data: users });
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
      res.status(404).json({ message: 'User not found!', data: {} });
      throw error('User not found!', 404);
    }
    res.status(200).json({ message: 'User found successfully', data: user });
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
      res.status(404).json({ message: 'User not found!', data: {} });
      throw error('User not found!', 404);
    }
    await usersServices.deleteUser(user._id);
    res.status(200).json({ message: 'User deleted successfully', data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUser, deleteUser };
