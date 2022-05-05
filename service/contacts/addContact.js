const { Contact } = require("../schemas");

const addContact = async (body) => {
  return Contact.create(body);
};

module.exports = addContact;
