const { isValidObjectId } = require("mongoose");

const service = require("../../service/contacts");
const { throwError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) throwError("Not found", 404);

    const result = await service.removeContact(id, req.user._id);
    if (!result) throwError("Not found", 404);
    res.json({
      status: "success",
      code: 200,
      data: { message: "Contact deleted" },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
