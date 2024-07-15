const usersServices = require('../../services/users');

/**
 * create a user in the database
 */
const createUser = async (req, res) => {
  try {
    const { name, email, phone, address, city, area } = req.body;
    let user = await usersServices.findUserByProperty('email', email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
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
    console.log(error);
  }
};

module.exports = { createUser };
