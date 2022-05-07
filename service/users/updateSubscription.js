const { User } = require("../schemas");

const updateSubscription = async (userId, body) =>
  User.findByIdAndUpdate(userId, body, { new: true });

module.exports = updateSubscription;
