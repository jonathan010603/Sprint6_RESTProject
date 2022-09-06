const Users = require('./models/UsersModel.js');
const mongoose = require('mongoose');

exports.addUser = (req, res) => {
        let user = new Users(req.body);
        user.save(err => {
            err
                ? res.status(500).send({message: `Failed to add user... ${err.message}`})
                : res.status(201).send(user.toJSON())
        })
}

exports.getUserById = async (req, res) => {
    try { const user = await Users.findById(req.params.id) } 
    catch (err) { return res.status(404).json({ message: "Id not found" }) }

    return res.json({ message: "Success" });
}