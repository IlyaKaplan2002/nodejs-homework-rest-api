const { Contact } = require("../schemas");

const addContact = async (body) => Contact.create(body);

module.exports = addContact;
