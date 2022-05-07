const { User } = require("../schemas");

const addUser = async (body) => User.create(body);

module.exports = addUser;
