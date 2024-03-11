const Joi = require('joi');

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
})
const createUserLoginSchema = Joi.object({
  email: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(5).required()
});

module.exports = {schemaLogin, createUserLoginSchema}
