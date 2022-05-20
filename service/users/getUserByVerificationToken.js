const { User } = require("../schemas");

const getUserByVerificationToken = async (verificationToken) =>
  User.findOne({ verificationToken });

module.exports = getUserByVerificationToken;
