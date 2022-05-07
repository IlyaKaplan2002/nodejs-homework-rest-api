const { Contact } = require("../schemas");

const removeContact = async (contactId, userId) =>
  Contact.findOneAndRemove({ _id: contactId, owner: userId });

module.exports = removeContact;
