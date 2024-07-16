const User = require('../models/User');

const createUser = ({ name, email, phone, address, city, area }) => {
  const user = new User({
    name,
    email,
    phone,
    address,
    city,
    area,
  });
  return user.save();
};

// find a user by property
const findUserByProperty = (key, value) => {
  if (key === '_id') {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

// find all users in the database
const findAllUsers = () => User.find();

module.exports = { createUser, findUserByProperty, findAllUsers };
