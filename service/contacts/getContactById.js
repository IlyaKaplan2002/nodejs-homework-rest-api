const { Contact } = require("../schemas");

const getContactById = async (contactId, userId) =>
  Contact.findOne({ _id: contactId, owner: userId }).populate("owner", "email");

module.exports = getContactById;
