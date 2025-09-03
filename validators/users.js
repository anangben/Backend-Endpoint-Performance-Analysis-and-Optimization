import Joi from "joi";

export const registerUserValidator = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
