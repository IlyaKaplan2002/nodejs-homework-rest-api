const { User } = require("../schemas");

const getUserById = async (id) => User.findById(id);

module.exports = getUserById;
