const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const usersController = require('./usersController.js');

router.post('/user', usersController.addUser);
router.get('/user', usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;