const { Contact } = require("../schemas");

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

module.exports = getContactById;
