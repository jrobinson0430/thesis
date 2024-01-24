const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Roles = require('../models/rolesModel');

const SALT = 10;

const create_user = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: 'Email already exists. Please try again.',
      });
    }

    const { _id } = await Roles.findOne({ name: 'user' }, { name: 0 });
    await User.create({ ...req.body, roles: [_id] });

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login_user = (req, res) => {

  const {
    firstName, lastName, email, location, isManager,
  } = req.user;
  const user = {
    firstName, lastName, email, location, isManager,
  };
  return res.status(200).json({
    success: true,
    message: 'Thank you. Login successful.',
    user,
  });
};

// remember to clear the role cookies as well once you implement
const logout_user = (req, res) => {
  res.clearCookie('userToken');
  return res.status(200).json({
    message: 'Logout Complete. Redirecting to home page.',
  });
};

const update_account = async (req, res) => {
  try {
    const user = req.body;
    const { newPassword, password } = user;
    delete user.newPassword;
    const encryptedPassword = await bcrypt
      .hash(newPassword || password, SALT);

    const updatedAcc = await User.findOneAndUpdate(
      { email: user.email },
      { ...user, password: encryptedPassword },
      { new: true },
    ).select('-password -roles -_id -__v');

    res.status(200).json({
      success: true,
      message: 'Account Updated',
      account: updatedAcc,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create_user,
  login_user,
  logout_user,
  update_account,
};
