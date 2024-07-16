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

module.exports = { getAllUsers };
