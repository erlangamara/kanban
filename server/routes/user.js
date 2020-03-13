const route = require('express').Router();
const UserController = require('../controllers/userController.js');

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/googleSignin', UserController.googleSignin)

module.exports = route