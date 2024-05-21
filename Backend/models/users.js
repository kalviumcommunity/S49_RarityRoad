const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const UsersSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

const usersModel = mongoose.model("users", UsersSchema);

// Joi Schema for Validation
const UserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { usersModel, UserSchema };
