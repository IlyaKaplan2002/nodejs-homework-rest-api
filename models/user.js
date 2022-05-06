const joi = require("joi");

const subscriptions = ["starter", "pro", "business"];

const signup = joi.object({
  password: joi.string().alphanum().min(6).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const login = joi.object({
  password: joi.string().alphanum().min(6).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const updateSubscription = joi.object({
  subscription: joi
    .string()
    .valid(...subscriptions)
    .required(),
});

module.exports = { signup, login, updateSubscription };
