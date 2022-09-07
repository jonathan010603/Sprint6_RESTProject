import {addUser, getUsers, getUserById, updateUser, deleteUser} from './usersController.js';
import express from 'express';
const router = express.Router();

router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;