const { User, UserSchema } = require('./user.model');
const { Ticket, TicketSchema } = require('./tickets.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Ticket.init(TicketSchema, Ticket.config(sequelize));
}

module.exports = setupModels;
