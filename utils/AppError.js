class AppError extends Error {
  constructor(statuscode, message) {
    super();
    this.statuscode = statuscode;
    this.message = message;
    this.status =
      Number(statuscode.toString().substring(0, 1)) <= 4 ? "error" : "fail";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
