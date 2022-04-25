const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const throwError = require("../helpers/throwError");

const contactsPath = path.join(__dirname, "/contacts.json");

const joi = require("joi");

const addContactSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const updateContactSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30),
  email: joi.string().email({
    minDomainSegments: 2,
  }),
  phone: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/),
});

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts));

const findIndex = (contacts, contactId) => {
  const contactIndx = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndx === -1) throwError("Not found", 404);

  return contactIndx;
};

const listContacts = async () => {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactIndx = findIndex(contacts, contactId);

  return contacts[contactIndx];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const contactIndx = findIndex(contacts, contactId);

  contacts.splice(contactIndx, 1);

  await updateContacts(contacts);

  return "Contact deleted";
};

const addContact = async (body) => {
  try {
    await addContactSchema.validateAsync(body);
  } catch (error) {
    throwError(error.message, 400);
  }

  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };

  await updateContacts([...contacts, newContact]);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const contactIndx = findIndex(contacts, contactId);

  try {
    await updateContactSchema.validateAsync(body);
  } catch (error) {
    throwError(error.message, 400);
  }

  const prevContact = contacts[contactIndx];

  const newContact = {
    id: prevContact.id,
    name: name || prevContact.name,
    email: email || prevContact.email,
    phone: phone || prevContact.phone,
  };

  contacts[contactIndx] = newContact;

  updateContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
