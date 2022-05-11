const multer = require("multer");
const path = require("path");

const rootPath = path.dirname(require.main.filename);

const tempDir = path.join(rootPath, "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
