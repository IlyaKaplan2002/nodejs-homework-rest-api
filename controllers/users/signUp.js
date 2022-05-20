const service = require("../../service/users");
const { userSchemas } = require("../../models");
const { throwError, sendMail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { DOMAIN } = process.env;

const signUp = async (req, res, next) => {
  try {
    const {
      value: { email, password },
      error,
    } = userSchemas.signup.validate(req.body);
    if (error) throwError(error.message, 400);

    const user = await service.getUserByEmail(email);
    if (user) throwError("Email in use", 409);

    const verificationToken = nanoid();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    const newUser = await service.addUser({
      verificationToken,
      email,
      password: hashedPassword,
      avatarURL,
    });

    const mail = {
      to: email,
      subject: "Verification email",
      html: `To verify your email follow this link:
        <a target="_blank" 
            href="${DOMAIN}/api/users/verify/${verificationToken}">
                ${DOMAIN}/api/users/verify/${verificationToken}
            </a>`,
    };

    await sendMail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: { email: newUser.email, subscription: newUser.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
