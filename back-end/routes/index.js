const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const ticketsRouter = require('./tickets.router');
const verifyToken = require("../middlewares/auth.handler");

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', verifyToken, usersRouter);
  router.use('/auth', authRouter);
  router.use('/tickets', verifyToken, ticketsRouter);
}

module.exports = routerApi;
