const multer = require('multer');

const { AppError } = require('../utils/AppError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  !file.mimetype.startsWith('image')
    ? cb(new AppError(400, 'Must provide a image'), false)
    : cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
