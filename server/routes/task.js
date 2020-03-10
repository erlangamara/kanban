const route = require('express').Router();
const Controller = require('../controllers/taskController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

route.use(authentication);
route.get('/', Controller.showTask);
route.post('/', Controller.addTask);
route.get('/:id', Controller.showById);
route.put('/:id', authorization, Controller.editTask);
route.delete('/:id', authorization, Controller.deleteTask);

module.exports = route