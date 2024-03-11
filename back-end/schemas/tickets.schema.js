const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().required();
const description = Joi.string().required();
const status = Joi.string().valid('open', 'closed', 'in_progress').default('open');
const priority = Joi.string().valid('low', 'medium', 'high').required();
const assigned_to = Joi.number().integer();

const createTicketSchema = Joi.object({
  title: title,
  description: description,
  status: status,
  priority: priority,
  assigned_to: assigned_to,
});

const updateTicketSchema = Joi.object({
  title: title,
  description: description,
  status: status,
  priority: priority,
  assigned_to: assigned_to,
});

const getTicketSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTicketSchema, updateTicketSchema, getTicketSchema };
