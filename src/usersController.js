import { throwError, errorHandler, checkModel, nameLike, getPagination } from './utils.js';
import Users from './models/UsersModel.js';

export const addUser = (req, res) => {
    let user = new Users(req.body);
    user.save(err => err
        ? res.status(500).json({ message: err.message })
        : res.status(201).json({ message: 'User added successfully' })
    );
}

export const getUsers = async (req, res) => {
    if (req.query.name !== undefined) return getUserByName(req, res, req.query.name)
    await Users.find()
        .then(users => users.length === 0
            ? throwError("No user found", 404)
            : getPagination(res, users, req.query.page)
        )
        .catch(e => errorHandler(e, res))
}

export const getUserByName = async (req, res, queryName) => {
    await Users.find({ 'name': nameLike(queryName) })
        .then(users => users.length === 0
            ? throwError("Name not found", 404)
            : getPagination(res, users, req.query.page)
        )
        .catch(e => errorHandler(e, res))
}

export const getUserById = async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => user === null
            ? throwError("User not found", 404)
            : res.status(200).json(user)
        )
        .catch(e => errorHandler(e, res))
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    await Users.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true })
        .then(model => checkModel(model, res, 'User updated successfully'))
        .catch(e => errorHandler(e, res))
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    await Users.findByIdAndDelete(id)
        .then(model => checkModel(model, res, 'User deleted successfully', 204))
        .catch(e => errorHandler(e, res))
}