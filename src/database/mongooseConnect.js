const mongoose = require('mongoose');

const mongooseConnect = (uri) => {
  return mongoose.connect(uri);
};

module.exports = mongooseConnect;
