const jwt = require("jsonwebtoken");
const { throwError } = require("../helpers");
const service = require("../service/users");

const { SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw throwError(
        "Not authorized('Bearer' should be in Authorization header)",
        401
      );
    }

    try {
      const { id } = jwt.verify(token, SECRET);
      const user = await service.getUserById(id);
      if (!user || !user.token) throwError("", 401);

      req.user = user;
      next();
    } catch (error) {
      throwError("Not authorized", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
