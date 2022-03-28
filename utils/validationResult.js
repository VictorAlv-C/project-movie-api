const { validationResult } = require('express-validator');
const { AppError } = require('./AppError');

exports.validationResults = (req, res, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    const message = erros
      .array()
      .map(({ msg }) => msg)
      .join(', ');

    return next(new AppError(403, message));
  }

  next();
};
