const joi = require("joi");

const addContactSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const updateContactSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30),
  email: joi.string().email({
    minDomainSegments: 2,
  }),
  phone: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/),
});

const updateContactFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
};
