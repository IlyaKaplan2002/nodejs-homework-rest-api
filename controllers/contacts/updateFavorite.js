const { isValidObjectId } = require("mongoose");

const service = require("../../service/contacts");
const { contactSchemas } = require("../../models");
const { throwError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) throwError("Not found", 404);

    const { value, error } = contactSchemas.updateFavorite.validate(req.body);
    if (error) throwError(error.message, 400);

    const contact = await service.updateContact(id, req.user._id, value);
    if (!contact) throwError("Not found", 404);
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
