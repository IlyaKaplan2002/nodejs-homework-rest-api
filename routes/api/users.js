const express = require("express");
const ctrlUser = require("../../controllers/users");
const { auth } = require("../../middlewares");

const router = express.Router();

router.patch("/", auth, ctrlUser.updateSubscription);

router.post("/signup", ctrlUser.signUp);

router.post("/login", ctrlUser.logIn);

router.get("/logout", auth, ctrlUser.logOut);

router.get("/current", auth, ctrlUser.getCurrent);

module.exports = router;
