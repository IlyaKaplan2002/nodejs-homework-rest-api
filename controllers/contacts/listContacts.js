const service = require("../../service/contacts");

const listContacts = async (req, res, next) => {
  try {
    const { favorite, page = 1, limit = 20 } = req.query;
    const contacts = await service.listContacts(
      req.user._id,
      favorite,
      page,
      limit
    );
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
