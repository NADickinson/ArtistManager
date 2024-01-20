const { Router } = require('express');
const routes = require('./routes');
const express = require('express');

const apiRouter = new Router();
apiRouter.use(express.json());
apiRouter.use('/api', routes, function () {
  const error = new Error('Route not found');
  error.statusCode = 404;
  throw error;
});

module.exports = apiRouter;
