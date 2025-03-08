const multer = require('multer');
const os = require('os');
const AppError = require('./appError');

const multerFilter =
  (acceptedMimetypes = ['csv', 'jpg', 'jpeg', 'png', 'pdf', 'webp', 'avif']) =>
  (req, file, cb) => {
    for (let acceptedMimetype of acceptedMimetypes) {
      if (file.mimetype.includes(acceptedMimetype)) {
        cb(null, true);
        return;
      }
    }
    cb(new AppError(422, 'Please upload a valid file', 'Invalid data'));
  };

const multerUpload = (acceptedMimetypes) => {
  return multer({
    dest: os.tmpdir(),
    fileFilter: multerFilter(acceptedMimetypes),
  });
};


module.exports = { multerUpload};