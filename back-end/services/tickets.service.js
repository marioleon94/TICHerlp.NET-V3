const boom = require('@hapi/boom');
const {} = require('./../db/models/tickets.model');
const {createTicketSchema, updateTicketSchema, getTicketSchema} = require('./../schemas/tickets.schema');
const {models} = require("../libs/sequelize");
const sequelize = require('../libs/sequelize');

class TicketsService {
  constructor() {
  }

  async createTicket(ticketData) {
    try {
      const validatedTicket = await createTicketSchema.validateAsync(ticketData);
      return await models.Ticket.create(validatedTicket);
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async updateTicket(ticketId, ticketData) {
    try {
      await getTicketSchema.validateAsync({id: ticketId});
      const validatedTicket = await updateTicketSchema.validateAsync(ticketData);
      const [rowsUpdated, [updatedTicket]] = await models.Ticket.update(validatedTicket, {
        where: {id: ticketId},
        returning: true,
      });
      if (rowsUpdated === 0) {
        throw boom.notFound('Ticket not found');
      }
      return updatedTicket;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async getTicket(ticketId) {
    try {
      await getTicketSchema.validateAsync({id: ticketId});
      const ticket = await models.Ticket.findByPk(ticketId);
      if (!ticket) {
        throw boom.notFound('Ticket not found');
      }
      return ticket;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async find() {
    try {
      const ticket = await models.Ticket.findAll()
      return ticket;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async deleteTicket(ticketId) {
    try {
      await getTicketSchema.validateAsync({id: ticketId});
      const rowsDeleted = await models.Ticket.destroy({where: {id: ticketId}});
      if (rowsDeleted === 0) {
        throw boom.notFound('Ticket not found');
      }
      return {message: 'Ticket deleted successfully'};
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async getTotalCount() {
    try {
      return await models.Ticket.count();
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async getPriorityCount() {
    try {
      return await models.Ticket.findAll({
        attributes: ['priority', [sequelize.literal('COUNT(priority)'), 'count']],
        group: ['priority']
      });
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async getStatusCount() {
    try {
      return await models.Ticket.findAll({
        attributes: ['status', [sequelize.literal('COUNT(status)'), 'count']],
        group: ['status']
      });
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

}

module.exports = TicketsService;
