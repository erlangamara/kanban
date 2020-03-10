const route = require('express').Router();
const userRoute = require('./user.js');
const taskRoute = require('./task.js');

route.use('/users', userRoute);
route.use('/task', taskRoute);

module.exports = route;