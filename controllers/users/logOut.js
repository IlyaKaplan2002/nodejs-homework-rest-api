const service = require("../../service/users");

const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await service.updateToken(_id, null);
    res.status(204).json({
      status: "success",
      code: 204,
      data: {
        message: "Successfully logged out",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
