const path = require("path");
const fs = require("fs");
const jimp = require("jimp");

const service = require("../../service/users");
const { throwError } = require("../../helpers");

const rootPath = path.dirname(require.main.filename);

const updateAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { originalname, path: tempUpload } = req.file;
    const [extension] = originalname.split(".").reverse();
    const fileName = `${userId}.${extension}`;
    const resultUpload = path.join(rootPath, "public/avatars", fileName);
    const avatarURL = `/avatars/${fileName}`;

    await service.updateUser(userId, { avatarURL });

    jimp.read(tempUpload, (err, avatar) => {
      if (err) throwError(err.message, 500);
      avatar.resize(250, 250).write(resultUpload);
    });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = updateAvatar;
