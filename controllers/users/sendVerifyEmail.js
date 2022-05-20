const service = require("../../service/users");
const { userSchemas } = require("../../models");
const { throwError, sendMail } = require("../../helpers");
const { nanoid } = require("nanoid");

const { DOMAIN } = process.env;

const sendVerifyEmail = async (req, res, next) => {
  try {
    const {
      value: { email },
      error,
    } = userSchemas.verifyEmail.validate(req.body);
    if (error) throwError(error.message, 400);

    const user = await service.getUserByEmail(email);
    if (!user) throwError("User not found", 404);

    if (user.verify) throwError("Verification has already been passed", 400);

    const verificationToken = nanoid();

    const mail = {
      to: email,
      subject: "Verification email",
      html: `To verify your email follow this link:
        <a target="_blank" 
            href="${DOMAIN}/api/users/verify/${verificationToken}">
                ${DOMAIN}/api/users/verify/${verificationToken}
            </a>`,
    };

    await service.updateUser(user._id, { verificationToken });

    await sendMail(mail);

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "Verification email sent",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendVerifyEmail;
