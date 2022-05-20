const jwt = require("jsonwebtoken");

const service = require("../../service/users");
const { userSchemas } = require("../../models");
const { throwError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const { SECRET } = process.env;

const logIn = async (req, res, next) => {
  try {
    const {
      value: { email, password },
      error,
    } = userSchemas.login.validate(req.body);
    if (error) throwError(error.message, 400);

    const user = await service.getUserByEmail(email);
    if (!user) throwError("Email is wrong", 401);

    if (!user.verify) throwError("Email not verify", 401);

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw throwError("Password is wrong", 401);
    }

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1d",
    });

    await service.updateToken(user._id, token);

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logIn;
