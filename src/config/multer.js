const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const dest = path.resolve(__dirname, '..', '..', 'uploads');

module.exports = {
  dest,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const filename = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type!'));
    }
  },
};
