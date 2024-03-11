const { Model, DataTypes, Sequelize } = require('sequelize');

const TICKET_TABLE = 'tickets';

const TicketSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'open'
  },
  priority: {
    allowNull: false,
    type: DataTypes.ENUM('low', 'medium', 'high')
  },
  assigned_to: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Ticket extends Model {
  static associate(models) {
    // Define las asociaciones con otros modelos si es necesario
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TICKET_TABLE,
      modelName: 'Ticket',
      timestamps: false
    }
  }
}

module.exports = { Ticket,TicketSchema,TICKET_TABLE };
