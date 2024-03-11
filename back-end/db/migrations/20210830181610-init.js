'use strict';

const {USER_TABLE} = require('./../models/user.model');
const {TICKET_TABLE, TicketSchema} = require('./../models/tickets.model');
const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla de usuarios
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'user'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });

    // Crear la tabla de tickets
    await queryInterface.createTable(TICKET_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'open'
      },
      priority: {
        allowNull: false,
        type: Sequelize.DataTypes.ENUM('low', 'medium', 'high')
      },
      assigned_to: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface) => {
    // Eliminar la tabla de tickets
    await queryInterface.dropTable(TICKET_TABLE);

    // Eliminar la tabla de usuarios
    await queryInterface.dropTable(USER_TABLE);
  }
};
