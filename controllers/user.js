const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { hashPassword, comparePassword } = require('../utils');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email is taken',
      });
    }

    const newUser = new User({ email, password, name });

    newUser.password = await hashPassword(newUser.password);
    await newUser.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined.');
    }

    const token = jwt.sign({ id: newUser._id }, jwtSecret);

    const userData = {
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
    };

    return res.json({
      success: true,
      message: 'User created',
      token,
      user: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: 'Error in process',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined.');
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    const userData = { email: user.email, name: user.name, _id: user._id };

    return res.json({
      success: true,
      token,
      user: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: 'Error in login process',
    });
  }
};
