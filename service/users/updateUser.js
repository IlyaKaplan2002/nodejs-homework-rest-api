const { User } = require("../schemas");

const updateUser = async (userId, body) =>
  User.findByIdAndUpdate(userId, body, { new: true });

module.exports = updateUser;
