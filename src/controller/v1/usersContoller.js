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

module.exports = { createUser };
