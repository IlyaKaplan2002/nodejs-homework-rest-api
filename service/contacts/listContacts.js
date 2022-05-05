const { Contact } = require("../schemas");

const listContacts = async () => {
  return Contact.find();
};

module.exports = listContacts;
