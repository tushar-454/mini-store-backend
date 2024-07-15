const usersServices = require('../../services/users');

/**
 * create a user in the database
 */
const createUser = async (req, res) => {
  try {
    const { name, email, phone, address, city, area } = req.body;
    const user = await usersServices.createUser({
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
