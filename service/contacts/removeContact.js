const { Contact } = require("../schemas");

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

module.exports = removeContact;
