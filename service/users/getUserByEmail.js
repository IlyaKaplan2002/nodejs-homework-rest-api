const { User } = require("../schemas");

const getUserByEmail = async (email) => User.findOne({ email });

module.exports = getUserByEmail;
