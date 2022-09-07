const Users = require('./models/UsersModel.js');
const mongoose = require('mongoose');

const throwError = (e, status) => {throw {message: e, status: status}}

const errorHandler = (e, res) => e.name === "CastError" 
    ? res.status(404).json({ message: "Not a valid Id" })
    : res.status(e.status || 500).json({ message: e.message })

const checkModel = (model, res, successMsg) => !model 
    ? res.status(404).json({ message: "User not found" }) 
    : res.status(200).json({ message: successMsg })

exports.addUser = (req, res) => {
    let user = new Users(req.body);
    user.save(err => err
        ? res.status(500).send({ message: `Failed to add user... ${err.message}` })
        : res.status(201).send(user.toJSON())
    );
}

exports.getUsers = async (req, res) => {
    if (req.query.name !== undefined) return this.getUserByName(req, res, req.query.name)

    try {
        const docsCount = await Users.countDocuments();
        const totalPages = Math.ceil(docsCount / 3);
        const queryPage = req.query.page;
        if (queryPage > totalPages) return res.status(404).json({ message: "Page not found" })

        const currentPage = parseInt(queryPage) || 1;
        const users = await Users.find()
            .limit(3)
            .skip((currentPage - 1) * 3)
            .exec();

        res.json({ users, totalPages, currentPage });
    }
    catch (err) { res.status(500).send({ message: err.message }) }
}

exports.getUserByName = async (req, res, queryName) => {
    await Users.find({ 'name': queryName }, {})
        .then(users => users.length === 0 
            ? throwError("Name not found", 404) 
            : res.status(200).json(users)
        )
        .catch(e => errorHandler(e, res))
}

exports.getUserById = async (req, res) => {
    await Users.findById(req.params.id) 
        .then(user => user === null 
            ? throwError("User not found", 404) 
            : res.status(200).json(user)
        )
        .catch(e => errorHandler(e, res))
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    await Users.findByIdAndUpdate(id, {$set: req.body}, {runValidators: true})
        .then(model => checkModel(model, res, 'User updated successfully'))
        .catch(e => errorHandler(e, res))
} 

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    await Users.findByIdAndDelete(id)
        .then(model => checkModel(model, res, 'User deleted successfully'))
        .catch(e => errorHandler(e, res))
}