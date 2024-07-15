/**
 * get all users from the database
 */

const getAllUsers = async (req, res) => {
  res.json({ message: 'Users route is working perfactly v1' });
};

module.exports = { getAllUsers };
