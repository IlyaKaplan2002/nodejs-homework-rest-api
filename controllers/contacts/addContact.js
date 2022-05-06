const service = require("../../service/contacts");
const { contactSchemas } = require("../../models");
const { throwError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { value, error } = contactSchemas.add.validate(req.body);
    if (error) throwError(error.message, 400);

    const contact = await service.addContact({ ...value, owner: req.user._id });
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
