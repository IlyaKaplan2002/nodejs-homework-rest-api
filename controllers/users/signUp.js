const service = require("../../service/users");
const { userSchemas } = require("../../models");
const { throwError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  try {
    const {
      value: { email, password },
      error,
    } = userSchemas.signup.validate(req.body);
    if (error) throwError(error.message, 400);

    const user = await service.getUserByEmail(email);
    if (user) throwError("Email in use", 409);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await service.addUser({
      email,
      password: hashedPassword,
    });
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
