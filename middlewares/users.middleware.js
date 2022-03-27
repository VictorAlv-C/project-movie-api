const { User } = require('../models/user.model');
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    return next(new AppError(400, 'Cant get user with given Id'));
  }

  req.user = user;

  next();
});

exports.isAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (+id !== req.currentUser.id)
    return next(new AppError(403, 'You are not owner this acount'));

  next();
});
