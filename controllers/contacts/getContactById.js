const { isValidObjectId } = require("mongoose");

const service = require("../../service/contacts");
const { throwError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) throwError("Not found", 404);

    const contact = await service.getContactById(id);
    if (!contact) throwError("Not found", 404);
    res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
