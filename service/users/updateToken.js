const { User } = require("../schemas");

const updateToken = async (id, token) => User.findByIdAndUpdate(id, { token });

module.exports = updateToken;
