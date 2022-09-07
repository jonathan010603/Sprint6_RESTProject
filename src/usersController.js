const Users = require('./models/UsersModel.js');
const mongoose = require('mongoose');

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
    Users.find({ 'name': queryName }, {}, (err, users) => {
        err && res.json({ err })
        if (users.length === 0) return res.status(404).json({ message: "Name not found" })
        return res.status(200).json(users)
    });
}

exports.getUserById = async (req, res) => {
    try { 
        const user = await Users.findById(req.params.id) 
        res.json({ user });
    } 
    catch (err) { res.status(404).json({ message: "User not found" }) }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    Users.findByIdAndUpdate(id, {$set: req.body}, {runValidators: true}, err => !err
        ? res.status(200).json({ message: "User updated successfully" })
        : res.status(500).json({ message: err.message })
    )
} 

//exports.deleteUser = async (req, res) => {}