//import express
const express = require('express');

//init express router
const router = express.Router();

//import register controller
const registerController = require('../controllers/RegisterController');

//import login controller
const loginController = require('../controllers/LoginController');

// import user controller
const userController = require('../controllers/UserController');

//import validate register and login
const { validateRegister, validateLogin } = require('../utils/validators/auth');

const { validateUser } = require('../utils/validators/user');
const verifyToken = require('../middlewares/auth');

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login', validateLogin, loginController.login);

// define route for user
router.get('/admin/users', verifyToken, userController.findUsers);

// define route for user create
router.post('/admin/users', verifyToken, validateUser, userController.createUser);

// get user byId
router.get('/admin/users/:id', verifyToken, userController.findUserById);

// define route for update user
router.put('/admin/users/:id', verifyToken, validateUser, userController.updateUser);

// define route for delete user
router.delete('/admin/users/:id', verifyToken, userController.deleteUser);

//export router
module.exports = router;
