const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.checkToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || '';

    if (token) {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT secret is not defined.');
      }
      
      const decoded = jwt.verify(token, jwtSecret);
      const { id } = decoded;

      const findUser = await User.findOne({ _id: id });

      if (findUser) {
        req.params.logged_user_id = findUser.id;
        req.params.logged_user_name = findUser.name;
        req.params.logged_email = findUser.email;
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: err.message,
    });
  }
  next();
};
