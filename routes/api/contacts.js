const express = require("express");
const ctrlContact = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlContact.listContacts);

router.get("/:id", ctrlContact.getContactById);

router.post("/", ctrlContact.addContact);

router.delete("/:id", ctrlContact.removeContact);

router.put("/:id", ctrlContact.updateContact);

router.patch("/:id/favorite", ctrlContact.updateFavorite);

module.exports = router;
