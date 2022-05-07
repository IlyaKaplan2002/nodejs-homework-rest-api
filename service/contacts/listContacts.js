const { Contact } = require("../schemas");

const listContacts = async (userId, favoriteFilter, page, limit) => {
  const skip = (page - 1) * limit;

  if (typeof favoriteFilter === "undefined")
    return Contact.find({ owner: userId }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email");

  return Contact.find({ owner: userId, favorite: favoriteFilter }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
};

module.exports = listContacts;
