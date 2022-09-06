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
    const { page = 1, limit = 3 } = req.query;

    try {
        const users = await Users.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Users.countDocuments();
        const totalPages = Math.ceil(count / limit);
        res.json({ users, totalPages, currentPage: page });
    }
    catch (err) { res.status(500).send({ message: err.message }) }
}

exports.getUserById = async (req, res) => {
    try { const user = await Users.findById(req.params.id) } 
    catch (err) { return res.status(404).json({ message: "Id not found" }) }
    
    return res.json({ message: "Success" });
}