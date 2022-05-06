const express = require("express");
const ctrlContact = require("../../controllers/contacts");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlContact.listContacts);

router.get("/:id", auth, ctrlContact.getContactById);

router.post("/", auth, ctrlContact.addContact);

router.delete("/:id", auth, ctrlContact.removeContact);

router.put("/:id", auth, ctrlContact.updateContact);

router.patch("/:id/favorite", auth, ctrlContact.updateFavorite);

module.exports = router;
