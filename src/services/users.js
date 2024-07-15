const User = require('../model/User');

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

module.exports = { createUser };
