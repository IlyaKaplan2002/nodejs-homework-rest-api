const { throwError } = require("../../helpers");
const service = require("../../service/users");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await service.getUserByVerificationToken(verificationToken);
    if (!user) throwError("User not found", 404);
    await service.updateUser(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "Verification successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
