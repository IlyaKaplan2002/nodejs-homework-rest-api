const service = require("../../service/users");
const { userSchemas } = require("../../models");
const { throwError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  try {
    const { value, error } = userSchemas.updateSubscription.validate(req.body);
    if (error) throwError(error.message, 400);

    const { email, subscription } = await service.updateSubscription(
      req.user._id,
      value
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        user: { email, subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
