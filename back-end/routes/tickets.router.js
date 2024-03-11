const express = require('express');
const TicketService = require('./../services/tickets.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createTicketSchema, updateTicketSchema, getTicketSchema} = require('./../schemas/tickets.schema');

const router = express.Router();
const service = new TicketService();

// Ruta para obtener la cantidad total de tickets
router.get('/total-count', async (req, res, next) => {
  try {
    const totalCount = await service.getTotalCount();
    res.json({ total_count: totalCount });
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener la cantidad de tickets por prioridad
router.get('/priority-count', async (req, res, next) => {
  try {
    const priorityCount = await service.getPriorityCount();
    res.json(priorityCount);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener la cantidad de tickets por estado
router.get('/status-count', async (req, res, next) => {
  try {
    const statusCount = await service.getStatusCount();
    res.json(statusCount);
  } catch (error) {
    next(error);
  }
});
router.get('/', async (req, res, next) => {
  try {
    const tickets = await service.find();
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getTicketSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const ticket = await service.getTicket(id);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createTicketSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newTicket = await service.createTicket(body);
      res.status(201).json(newTicket);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getTicketSchema, 'params'),
  validatorHandler(updateTicketSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const ticket = await service.updateTicket(id, body);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getTicketSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      await service.deleteTicket(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
