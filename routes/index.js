const authRouter = require('./auth');
const categoryRouter = require('./categories');
const carsRouter = require('./cars');
module.exports = function (app) {
  app.use('/api/auth', authRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/cars', carsRouter);
};
