const multer = require('multer');

const { AppError } = require('../utils/AppError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    cb(new AppError(400, 'Must provide a image'), false);
  } else {
    const arrName = file.originalname.split('.');
    const ext = arrName.pop();
    const name = arrName.join('-');
    file.customName = `${name}-${Date.now()}.${ext}`;
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
