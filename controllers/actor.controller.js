const { Actor } = require("../models/actor.model");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError");

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: { actors },
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { name, lastName } = req.body;

  const actor = await Actor.create({ name, lastName });

  res.status(200).json({
    status: "success",
    data: { actor },
  });
});
