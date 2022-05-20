const express = require("express");
const ctrlUser = require("../../controllers/users");
const { auth, upload } = require("../../middlewares");

const router = express.Router();

router.patch("/", auth, ctrlUser.updateSubscription);

router.patch("/avatar", auth, upload.single("avatar"), ctrlUser.updateAvatar);

router.post("/signup", ctrlUser.signUp);

router.post("/login", ctrlUser.logIn);

router.get("/logout", auth, ctrlUser.logOut);

router.get("/current", auth, ctrlUser.getCurrent);

router.post("/verify", ctrlUser.sendVerifyEmail);

router.get("/verify/:verificationToken", ctrlUser.verifyEmail);

module.exports = router;
