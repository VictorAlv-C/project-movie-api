const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);

  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    userName,
    email,
    password: encryptedPassword
  });

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const dataUser = filterObj(req.body, 'userName', 'email');

  if (dataUser.userName === '' || dataUser.email === '')
    return next(new AppError(400, 'Some propertie is empty'));

  await user.update({ ...dataUser });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'Deleted Successfully'
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are Invalid'));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWR_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
