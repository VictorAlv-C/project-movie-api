const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');

const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError(400, 'Invalid Session'));

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: verifyToken.id, status: 'active' },
    attributes: { exclude: ['password'] }
  });

  if (!user) return next(new AppError(400, 'Invalid Session'));

  req.currentUser = user;

  next();
});

exports.onlyAdmin = catchAsync(async (req, res, next) => {
  if (req.currentUser.role !== 'admin')
    next(new AppError(403, 'Acces Denegated'));

  next();
});
