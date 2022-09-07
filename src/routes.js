const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const usersController = require('./usersController.js');

router.post('/users', usersController.addUser);
router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;