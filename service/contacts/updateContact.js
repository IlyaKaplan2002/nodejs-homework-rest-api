const { Contact } = require("../schemas");

const updateContact = async (contactId, userId, body) =>
  Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
    new: true,
  });

module.exports = updateContact;
