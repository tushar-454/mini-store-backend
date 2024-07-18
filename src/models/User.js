const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 15,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    default: 'address',
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    default: 'city',
  },
  area: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    default: 'area',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', userSchema);
