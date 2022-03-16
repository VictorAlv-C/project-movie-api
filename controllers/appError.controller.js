exports.globalErrorController = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "fail";
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
